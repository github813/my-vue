import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import PagesView from '../views/PagesView'
import Home from '../views/Home'
import login from '../views/login'
import myself from '../views/myself'
import vehicle from '../views/vehicle'
import index from '../views/index'
import sendgood from '../views/goods/sendgood'
import eletable from '../views/test/eletable'
import mergetable from '../views/test/mergetable'
import twotable from '../views/test/twotable'
import expandtable from '../views/test/expandtable'
import goodstype from '../views/goodstype/goodstype'
import addresslist from '../views/address/addresslist'
import map from '../views/address/addmap'
import basecharts from '../views/highcharts/basecharts'
import lifecycle from '../views/vue/lifecycle'
import watch from '../views/vue/watch'
Vue.use(Router)

const router = new Router({
  mode:'history',//不使用hash链接 URL中不显示#
  routes: [
    {
      path: '/login',
      component: login
    },
    {
      path: '/',
      component: Home,
      redirect: '/index',
      meta: {
        requireAuth: true
      },
      children: [
        {path:'/index',component: index},
        {path:'/goods/sendgood',component:sendgood},
        {path:'/test/eletable',component:eletable},
        {path:'/test/mergetable',component:mergetable},
        {path:'/test/expandtable',component:expandtable},
        {path:'/test/twotable',component:twotable},
        {path: '/myself/info',component: myself},
        {path:'/vehicle',component: vehicle},
        {path:'/address',component: addresslist},
        {path:'/address/map/:type/:id',component: map},
        {path:'/goodstype',component: goodstype},
        {path:'/highcharts/basecharts',component:basecharts},
        {path:'/vue/lifecycle',component:lifecycle},
        {path:'/vue/watch',component:watch}
      ]
    }

  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
    if (sessionStorage.getItem("userinfo")) {// 判断是否登录
      sessionStorage.setItem('url',to.fullPath);
      next()
    } else {// 没登录则跳转到登录界面
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    sessionStorage.setItem('url',to.fullPath);
    next()

  }
})
export default router
