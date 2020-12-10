import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store/index.js'

import { Dialog } from 'vant';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('views/layout/Layout.vue'),
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import('views/home/Home.vue'),
        // 设置路由元数据，用来标识该访问页面是否需要登录
        meta: { needLogin: false }
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('views/qusans/Qusans.vue'),
        meta: { needLogin: false }
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('views/video/Video.vue'),
        meta: { needLogin: true }
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('views/profile/Profile.vue'),
        meta: { needLogin: false }
      },
      {
        path: '/search',
        name: 'search',
        component: () => import('views/search/Search.vue'),
        meta: { needLogin: false }
      },
      {
        path: '/editprofile',
        name: 'editprofile',
        component: () => import('views/editprofile/EditProfile.vue'),
        meta: { needLogin: true }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('views/login/Login.vue'),
    meta: { needLogin: false }
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

// to和from都表示路由对象(route)，next()相当于放行闸，next(false)表示中断路由导航
// 单纯调用next()表示放行
router.beforeEach((to, from, next) => {
  // 结合导航守卫，在用户进行路由跳转之前，根据元素数meta，进行权限控制

  // 用户如果已经登录，直接通过验证
  if (store.state.token) {
    next()
  } else {
    // 如果用户没有进行登录，根据元数据进行权限控制

    // 如果需要登录权限，跳转到登录页面
    if (to.meta.needLogin) {
      Dialog.confirm({
        title: '消息提示',
        message: '该功能需要登录，确认登录吗？',
      })
        .then(() => {
          // 用户决定登录
          router.push({
            name: 'login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
        })
        .catch(() => {
          // 用户取消登录，则中断路由导航
          next(false)
        });
    } else {
      // 否则该功能不需要登录，直接直接放行
      next()
    }
  }

})

export default router
