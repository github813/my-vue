// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'
import $ from 'jquery'
import {code2player} from './utils/filters'
Vue.filter("code2player", code2player)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,store,VueResource,$,
  components: { App },
  template: '<App/>'
})
