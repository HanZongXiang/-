// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import $axios from './api'
import store from './store'
import timer from './components/timer'
import upload from './components/Upload'
import loading from './components/Loading-ufo'
import bus from './bus'
import './icons'

Vue.component('timer',timer)
Vue.component('upload',upload)
Vue.component('loading', loading)

Vue.use(ElementUI)
Vue.use(bus)
Vue.prototype.$axios = $axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
