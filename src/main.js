import Vue from 'vue'
import Vuex from 'vuex'
import App from '@/App'
import { store } from '@/store'
import routes from '@/router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import i18n from '@/plugins/i18n'
import axios from 'axios'
import VueRouter from 'vue-router'
import middlewarePipeline from '@/router/middlewarePipeline'

axios.defaults.baseURL = 'https://pet-rescue-api-haolt.herokuapp.com/api/v1'
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
Vue.use(BootstrapVue)
Vue.use(Vuex)
Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware

  const context = {
    to,
    from,
    next,
    store: store
  }
  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  i18n,
  components: { App },
  template: '<App/>'
})

if (localStorage.getItem('token')) {
  axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
}
