<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>CMS SCRAMBLE GAME</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="email"
                    prepend-icon="person"
                    name="email"
                    label="Email"
                    type="text">
                  </v-text-field>
                  <v-text-field
                    @keyup.enter="submit"
                    v-model="password"
                    id="password"
                    prepend-icon="lock"
                    name="password"
                    label="Password"
                    type="password">
                  </v-text-field>
                  <v-checkbox
                    :label="`Remember Me`"
                    v-model="remember"
                  ></v-checkbox>
                </v-form>
                {{ messagetext }}
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="submit">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import swal from 'sweetalert'

export default {
  data() {
    return {
      messagetext: '',
      email: '',
      password: '',
      remember: false
    }
  },
  methods: {
    submit() {
      const u = {
        email: this.email,
        password: this.password,
        remember: this.remember
      }

      this.$store.dispatch('auth/login', u).then(data => {
        if (data.status === 200) {
          this.messagetext = 'Redirecting...'
          this.$router.push('/')
        }
      }).catch(error => {
        swal('Oops...', error.message, 'error')
        this.messagetext = 'Login Failed! Please try again'
      })
    }
  }
}
</script>
