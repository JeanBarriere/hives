import Bootstrap from 'bootstrap-vue'
import VueSlimScroll from 'vue-slimscroll'
import Theme from './Theme'
import Wrapper from './Wrapper'

const plugins = {
  install (Vue) {
    Vue.use(Bootstrap)
    Vue.use(VueSlimScroll)
    Vue.use(Theme)
    Vue.use(Wrapper)
  }
}

export default plugins
