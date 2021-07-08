import Vue from 'vue'
import Vuex from 'vuex'
import storeAuthen from '@/components/authen/store'
import storePet from '@/components/pet/store'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    storeAuthen,
    storePet
  }
})
