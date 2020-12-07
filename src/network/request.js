import axios from 'axios'
//引入Vuex中的store对象
import store from '../store/index'
// 引入大数字处理工具
import jsonBig from 'json-bigint'

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
    timeout: 5000,
    // 自定义处理原始后端返回的数据，避免数据过大超过js极限而造成精度丢失
    // axios提供了自定义处理后端返回数据的api，transformResponse
    transformResponse: [function (data) {
      try {
        // 如果转换成功则返回转换的数据结果
        return jsonBig.parse(data)
      } catch (err) {
        // 如果转换失败，则包装为统一数据格式并返回
        return {
          data
        }
      }
    }]
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