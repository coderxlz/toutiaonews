import Vue from 'vue'
import Vuex from 'vuex'

// 引入localStorage操作api
import { clean } from '../utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 为避免页面刷新造成用户令牌丢失，将令牌默认值设为localStorage中的值
    token: localStorage.getItem('token'),
    refresh_token: localStorage.getItem('refresh_token')
  },
  mutations: {
    // 存储token和refresh_token用户令牌
    saveToken(state,payload){
      console.log(payload)
      state.token = payload.token
      state.refresh_token = payload.refresh_token
      // 用户令牌持久化
      localStorage.setItem('token',state.token)
      localStorage.setItem('refresh_token',state.refresh_token)
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
    }
  },
  actions: {
  },
  modules: {
  }
})
