<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="#4e277a" >
                <v-toolbar-title >Scramble Game #{{ this.$route.query.question }}</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form v-on:submit.prevent="AnswerQuestion()">
                  <v-toolbar dark color="#4e277a">
                      <v-flex class="text-xs-center">
                        <v-toolbar-title :style="{fontSize: fontSize + 'px', color: '#f7b844'}">{{ this.scrambleWord }}</v-toolbar-title>
                      </v-flex>
                  </v-toolbar>
                  <v-text-field prepend-icon="question_answer" name="InsertAnswer" label="Answer" type="text" v-model="answer"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn dark color="#f7b844" v-on:click="requestHelp()">bantuan</v-btn>
                <v-btn dark color="#4e277a" v-on:click="AnswerQuestion()">submit</v-btn>
              </v-card-actions>
              <v-footer height="auto" color="#4e277a">
                <v-layout justify-center row wrap>
                  <v-flex color="#4e277a" py-3 text-xs-center white--text xs12>
                    Berapa banyak huruf: <br /> {{ this.totalWord }} <br />
                    Kata Kunci: <br /> {{ this.kata_kunci }} <br />
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
    answer: null,
    scrambleWord: null,
    totalWord: null,
    bantuan: null,
    kata_kunci: null,
    fontSize: 30
  }),
  mounted() {
    this.getQuestion()
  },
  methods: {
    AnswerQuestion() {
      let answer = {
        answer: this.answer,
        id: this.$route.query.question
      }
      return this.$store.dispatch('scramble/answerQuestion', answer)
        .then(res => {
          let score = res.data.data.now_score
          if (res.data.data.message === 'wrong answer, score -10') {
            if (score === 0) {
              this.$router.push('/scramble_game')
              swal('Game over T_T, Total Score anda : ' + score + ' \n Terima kasih sudah mencoba game ini', 'silahkan register untuk mencoba kembali', 'error')
            } else {
              return swal('Jawaban Salah', 'Score anda dikuraning 10 \n Score anda sekarang: ' + score, 'error')
            }
          } else {
            let incrementId = parseInt(this.$route.query.question) + 1
            if (incrementId === 11) {
              Object.assign(this.$data, this.$options.data())
              this.$router.push('/scramble_game')
              swal('Scramble game selesai', 'Total Score anda :' + score + ' \n Terima kasih sudah mencoba game ini, silahkan register untuk mencoba kembali', 'success')
            } else {
              this.$router.push('/scramble_game/chalenge?question=' + incrementId)
              Object.assign(this.$data, this.$options.data())
              this.getQuestion()
              return swal('Jawaban Benar', 'Score anda ditambahkan 100 \n Score anda sekarang: ' + score, 'success')
            }
          }
        })
    },
    getQuestion() {
      return this.$store.dispatch('scramble/getOneQuestion', this.$route.query.question)
        .then(res => {
          function randomsort(a, b) {
            return Math.random() > 0.5 ? -1 : 1
          }

          this.kata_kunci = res.data.data.hint

          let scramble = res.data.data.scramble_word
          this.totalWord = scramble.length
          this.scrambleWord = scramble.split('').sort(randomsort).join('')
        })
    },
    requestHelp() {
      return this.$store.dispatch('scramble/requestHelp', this.$route.query.question)
        .then(res => {
          this.bantuan = res.data.data.hint_2
          return swal('Hint!', this.bantuan + '\n sisa bantuan anda: ' + res.data.data.total_hint, 'success')
        }).catch(() => {
          return swal('Hint!', 'sisa bantuan anda sudah habis', 'error')
        })
    }
  },
  props: {
    source: String
  }
}
</script>
