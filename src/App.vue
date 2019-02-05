<template>
  <v-app id="keep">
    <div v-if="!$route.meta.public">
      <v-navigation-drawer
        v-model="drawer"
        fixed
        clipped
        class="grey lighten-4"
        app>
        <v-list dense class="grey lighten-4">
          <template id="nav">
            <v-list-tile class="py-2" to="/">
              <v-list-tile-action>
                <v-icon medium>home</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="grey--text">
                  Dashboard
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile class="py-2" :to="{name: 'users'}">
              <v-list-tile-action>
                <v-icon medium>people</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="grey--text">
                  Users
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile class="py-2" :to="{name: 'answer_history'}">
              <v-list-tile-action>
                <v-icon medium>question_answer</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="grey--text">
                  Answer History
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile class="py-2" @click="logout">
              <v-list-tile-action>
                <v-icon medium>keyboard_tab</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="grey--text">
                  Logout
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar color="primary" app clipped-left>
        <v-toolbar-side-icon color="white--text" @click="drawer = !drawer"></v-toolbar-side-icon>
        <span class="title ml-3 mr-5 white--text">CMS SCRAMBLE GAME</span>
        <v-spacer></v-spacer>
      </v-toolbar>
    </div>
    <v-content>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      drawer: null,
      items: [
        { icon: 'work', text: 'Career' },
        { icon: 'touch_app', text: 'Reminders' },
        { divider: true },
        { heading: 'Labels' },
        { icon: 'add', text: 'Create new label' },
        { divider: true },
        { icon: 'archive', text: 'Archive' },
        { icon: 'delete', text: 'Trash' },
        { divider: true },
        { icon: 'settings', text: 'Settings' },
        { icon: 'chat_bubble', text: 'Trash' },
        { icon: 'help', text: 'Help' },
        { icon: 'phonelink', text: 'App downloads' },
        { icon: 'keyboard', text: 'Keyboard shortcuts' }
      ]
    }
  },
  props: {
    source: String
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="stylus">
#nav
  padding 30px
  a
    font-weight bold
    color #2c3e50
    &.router-link-exact-active
      color #42b983
.load-full
  position absolute
  left calc(50%)
  top calc(50%)
</style>
