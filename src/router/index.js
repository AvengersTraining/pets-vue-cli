import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/authen/view/Login'
import auth from '@/middleware/auth'
import guest from '@/middleware/guest'
Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      middleware: [auth]
    },
    component: Index
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      middleware: [guest]
    },
    component: Login
  }
]

export default routes
