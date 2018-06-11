import Vue from 'vue'
import Vuex from 'vuex'
import comment from './modules/comment'
import admin from './modules/admin'
import userservice from './modules/userservice'
import ElementUI from 'element-ui'
import getters from './getters'
import '../element-variables.scss'
Vue.use(ElementUI)
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    comment,admin,userservice
  },
  getters
})
