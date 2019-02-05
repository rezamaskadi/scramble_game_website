import api from '../api/index.js'

export default {
  namespaced: true,
  actions: {
    getOneQuestion({ commit }, options) {
      return api.scramble.getOneQuestion(options, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'usertoken': localStorage.getItem('userToken')
        }
      })
    },
    requestHelp({ commit }, options) {
      return api.scramble.requestHelp(options, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'usertoken': localStorage.getItem('userToken')
        }
      }).catch(err => {
        return err
      })
    },
    answerQuestion({ commit }, options) {
      return api.scramble.answerQuestion(options.id, { answer: options.answer }, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'usertoken': localStorage.getItem('userToken')
        }
      }).catch(err => {
        return err
      })
    },
    historyList({ commit }) {
      return api.scramble.historyList({
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'usertoken': localStorage.getItem('token')
        }
      }).catch(err => {
        return err
      })
    }
  }
}
