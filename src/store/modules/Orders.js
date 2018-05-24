import Vue from 'vue'

const state = {
  orders: [],
  updated: false
}

const getters = {
  getOrders (state) {
    return state.orders
  }
}

const mutations = {
  pushOrder (state, order) {
    if (order) {
      if (state.orders.findIndex(e => e.ID === order.ID) === -1) {
        state.orders.push(order)
      }
    }
  },
  pushOrders (state, orders) {
    if (orders) {
      for (let order of orders) {
        if (state.orders.findIndex(e => e.ID === order.ID) === -1) {
          state.orders.push(order)
        }
      }
    }
  },
  spliceOrder (state, payload) {
    if (payload) {
      let id = state.orders.findIndex(e => e.ID === payload.ID)
      if (id === -1) {
        state.orders.splice(id, 1)
      }
    }
  }
}

const actions = {
  addOrder ({ commit, state }, order) {
    return new Promise((resolve, reject) => {
      Vue.api.post('order', order).then((res) => {
        commit('pushOrder', res.data)
        resolve(state.orders)
      }).catch(reject)
    })
  },
  updateOrders ({ commit, state }) {
    return new Promise((resolve, reject) => {
      Vue.api.get('orders').then((res) => {
        commit('pushOrders', res.data)
        resolve(state.orders)
      }).catch(reject)
    })
  },
  removeOrder ({ commit, state }, order) {
    return new Promise((resolve, reject) => {
      Vue.api.delete(`order/${order.ID}`).then((res) => {
        commit('spliceOrder', order)
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
