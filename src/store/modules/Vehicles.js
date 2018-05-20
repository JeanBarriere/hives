import Vue from 'vue'

const state = {
  vehicles: [],
  updated: false
}

const getters = {
  getVehicles (state) {
    return state.vehicles
  }
}

const mutations = {
  pushVehicle (state, vehicle) {
    if (vehicle) {
      if (state.vehicles.findIndex(e => e.ID === vehicle.ID) === -1) {
        state.vehicles.push(vehicle)
      }
    }
  },
  pushVehicles (state, vehicles) {
    if (vehicles) {
      for (let vehicle of vehicles) {
        if (state.vehicles.findIndex(e => e.ID === vehicle.ID) === -1) {
          state.vehicles.push(vehicle)
        }
      }
    }
  },
  spliceVehicle (state, payload) {
    if (payload) {
      let id = state.vehicles.findIndex(e => e.ID === payload.ID)
      if (id === -1) {
        state.vehicles.splice(id, 1)
      }
    }
  }
}

const actions = {
  addVehicle ({ commit, state }, vehicle) {
    return new Promise((resolve, reject) => {
      Vue.api.post('truck', vehicle).then((res) => {
        commit('pushVehicle', res.data)
        resolve(state.vehicles)
      }).catch(reject)
    })
  },
  updateVehicles ({ commit, state }) {
    return new Promise((resolve, reject) => {
      Vue.api.get('trucks').then((res) => {
        commit('pushVehicles', res.data)
        resolve(state.vehicles)
      }).catch(reject)
    })
  },
  removeVehicle ({ commit, state }, vehicle) {
    return new Promise((resolve, reject) => {
      Vue.api.delete(`vehicle/${vehicle.ID}`).then((res) => {
        commit('spliceVehicle', vehicle)
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
