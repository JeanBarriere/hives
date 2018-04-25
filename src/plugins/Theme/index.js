import Block from './Block'
import Container from './Container'
import Footer from './Footer'
import Header from './Header'
import Sidebar from './Sidebar'
import MenuTemplate from './MenuTemplate'

const Theme = {
  install (Vue) {
    Vue.component('block', Block)
    Vue.component('container', Container)
    Vue.component('h-footer', Footer)
    Vue.component('h-header', Header)
    Vue.component('h-sidebar', Sidebar)
    Vue.component('h-menu-template', MenuTemplate)
  }
}

export default Theme
