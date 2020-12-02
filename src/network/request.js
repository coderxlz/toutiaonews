import axios from 'axios'

export const request = function (config) {
  const instance = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn',
    timeout: 5000
  })

  return instance(config)
}
