import Vue from 'vue'
import moment from 'moment'

const state = {
  name: '',
  email: '',
  token: '',
  refresh: '',
  exp: null,
  loggedIn: false
}

const getters = {
  isUserLoggedIn (state) {
    return state.loggedIn
  }
}

const mutations = {
  setUser (state, payload) {
    if (payload) {
      state.loggedIn = true
      if (payload.user) {
        state.name = payload.user.name || state.name
        state.email = payload.user.email || state.email
      }
      state.token = payload.token || state.token
      state.refresh = payload.refresh || state.refresh
      state.exp = payload.exp || state.exp
    } else {
      state.name = ''
      state.email = ''
      state.token = ''
      state.refresh = ''
      state.exp = null
      state.loggedIn = false
    }
  }
}

const actions = {
  refresh ({ dispatch, commit, state }) {
    return new Promise((resolve, reject) => {
      if (!state.loggedIn) {
        reject(new Error('Not logged in'))
      } else {
        Vue.api.resetToken().post('signin', { refresh: state.refresh }).then((res) => {
          commit('setUser', { ...res.data, exp: moment().add('days', 30) })
          Vue.api.setToken(state.token, () => dispatch('refresh'), state.exp)
          resolve()
        }).catch(resolve)
      }
    })
  },
  signin ({ dispatch, commit, state }, payload) {
    return new Promise((resolve, reject) => {
      if (payload.workspace && payload.email && payload.password) {
        Vue.api.post('signin', payload).then((res) => {
          commit('setUser', { ...res.data, exp: moment().add('days', 30) })
          Vue.api.setToken(state.token, () => dispatch('refresh'), state.exp)
          resolve()
        }).catch(reject)
      } else {
        reject(new Error('Form not completed'))
      }
    })
  },
  signup ({ dispatch, commit, state }, payload) {
    return new Promise((resolve, reject) => {
      if (payload.workspace && payload.name && payload.email && payload.password) {
        Vue.api.post('signup', payload).then((res) => {
          commit('setUser', { ...res.data, exp: moment().add('days', 30) })
          Vue.api.setToken(state.token, () => dispatch('refresh'), state.exp)
          resolve()
        }).catch(reject)
      } else {
        reject(new Error('Form not completed'))
      }
    })
  },
  logout ({ commit, state }) {
    return new Promise((resolve) => {
      commit('setUser')
      Vue.api.resetToken()
      resolve()
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
