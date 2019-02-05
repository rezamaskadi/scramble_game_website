import axios from 'axios'

export default {
  list(options) {
    return axios.get('/admin/users/list?', options)
  },
  register(data) {
    return axios.post('/user/register/', data)
  }
}
