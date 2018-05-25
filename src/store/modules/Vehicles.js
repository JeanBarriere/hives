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
      let idx = state.vehicles.findIndex(e => e.ID === vehicle.ID)
      if (idx === -1) {
        state.vehicles.push(vehicle)
      } else {
        state.vehicles.splice(idx, 1, vehicle)
      }
    }
  },
  pushVehicles (state, vehicles) {
    if (vehicles) {
      for (let vehicle of vehicles) {
        let idx = state.vehicles.findIndex(e => e.ID === vehicle.ID)
        if (idx === -1) {
          state.vehicles.push(vehicle)
        } else {
          state.vehicles.splice(idx, 1, vehicle)
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
  linkVehicleToWarehouse ({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      Vue.api.post(`truck/${payload.vehicleID}/join`, { warehouse_id: payload.warehouseID }).then((res) => {
        commit('pushVehicle', res.data)
        resolve(state.vehicles)
      }).catch(reject)
    })
  },
  removeVehicle ({ commit, state }, vehicle) {
    return new Promise((resolve, reject) => {
      Vue.api.delete(`truck/${vehicle.ID}`).then((res) => {
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
