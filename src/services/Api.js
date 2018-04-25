export class ApiService {
  constructor () {
    console.log('[Service][API] Created')
  }
}

const Api = {
  install (Vue) {
    Vue.prototype.$api = new ApiService()
  }
}

export default Api
