<template>
  <v-layout row wrap fill-height>
    <div v-show="isLoad" class="load-full">
      <v-progress-circular :indeterminate="isLoad" color="primary"></v-progress-circular>
    </div>
    <v-flex xs12 v-if="!isLoad">
      <v-breadcrumbs divider="/">
        <v-breadcrumbs-item>
          User
        </v-breadcrumbs-item>
        <v-breadcrumbs-item disabled>
          List
        </v-breadcrumbs-item>
      </v-breadcrumbs>
      <v-card color="white" class="_r mr-2" raised>
        <v-flex xs12 class=" white--text">
          <v-toolbar color="primary" class="white--text">
            <v-flex xs4 sm5 md3 class="text-xs-left" style="font-size:18px">
              Users
            </v-flex>
          </v-toolbar>
        </v-flex>
        <v-flex>
          <v-data-table
            :headers="headers"
            :items="usersData"
            ref="sortableTable"
            class="elevation-1">
            <v-progress-linear slot="progress" color="primary" indeterminate></v-progress-linear>
            <template slot="items" slot-scope="props">
              <tr :key="props.item.id">
                <td class="text-xs-left">{{ props.item.username }}</td>
                <td class="text-xs-left">{{ props.item.email }}</td>
                <td class="text-xs-left">{{ props.item.total_hint }}</td>
                <td class="text-xs-left">{{ props.item.score }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-flex>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { cloneDeep } from 'lodash'

export default {
  data() {
    return {
      isLoad: true,
      headers: [
        { text: 'Username', align: 'left', value: 'username', sortable: false },
        { text: 'Email', value: 'email', sortable: false },
        { text: 'Total Hint', value: 'total hint', sortable: false },
        { text: 'Score', value: 'score', sortable: false }
      ],
      initialUsers: [],
      usersData: [],
      timeout: null
    }
  },
  mounted() {
    this.getDataFromAPI()
      .then(data => {
        this.initialUsers = Object.freeze(cloneDeep(data.users))
        this.usersData = data.users
      })
      .finally(() => {
        this.isLoad = false
      })
  },
  methods: {
    getDataFromAPI(options) {
      this.loading = true

      return this.$store.dispatch('users/list')
        .then(res => {
          return {
            users: res.data.data.map(users => {
              users.value = false
              return users
            })
          }
        })
    },
    addUser() {
      this.$router.push('/users/new')
    }
  }
}
</script>

<style lang="stylus">
.main-color
  background-color rgb(253, 139, 33)
  border-radius 600px
  padding .25rem .75rem
.v-datatable__actions > div:first-child
  flex 1
</style>
