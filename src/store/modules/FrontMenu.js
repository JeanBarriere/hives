const state = {
  items: [
    {
      name: 'Home',
      route: {
        name: 'home'
      },
      icon: 'home'
    },
    // {
    //   name: 'Heading',
    //   head: true
    // },
    // {
    //   name: 'Dropdown',
    //   dropdown: true,
    //   icon: 'puzzle',
    //   children: [
    //     {
    //       name: 'Link #1',
    //       route: { path: '#link' }
    //     },
    //     {
    //       name: 'Link #2',
    //       route: { path: '#link' }
    //     },
    //     {
    //       name: 'Dropdown 2',
    //       dropdown: true,
    //       children: [
    //         {
    //           name: 'Link #3',
    //           route: { path: '#link' }
    //         },
    //         {
    //           name: 'Link #4',
    //           route: { path: '#link' }
    //         },
    //         {
    //           name: 'Dropdown 3',
    //           dropdown: true,
    //           children: [
    //             {
    //               name: 'Link #5',
    //               route: { path: '#link' }
    //             },
    //             {
    //               name: 'Link #6',
    //               route: { path: '#link' }
    //             }
    //           ]
    //         }
    //       ]
    //     }
    //   ]
    // },
    {
      name: 'Credentials',
      head: true
    },
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
    }
    // {
    //   name: 'Page #2',
    //   route: {
    //     path: '#page-2'
    //   },
    //   icon: 'wrench'
    // },
    // {
    //   name: 'Page #3',
    //   route: {
    //     path: '#page-3'
    //   },
    //   icon: 'wrench'
    // }
  ]
}

const getters = {
  getFrontMenu (state) {
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
