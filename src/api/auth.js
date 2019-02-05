import axios from 'axios'

export default {
  login(body, options) {
    return axios.post('/admin/login', body, options)
  }
}
