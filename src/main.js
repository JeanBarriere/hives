// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Hives from '@/Hives'
import router from '@/router'
import store from '@/store'
import i18n from '@/translation'
import plugins from '@/plugins'
import services from '@/services'
import '@/assets/scss/main.scss'

Vue.config.productionTip = false
Vue.use(plugins)
Vue.use(services)

/* eslint-disable no-new */
new Vue({
  el: '#hives',
  router,
  store,
  i18n,
  template: '<Hives/>',
  components: { Hives }
})
