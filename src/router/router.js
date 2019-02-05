import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Users from '../views/users/Index.vue'
import ScrambleGame from '../views/scramble/Index.vue'
import ScrambleGameChalenge from '../views/scramble/Scramble_question.vue'
import AnswerHistory from '../views/answer_history/Index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/scramble_game',
      name: 'scramble_game',
      component: ScrambleGame,
      meta: {
        public: true
      }
    },
    {
      path: '/scramble_game/chalenge',
      name: 'scramble_game_chalenge',
      component: ScrambleGameChalenge,
      meta: {
        public: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        public: true,
        middleware: 'guest'
      }
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        middleware: 'auth'
      }
    },
    {
      path: '/users',
      name: 'users',
      component: Users,
      meta: {
        middleware: 'auth'
      }
    },
    {
      path: '/answer_history',
      name: 'answer_history',
      component: AnswerHistory,
      meta: {
        middleware: 'auth'
      }
    }
  ]
})
