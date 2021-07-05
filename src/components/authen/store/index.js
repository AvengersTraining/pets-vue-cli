import Utility from '@/helpers/Utility'
import UserService from '../api/index'
import ConfigAxios from '@/helpers/ConfigAxios'

const AUTH_SET_USER = 'AUTH_SET_USER'
const AUTH_SET_ERROR = 'AUTH_SET_ERROR'
const AUTH_SET_TOKEN = 'AUTH_SET_TOKEN'
const AUTH_SET_LOADING = 'AUTH_SET_LOADING'
const AUTH_SET_LOGGED_IN = 'AUTH_SET_LOGGED_IN'

const state = {
  loading: false,
  token: null,
  loggedIn: false,
  user: {},
  error: {}
}
const getters = {
  isLoggedIn (state) {
    return !!state.token
  }
}
const mutations = {
  [AUTH_SET_USER] (state, user) {
    state.user = user
  },

  [AUTH_SET_LOADING] (state, isLoading) {
    state.loading = isLoading
  },

  [AUTH_SET_TOKEN] (state, token) {
    state.token = token
  },

  [AUTH_SET_ERROR] (state, { error }) {
    if (error.length === 0) {
      state.error = {}
    } else {
      state.error = Utility.handleError(error, error.response.status)
    }
  },

  [AUTH_SET_LOGGED_IN] (state, loggedIn) {
    state.loggedIn = loggedIn
  }
}

const actions = {
  async login ({ state, commit }, user) {
    commit(AUTH_SET_LOADING, true)
    try {
      let loginResponse = await UserService.login(user)
      let token = loginResponse.data
      ConfigAxios.setAuthorizationHeader(token.token_type, token.access_token)
      commit(AUTH_SET_TOKEN, token.access_token)
      commit(AUTH_SET_LOGGED_IN, true)
      commit(AUTH_SET_ERROR, { error: [] })
    } catch (err) {
      commit(AUTH_SET_ERROR, { error: err })
    }
    commit(AUTH_SET_LOADING, false)
    if (state.loggedIn) {
      window.location.href = '/'
    }
  },

  async logout ({ state, commit }) {
    commit(AUTH_SET_LOADING, true)
    try {
      await UserService.logout()
      ConfigAxios.setAuthorizationHeader()
      commit(AUTH_SET_TOKEN, '')
      commit(AUTH_SET_USER, {})
      commit(AUTH_SET_LOGGED_IN, false)
    } catch (err) {
      commit(AUTH_SET_ERROR, { error: err })
    }

    commit(AUTH_SET_LOADING, true)
    if (!state.token) {
      window.location.href = '/Login'
    }
  },

  async initAuth ({ commit }) {
    commit(AUTH_SET_LOADING, true)
    try {
      let infoUser = await UserService.getProfile()
      commit(AUTH_SET_USER, infoUser.data)
      commit(AUTH_SET_LOGGED_IN, true)
    } catch (err) {
      commit(AUTH_SET_ERROR, {error: err})
      ConfigAxios.setAuthorizationHeader()
    }
    commit(AUTH_SET_LOADING, true)
    return state.loggedIn
  }
}

const storeAuthen = {
  state,
  actions,
  mutations,
  namespaced: true,
  getters
}

export default storeAuthen
