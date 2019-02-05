import api from '../api/index.js'

export default {
  namespaced: true,
  actions: {
    portfolioForm({ commit }, data) {
      return api.dashboard.portfolioForm({
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
    },
    userForm({ commit }, data) {
      return api.dashboard.userForm({
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
    }
  }
}
