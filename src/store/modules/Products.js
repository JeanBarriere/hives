import Vue from 'vue'

const state = {
  products: [],
  updated: false
}

const getters = {
  getProducts (state) {
    return state.products
  },
  getProductById: state => id => {
    return state.products.find(p => p.ID === id)
  },
  getProductsAsOptions (state) {
    return state.products.map(p => ({ text: p.name, value: p.ID }))
  }
}

const mutations = {
  pushProduct (state, product) {
    if (product) {
      if (state.products.findIndex(e => e.ID === product.ID) === -1) {
        state.products.push(product)
      }
    }
  },
  pushProducts (state, products) {
    if (products) {
      for (let product of products) {
        if (state.products.findIndex(e => e.ID === product.ID) === -1) {
          state.products.push(product)
        }
      }
    }
  },
  spliceProduct (state, payload) {
    if (payload) {
      let id = state.products.findIndex(e => e.ID === payload.ID)
      if (id === -1) {
        state.products.splice(id, 1)
      }
    }
  }
}

const actions = {
  addProduct ({ commit, state }, product) {
    return new Promise((resolve, reject) => {
      Vue.api.post('product', product).then((res) => {
        commit('pushProduct', res.data)
        resolve(state.products)
      }).catch(reject)
    })
  },
  updateProducts ({ commit, state }) {
    return new Promise((resolve, reject) => {
      Vue.api.get('products').then((res) => {
        commit('pushProducts', res.data)
        resolve(state.products)
      }).catch(reject)
    })
  },
  removeProduct ({ commit, state }, product) {
    return new Promise((resolve, reject) => {
      Vue.api.delete(`product/${product.ID}`).then((res) => {
        commit('spliceProduct', product)
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
