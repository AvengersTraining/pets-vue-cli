import Vue from 'vue'
import Vuex from 'vuex'
import storeAuthen from '@/components/authen/store'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    storeAuthen
  }
})
