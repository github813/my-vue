import Vue from 'vue'
import Vuex from 'vuex'
import comment from '../modules/comment'
import admin from '../modules/admin'
import supplier from '../modules/supplier'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import '../element-variables.scss'
Vue.use(ElementUI)
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    comment,admin,supplier
  }
})
