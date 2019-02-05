import axios from 'axios'

export default {
  getOneQuestion(id, options) {
    return axios.get('/word/one/' + id, options)
  },
  requestHelp(id, options) {
    return axios.get('/word/hint/' + id, options)
  },
  answerQuestion(id, answer, options) {
    return axios.post('/word/answer/' + id, answer, options)
  },
  historyList(options) {
    return axios.get('/word/history/list', options)
  }
}
