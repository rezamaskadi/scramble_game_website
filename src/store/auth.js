import mutations from './mutation.js'
import api, { setAccessToken } from '../api/index.js'
export default {
  namespaced: true,
  state: {
    login: [],
    isLogout: false,
    isLogin: !!localStorage.getItem('token'),
    access_token: null
  },
  mutations: {
    [mutations.SET_LOGIN](state, token) {
      localStorage.setItem('token', token)
      state.login = token
      state.access_token = token
      state.isLogout = false
      state.isLogin = true
    },
    [mutations.SET_LOGOUT](state) {
      localStorage.removeItem('token')
      state.isLogout = true
      state.isLogin = false
    }
  },
  actions: {
    login({ commit }, data) {
      return new Promise((resolve, reject) => {
        api.auth.login(data, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(res => {
          const token = res.data.data.token

          setAccessToken(token)
          commit('SET_LOGIN', token)

          resolve(res)
        })
          .catch(err => {
            reject(err)
          })
      })
    },
    logout({ commit }) {
      commit('SET_LOGOUT')
    }
  },
  getters: {
    isLogin: state => state.isLogin
  }
}
