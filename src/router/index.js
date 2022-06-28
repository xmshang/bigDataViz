import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/views/Home'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: () => import('@/views/Home')
    },
    {
      path: '/manage',
      name: '管理平台',
      component: () => import('@/views/manage')
    }
  ]
})

export default router
