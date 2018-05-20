import Bootstrap from 'bootstrap-vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueMoment from 'vue-moment'
import VueSlimScroll from 'vue-slimscroll'
import Theme from './Theme'
import Wrapper from './Wrapper'

const plugins = {
  install (Vue) {
    Vue.use(Bootstrap)
    Vue.use(VueGoogleMaps, {
      load: {
        key: process.env.GOOGLE_MAPS_API_KEY,
        libraries: 'places'
      }
    })
    Vue.use(VueMoment)
    Vue.use(VueSlimScroll)
    Vue.use(Theme)
    Vue.use(Wrapper)
  }
}

export default plugins
