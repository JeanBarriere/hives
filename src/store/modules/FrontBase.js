const state = {
  title: '<span class="text-dual-primary-dark">H</span><span class="text-primary">ive</span>',
  slogan: 'The best of its kind'
}

const getters = {
  getFrontTitle (state) {
    return state.title
  },
  getFrontSlogan (state) {
    return state.slogan
  }
}

const mutations = {}

const actions = {}

export default {
  state,
  getters,
  mutations,
  actions
}
