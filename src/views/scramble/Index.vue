<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="#4e277a">
                <v-toolbar-title>Scramble Game</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form v-on:submit.prevent="userRegister()">
                  <v-text-field prepend-icon="person" name="InsertUsername" label="Username" type="text" v-model="username"></v-text-field>
                  <v-text-field prepend-icon="email" name="InsertEmail" label="Email" type="text" v-model="email"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn dark color="#4e277a" v-on:click="userRegister()">register</v-btn>
              </v-card-actions>
              <v-footer height="auto" color="#4e277a">
                <v-layout justify-center row wrap>
                  <v-flex color="#4e277a" py-3 text-xs-center white--text xs12>
                    Deskripsi: <br /> ini adalah game tebak kata dari karakter huruf yang diacak,
                    <br />
                    anda harus menebak lalu mengisi kolom jawaban yang disediakan
                  </v-flex>
                  <v-flex color="#4e277a" py-3 text-xs-center white--text xs12>
                    Aturan bermain: <br />
                    1. Anda diberikan score awal sebesar 100 <br />
                    2. Anda diberikan 3x kesempatan bantuan <br />
                    3. Setiap jawaban salah score anda akan dikurangi 10 point <br />
                    4. Setiap jawaban benar akan mendapatkan score 100 point <br />
                    5. Total pertanyaan sebanyak 10 soal <br />
                    6. Score total akan diumumkan diakhir <br />
                    7. Email yang sudah digunakan, tidak bisa digunakan kembali <br />
                    8. bisa menggunakan akun dummy <br />
                    9. Apabila score mencapai 0, maka permainan berakhir <br />
                    <br />
                    Selamat mencoba
                    <br />
                    Terima kasih
                    <br />
                    2019 — <strong>Reza Maskadi</strong>
                  </v-flex>
                </v-layout>
              </v-footer>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<style>
.swal-modal {
  font-family: Helvetica;
}
</style>

<script>
import swal from 'sweetalert'

export default {
  data: () => ({
    email: null,
    username: null,
    drawer: null
  }),
  methods: {
    userRegister() {
      const dataRegister = {
        username: this.username,
        email: this.email
      }

      this.$store.dispatch('users/register', dataRegister).then(data => {
        if (data.status === 200) {
          swal('Good Job!', 'Lets start the game!', 'success')
          this.$router.push('/scramble_game/chalenge?question=1')
        }
      }).catch(() => {
        swal('Oops...', 'Email has been used', 'error')
      })
    }
  },
  props: {
    source: String
  }
}
</script>
