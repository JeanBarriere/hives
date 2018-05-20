import Vue from 'vue'

const state = {
  stops: [],
  updated: false
}

const getters = {
  getStops (state) {
    return state.stops
  }
}

const mutations = {
  pushStop (state, stop) {
    if (stop) {
      if (state.stops.findIndex(e => e.ID === stop.ID) === -1) {
        state.stops.push(stop)
      }
    }
  },
  pushStops (state, stops) {
    if (stops) {
      for (let stop of stops) {
        if (state.stops.findIndex(e => e.ID === stop.ID) === -1) {
          state.stops.push(stop)
        }
      }
    }
  },
  spliceStop (state, payload) {
    if (payload) {
      let id = state.stops.findIndex(e => e.ID === payload.ID)
      if (id === -1) {
        state.stops.splice(id, 1)
      }
    }
  }
}

const actions = {
  addStop ({ commit, state }, stop) {
    return new Promise((resolve, reject) => {
      Vue.api.post('stop', stop).then((res) => {
        commit('pushStop', res.data)
        resolve(state.stops)
      }).catch(reject)
    })
  },
  updateStops ({ commit, state }) {
    return new Promise((resolve, reject) => {
      Vue.api.get('stops').then((res) => {
        commit('pushStops', res.data)
        resolve(state.stops)
      }).catch(reject)
    })
  },
  removeStop ({ commit, state }, stop) {
    return new Promise((resolve, reject) => {
      Vue.api.delete(`stop/${stop.ID}`).then((res) => {
        commit('spliceStop', stop)
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
