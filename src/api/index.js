import axios from 'axios'
import auth from './auth'
import dashboard from './dashboard'
import users from './users'
import scramble from './scramble'

export const TOKEN_NAME = 'token'
export const USERDATA = 'userdata'

const STORAGE_NAME = 'vuex'

export let host = process.env.API_URL
if (!process.env.API_URL) {
  host = 'http://207.148.79.65:3007/v1/'
}

axios.defaults.baseURL = host
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Accept'] = 'application/json'

export const setAccessToken = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export const setUserToken = token => {
  axios.defaults.headers.common['usertoken'] = `${token}`
}

export function getVuexStorage() {
  const ls = localStorage[STORAGE_NAME]
  if (!ls) return {}
  return JSON.parse(ls)
}

export function getAccessToken() {
  return localStorage.getItem(TOKEN_NAME)
}

export function getUserData() {
  return localStorage.getItem(USERDATA)
}

if (getAccessToken() !== null) {
  setAccessToken(getAccessToken())
}

export default {
  auth,
  dashboard,
  users,
  scramble
}
