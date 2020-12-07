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
  },
  {
    // 使用动态路由，在文章展示页面中传入文章id
    path: '/article/:articleId',
    component: () => import('views/article/Article.vue'),
    // 当在路由中设置了props为true后，会将params通过props的方式映射到对应的页面中
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
