import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import dashboard from './dashboard'
import users from './users'
import scramble from './scramble'

import mutations from './mutation'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
  },
  modules: {
    auth,
    dashboard,
    users,
    scramble
  },
  mutations: {
    [mutations.CREATING](state) {
      state.creating = true
    },
    [mutations.CREATED](state) {
      state.creating = false
    },
    [mutations.VIEWING](state) {
      state.viewing = true
    },
    [mutations.VIEWED](state) {
      state.viewing = false
    },
    [mutations.REMOVING](state) {
      state.removing = true
    },
    [mutations.REMOVED](state) {
      state.removing = false
    },
    [mutations.UPDATING](state) {
      state.updating = true
    },
    [mutations.UPDATED](state) {
      state.updating = false
    },
    [mutations.SET_ERROR](state, error) {
      state.error = error
    },
    [mutations.LOADING](state) {
      state.loading = true
    },
    [mutations.LOADED](state) {
      state.loading = false
    },
    [mutations.SET_SIDEBAR](state, value) {
      state.sidebar = value
    }
  },
  actions: {
    clearError({ commit }) {
      commit(mutations.SET_ERROR, null)
    },
    setError({ commit }, error) {
      commit(mutations.SET_ERROR, error)
    },
    openSidebar({ commit }) {
      commit(mutations.SET_SIDEBAR, true)
    },
    closeSidebar({ commit }) {
      commit(mutations.SET_SIDEBAR, false)
    },
    toggleSidebar({ state, commit }) {
      commit(mutations.SET_SIDEBAR, !state.sidebar)
    }
  },
  getters: {
    loading: state => state.loading,
    creating: state => state.creating,
    viewing: state => state.viewing,
    removing: state => state.removing,
    updating: state => state.updating,
    sidebar: state => state.sidebar,
    error: state => {
      if (state.error && state.error.response) {
        return state.error.response.data
      }
      return state.error
    },
    preloaderShow: state => state.preloaderShow
  }
})
