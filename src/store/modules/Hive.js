const state = {
  version: '1.0'
}

const getters = {
  getHiveVersion (state) {
    return state.version
  }
}

const mutations = {
  setHiveVersion (state, payload) {
    if (payload) {
      state.version = payload.version ? payload.version : '1.0'
    }
  }
}

const actions = {}

export default {
  state,
  getters,
  mutations,
  actions
}
