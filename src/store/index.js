import Vue from 'vue'
import Vuex from 'vuex'

//引入localStorage操作api
import { saveData, readData } from '../utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 为避免页面刷新造成用户令牌丢失，将令牌默认值设为localStorage中的值
    token: readData('token'),
    refresh_token: readData('refresh_token')
  },
  mutations: {
    //存储token和refresh_token用户令牌
    saveToken(state,payload){
      console.log(payload)
      state.token = payload.token
      state.refresh_token = payload.refresh_token
      //用户令牌持久化
      saveData('token',state.token)
      saveData('refresh_token',state.refresh_token)
    },
    //读取令牌
    readToken(state,payload){
      return state.payload
    }
  },
  actions: {
  },
  modules: {
  }
})
