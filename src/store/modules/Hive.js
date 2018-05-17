import Vue from 'vue'

const state = {
  version: '1.0',
  workspace: {
    name: '',
    exists: undefined
  }
}

const getters = {
  getHiveVersion (state) {
    return state.version
  },
  getWorkspaceName (state) {
    return state.workspace.name
  },
  isExistingWorkspace (state) {
    return state.workspace.exists
  }
}

const mutations = {
  setHiveVersion (state, payload) {
    if (payload) {
      state.version = payload.version ? payload.version : '1.0'
    }
  },
  setWorkspace (state, payload) {
    if (payload) {
      state.workspace.name = payload.name || state.workspace.name
      state.workspace.exists = payload.exists !== null ? payload.exists : state.workspace.exists
    }
  }
}

const actions = {
  initWorkspace ({ dispatch, commit, state }) {
    return new Promise((resolve, reject) => {
      commit('setWorkspace', { name: window.location.host.split('.')[0] })
      dispatch('workspaceExists', state.workspace.name).then(() => {
        commit('setWorkspace', { exists: true })
        resolve()
      }).catch((error) => {
        commit('setWorkspace', { exists: false })
        reject(error)
      })
    })
  },
  workspaceExists ({ state }, workspace) {
    return new Promise((resolve, reject) => {
      Vue.api.post('signin', { workspace }).then(resolve).catch(reject)
    })
  },
  initApi ({ dispatch, rootState }) {
    if (rootState.User.loggedIn) {
      Vue.api.setToken(rootState.User.token, () => dispatch('refresh'), rootState.User.exp)
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
