import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router/router'
import { store } from './store/index.js'
import Vuetify from 'vuetify'
import middleware from './router/middleware.js'

Vue.config.productionTip = false
Vue.use(Vuetify, {
  theme: {
    primary: '#4e277a',
    secondary: '#424242',
    accent: '#2bace2',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
    button: '#faa31e'
  }
})

middleware.register({ store, router })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
