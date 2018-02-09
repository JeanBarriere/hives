import Bootstrap from 'bootstrap-vue'
import Theme from './Theme'
import Wrapper from './Wrapper'

const plugins = {
  install (Vue) {
    Vue.use(Bootstrap)
    Vue.use(Theme)
    Vue.use(Wrapper)
  }
}

export default plugins
