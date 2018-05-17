import Vue from 'vue'

const state = {
  warehouses: [],
  updated: false
}

const getters = {
  getWarehouses (state) {
    return state.warehouses
  }
}

const mutations = {
  pushWarehouse (state, warehouse) {
    if (warehouse) {
      if (state.warehouses.findIndex(e => e.ID === warehouse.ID) === -1) {
        state.warehouses.push(warehouse)
      }
    }
  },
  pushWarehouses (state, warehouses) {
    if (warehouses) {
      for (let warehouse of warehouses) {
        if (state.warehouses.findIndex(e => e.ID === warehouse.ID) === -1) {
          state.warehouses.push(warehouse)
        }
      }
    }
  },
  spliceWarehouse (state, payload) {
    if (payload) {
      let id = state.warehouses.findIndex(e => e.ID === payload.ID)
      if (id === -1) {
        state.warehouses.splice(id, 1)
      }
    }
  }
}

const actions = {
  addWarehouse ({ commit, state }, warehouse) {
    return new Promise((resolve, reject) => {
      Vue.api.post('warehouse', warehouse).then((res) => {
        commit('pushWarehouse', res.data)
        resolve(state.warehouses)
      }).catch(reject)
    })
  },
  updateWarehouses ({ commit, state }) {
    return new Promise((resolve, reject) => {
      Vue.api.get('warehouses').then((res) => {
        commit('pushWarehouses', res.data)
        resolve(state.warehouses)
      }).catch(reject)
    })
  },
  removeWarehouse ({ commit, state }, warehouse) {
    return new Promise((resolve, reject) => {
      Vue.api.delete(`warehouse/${warehouse.ID}`).then((res) => {
        commit('spliceWarehouse', warehouse)
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
