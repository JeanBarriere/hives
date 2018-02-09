import Api from './Api'
import Hives from './Hives'

const services = {
  install (Vue) {
    Vue.use(Api)
    Vue.use(Hives)
  }
}

export default services
