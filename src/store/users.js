import api, { setUserToken } from '../api/index.js'

export default {
  namespaced: true,
  actions: {
    list({ commit }) {
      return api.users.list({
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'usertoken': localStorage.getItem('token')
        }
      })
    },
    register({ commit }, data) {
      return api.users.register(data, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(res => {
        const token = res.data.data.token

        setUserToken(token)
        localStorage.setItem('userToken', token)
        return res
      })
    }
  }
}
