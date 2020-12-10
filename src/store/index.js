import Vue from 'vue'
import Vuex from 'vuex'

// 引入localStorage操作api
import { clean } from '../utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 为避免页面刷新造成用户令牌丢失，将令牌默认值设为localStorage中的值
    token: localStorage.getItem('token'),
    refresh_token: localStorage.getItem('refresh_token'),
    // 需要缓存的组件
    cacheComponents: ['Layout']
  },
  mutations: {
    // 存储token和refresh_token用户令牌
    saveToken(state,payload){
      state.token = payload.token
      state.refresh_token = payload.refresh_token
      // 用户令牌持久化
      localStorage.setItem('token',state.token)
      localStorage.setItem('refresh_token',state.refresh_token)
    },
    // 将根据refresh_token刷新得到的token数据存储到state中
    saveNewToken(state,payload){
      console.log(payload)
      state.token = payload
      localStorage.setItem('token',payload)
    }, 
    // 读取令牌
    readToken(state,payload){
      return state.payload
    },
    // 清空令牌
    // 当用户主动点击退出登录时调用
    // 同时清空state中以及localStorage中的token数据
    clearToken(state,payload) {
      clean()
      console.log('clearToken调用拉')
      state.token = null
      refresh_token = null
    },
    // 用户点击退出登录后，清除缓存，刷新页面数据，因为不同的用户个人资料的展示
    // 以及主页订阅频道的类型都是不同的，为避免用户浏览新闻时高度重新刷新，我们
    // 使用了keep-alive，当用户退出时，需要清除掉
    clearCache(state,payload) {
      // 清空需要缓存的组件
      state.cacheComponents = []
    },

    // 当用户登录后，再重新对页面进行缓存
    setCache(state,payload) {
      state.cacheComponents.push(payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
