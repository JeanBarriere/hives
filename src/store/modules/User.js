const state = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  loggedIn: false
}

const getters = {
  isUserLoggedIn (state) {
    return state.loggedIn
  }
}

const mutations = {
  setUserOptions (state, payload) {
    if (payload) {
      state.loggedIn = true
    }
  },
  clearUser (state) {
    state.firstName = ''
    state.lastName = ''
    state.email = ''
    state.phone = ''
    state.loggedIn = false
  }
}

const actions = {
  login ({commit, state}, payload) {
    return new Promise((resolve, reject) => {
      commit('setUserOptions', { firstName: 'hello', lastName: 'world' })
      setTimeout(() => {
        resolve(state)
      }, 1500)
    })
  },
  logout ({commit, state}) {
    return new Promise((resolve) => {
      commit('clearUser')
      setTimeout(() => {
        resolve()
      }, 500)
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
