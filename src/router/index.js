import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/authen/view/Login'
import Register from '@/components/authen/view/Register'
import Pets from '@/components/pet/view/List'
import Profile from '@/components/authen/view/Profile'
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
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      middleware: [guest]
    },
    component: Register
  },
  {
    path: '/pets',
    name: 'pets',
    meta: {
      middleware: [auth]
    },
    component: Pets
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {
      middleware: [auth]
    },
    component: Profile
  }
]

export default routes
