import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('views/layout/Layout.vue'),
    children: [
      {
        path: '', // 默认子路由
        component: () => import('views/home/Home.vue')
      },
      {
        path: '/qa',
        component: () => import('views/qusans/Qusans.vue')
      },
      {
        path: '/video',
        component: () => import('views/video/Video.vue')
      },
      {
        path: '/profile',
        component: () => import('views/profile/Profile.vue')
      },
      {
        path: '/search',
        component: () => import('views/search/Search.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('views/login/Login.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
