import '../store/auth.js'
import router from './router'

export default {
  auth({ store, next, to }) {
    if (!store.getters['auth/isLogin']) {
      next('/login')
    }
    next()
  },
  guest({ store, next }) {
    if (store.getters['auth/isLogin']) {
      next('/')
    }
  },
  checkMiddleWare({ to, store, next }) {
    switch (to.meta.middleware) {
      case 'auth' :
        this.auth({ store, next, to })
        break
      case 'guest' :
        this.guest({ store, next })
        break
    }
  },
  register({ store, next }) {
    router.beforeEach((to, from, next) => {
      this.checkMiddleWare({ to, store, next })
      next()
    })
  }
}
