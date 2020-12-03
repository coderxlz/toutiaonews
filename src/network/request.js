import axios from 'axios'
//引入Vuex中的store对象
import store from '../store/index'

//不带token的普通请求
export const request = function (config) {
  const instance = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn',
    timeout: 5000
  })

  return instance(config)
}

//带token的用户认证请求
export const tokenRequest = function (config) {
  const instance = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn',
    timeout: 5000
  })

  // 使用拦截器拦截请求参数config
  instance.interceptors.request.use(config => {
    // 在请求参数中设置headers，加上用户token
    if (store.state.token) {
      config.headers.Authorization = `Bearer ${store.state.token}`
    }
    // 返回拦截到的config
    return config
  })

  return instance(config)
}