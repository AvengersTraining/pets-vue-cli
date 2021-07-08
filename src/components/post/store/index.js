import Utility from '@/helpers/Utility'
import PostService from '../api'

const SET_ERROR = 'SET_ERROR'
const SET_STATUS = 'SET_STATUS'
const SET_LOADING = 'SET_LOADING'

const state = {
  loading: false,
  status: null,
  error: {}
}

const mutations = {
  [SET_LOADING] (state, isLoading) {
    state.loading = isLoading
  },

  [SET_STATUS] (state, status) {
    state.status = status
  },

  [SET_ERROR] (state, { error }) {
    if (error.length === 0) {
      state.error = {}
    } else {
      state.error = Utility.handleError(error, error.response.status)
    }
  }
}

const actions = {
  async storePost ({state, commit}, post) {
    commit(SET_LOADING, true)
    try {
      await PostService.create(post)
      commit(SET_STATUS, true)
      commit(SET_ERROR, {error: []})
    } catch (err) {
      commit(SET_STATUS, false)
      commit(SET_ERROR, {error: err})
    }
    commit(SET_LOADING, false)

    return state.status
  },

  async getList ({state, commit}) {
    let posts = []
    commit(SET_LOADING, true)
    try {
      posts = (await PostService.all()).data.posts
      commit(SET_ERROR, {error: []})
    } catch (err) {
      commit(SET_ERROR, {error: err})
    }
    commit(SET_LOADING, false)

    return posts
  },
  async getPostById ({ state, commit }, id = null) {
    let post = {}
    commit(SET_LOADING, true)
    try {
      post = (await PostService.find(id)).data.post
      commit(SET_ERROR, { error: [] })
    } catch (err) {
      commit(SET_ERROR, { error: err })
    }
    commit(SET_LOADING, false)

    return post
  },

  async updatePost ({ state, commit }, post) {
    commit(SET_LOADING, true)
    try {
      await PostService.update(post)
      commit(SET_STATUS, true)
      commit(SET_ERROR, { error: [] })
    } catch (err) {
      commit(SET_STATUS, false)
      commit(SET_ERROR, { error: err })
    }
    commit(SET_LOADING, false)

    return state.status
  },

  async delete ({ state, commit }, id) {
    commit(SET_LOADING, true)
    try {
      await PostService.delete(id)
      commit(SET_STATUS, true)
      commit(SET_ERROR, { error: [] })
    } catch (err) {
      commit(SET_STATUS, false)
      commit(SET_ERROR, { error: err })
    }
    commit(SET_LOADING, false)

    return state.status
  }
}

const storePost = {
  state,
  actions,
  mutations,
  namespaced: true
}

export default storePost
