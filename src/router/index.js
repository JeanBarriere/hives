import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const is = (type) => (new RegExp('www|hives|localhost:8080')).test(window.location.host.split('.')[0]) === (type !== 'back')

const frontPages = ['Home', 'Signin']

const load = name => resolve => require(['%/' + (is('front') ? 'Front/' + (frontPages.includes(name) ? name : 'index') : 'Back/' + (name || 'index'))], resolve)

export default new Router({
  routes: [
    {
      path: '/',
      component: load(),
      children: [
        { path: '', name: 'home', component: load('Home') },
        { path: '/signin', name: 'signin', component: load('Signin') },
        { path: '*', component: load('Hello') }
      ]
    }
  ]
})
