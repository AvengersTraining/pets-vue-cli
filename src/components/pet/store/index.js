import Utility from '@/helpers/Utility'
import PetService from '../api'

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
  async storePet ({ state, commit }, pet) {
    commit(SET_LOADING, true)
    try {
      await PetService.create(pet)
      commit(SET_STATUS, true)
      commit(SET_ERROR, { error: [] })
    } catch (err) {
      commit(SET_STATUS, false)
      commit(SET_ERROR, { error: err })
    }
    commit(SET_LOADING, false)

    return state.status
  },

  async getList ({ state, commit }, type = null) {
    let pets = []
    commit(SET_LOADING, true)
    try {
      pets = (await PetService.all(type)).data.pets
      commit(SET_ERROR, { error: [] })
    } catch (err) {
      commit(SET_ERROR, { error: err })
    }
    commit(SET_LOADING, false)

    return pets
  },

  async getPetById ({ state, commit }, id = null) {
    let pet = {}
    commit(SET_LOADING, true)
    try {
      pet = (await PetService.find(id)).data.pet
      commit(SET_ERROR, { error: [] })
    } catch (err) {
      commit(SET_ERROR, { error: err })
    }
    commit(SET_LOADING, false)

    return pet
  },

  async update ({ state, commit }, pet) {
    commit(SET_LOADING, true)
    try {
      await PetService.update(pet)
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
      await PetService.delete(id)
      commit(SET_STATUS, true)
      commit(SET_ERROR, { error: [] })
    } catch (err) {
      console.log(err)
      commit(SET_STATUS, false)
      commit(SET_ERROR, { error: err })
    }
    commit(SET_LOADING, false)

    return state.status
  }
}

const storePet = {
  state,
  actions,
  mutations,
  namespaced: true
}

export default storePet
