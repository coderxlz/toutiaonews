import axios from 'axios'
//引入Vuex中的store对象
import store from '../store/index'
// 引入大数字处理工具
import jsonBig from 'json-bigint'
// 引入路由对象
import router from '../router/index'


import { Toast } from 'vant'

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

  // 使用响应拦截器拦截401错误，实现当用户登录过期时，自动通过refresh_token重新获取token令牌
  instance.interceptors.response.use(function (response) {
    // 响应成功，返回相应对象
    return response;
  }, function (error) {
    // 响应失败，对错误进行处理
    if (error && error.response && error.response.status) {
      switch (error.response.status) {
        case 401:
          Toast({
            message: "认证失败"
          })
          // 需要重新获取token数据

          // 如果没有token，让用户登录
          if (!store.state.token) {
            redirectLogin()
          }
          // 如果有refresh_token，则根据refresh_token发送新的请求获取token数据
          else if(store.state.refresh_token){
            refreshToken(store.state.refresh_token).then(res => {
              const { data } = res
              store.commit('saveNewToken',data.data.token)
              console.log('发生错误的请求config',error.config)
              // 重新使用instance发送请求，error.config中存储的是本次请求的config配置信息，包括请求路径，
              // 基本路径等等，使用instance发送请求会走自己的拦截器
              return instance(error.config)
            })
          }
          // 其他情况，全部重定向到登录页面要求用户登录
          else{
            redirectLogin()
          }
          break
        case 403:
          Toast({
            message: "权限不足"
          });
          break
        default:
          Toast({
            message: "服务器错误"
          });
          break
      }
    }
    return Promise.reject(error);
  })



  return instance(config)
}

function redirectLogin() {
  router.replace({
    name: 'login',
    query: {
      // 此处的routerrouter.currentRoute和我们在组件中获取的this.$route是同一个东西
      // 将当前页面url保存起来，便于用户登录后进行返回
      redirect: router.currentRoute.fullPath
    }
  })
}

// 刷新用户token数据
// 此处async函数返回的是promise对象，async函数返回一个 Promise 对象。
// async函数内部return语句返回的值，会成为then方法回调函数的参数。
async function refreshToken(refresh_token) {
  let getData = null
  const a = await new axios({
    url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${refresh_token}`
    }
  })
  console.log(a)
  return a
}