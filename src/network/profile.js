import { tokenRequest } from './request'

//请求用户资料
export const getUserDetail = function() {
  return tokenRequest({
    url: '/app/v1_0/user',
    method: 'GET'
  })
}