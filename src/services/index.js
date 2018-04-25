import Api from './Api'
import Hive from './Hive'

const services = {
  install (Vue) {
    Vue.use(Api)
    Vue.use(Hive)
  }
}

export default services
