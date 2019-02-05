import axios from 'axios'
// import qs from 'querystring'

export default {
  portfolioForm(options) {
    return axios.get('/admin/dashboard/portfolioForm', options)
  },
  userForm(options) {
    return axios.get('/admin/dashboard/userForm', options)
  }
}
