const state = {
  items: [
    {
      name: 'Signin',
      route: {
        name: 'signin'
      },
      icon: 'user',
      publicOnly: true
    },
    {
      name: 'Logout',
      route: {
        name: 'logout'
      },
      icon: 'user',
      privateOnly: true
    },
    {
      name: 'Dashboard',
      route: {
        name: 'dash-home'
      },
      icon: 'grid',
      privateOnly: true,
      left: true
    },
    {
      name: 'Administration',
      head: true
    },
    {
      name: 'Users',
      route: {
        name: 'dash-users'
      },
      icon: 'user',
      privateOnly: true,
      left: true
    },
    {
      name: 'Management',
      head: true
    },
    {
      name: 'Fleet',
      route: {
        name: 'dash-fleet'
      },
      icon: 'tag',
      privateOnly: true,
      left: true
    },
    {
      name: 'Stops',
      route: {
        name: 'dash-stops'
      },
      icon: 'flag',
      privateOnly: true,
      left: true
    },
    {
      name: 'Directions',
      route: {
        name: 'dash-directions'
      },
      icon: 'directions',
      privateOnly: true,
      left: true
    },
    {
      name: 'Marketplace',
      head: true
    },
    {
      name: 'Orders',
      route: {
        name: 'dash-orders'
      },
      icon: 'drawer',
      privateOnly: true,
      left: true
    },
    {
      name: 'Products',
      route: {
        name: 'dash-products'
      },
      icon: 'puzzle',
      privateOnly: true,
      left: true
    },
    {
      name: 'Visualization',
      head: true
    },
    {
      name: 'Real-time map',
      route: {
        name: 'dash-map'
      },
      icon: 'map',
      privateOnly: true,
      left: true
    }
  ]
}

const getters = {
  getBackMenu (state) {
    return state.items
  }
}

const mutations = {
  addFrontMenuItem (state, payload) {
    state.items.push(payload)
  },
  addFrontMenuItemAt (state, { idx, item }) {
    state.items.splice(idx, 0, item)
  },
  removeFrontMenuItemByIndex (state, idx) {
    state.items.splice(idx, 1)
  },
  removeFrontMenuItem (state, payload) {
    let idx = state.items.indexOf(payload)
    state.items.splice(idx, 1)
  },
  replaceFrontMenuItemByIndex (state, { idx, item }) {
    state.items.splice(idx, 1, item)
  },
  replaceFrontMenuItem (state, { item, newItem }) {
    let idx = state.items.indexOf(item)
    state.items.splice(idx, 1, newItem)
  }
}

const actions = {}

export default {
  state,
  getters,
  mutations,
  actions
}
