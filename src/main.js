import Vue from 'vue'
import Hive from '@/Hive'
import router from '@/router'
import store from '@/store'
import i18n from '@/translation'
import plugins from '@/plugins'
import services from '@/services'
import './registerServiceWorker'

Vue.config.productionTip = false
Vue.use(plugins)
Vue.use(services)

new Vue({
  router,
  store,
  i18n,
  render: h => h(Hive)
}).$mount('#hive')
