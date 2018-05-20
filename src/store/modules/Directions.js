import Vue from 'vue'

const state = {
  directions: [],
  updated: false
}

const getters = {
  getDirections (state) {
    return state.directions
  }
}

const mutations = {
  pushDirection (state, direction) {
    if (direction) {
      if (state.directions.findIndex(e => e.ID === direction.ID) === -1) {
        state.directions.push(direction)
      }
    }
  },
  pushDirections (state, directions) {
    if (directions) {
      for (let direction of directions) {
        if (state.directions.findIndex(e => e.ID === direction.ID) === -1) {
          state.directions.push(direction)
        }
      }
    }
  },
  spliceDirection (state, payload) {
    if (payload) {
      let id = state.directions.findIndex(e => e.ID === payload.ID)
      if (id === -1) {
        state.directions.splice(id, 1)
      }
    }
  }
}

const actions = {
  addDirection ({ commit, state }) {
    return new Promise((resolve, reject) => {
      Vue.api.post('direction').then((res) => {
        commit('pushDirection', res.data)
        resolve(state.directions)
      }).catch(reject)
    })
  },
  updateDirections ({ commit, state }) {
    return new Promise((resolve, reject) => {
      Vue.api.get('directions').then((res) => {
        commit('pushDirections', res.data)
        resolve(state.directions)
      }).catch(reject)
    })
  },
  removeDirection ({ commit, state }, direction) {
    return new Promise((resolve, reject) => {
      Vue.api.delete(`direction/${direction.ID}`).then((res) => {
        commit('spliceDirection', direction)
        resolve()
      }).catch(reject)
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
