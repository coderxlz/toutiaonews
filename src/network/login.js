import { request } from './request'

//用于验证验证码是否有效
export const ifPass = data => {
  return request({
    url: 'app/v1_0/authorizations',
    method: 'POST',
    data: data
  })
}

//用于请求发送验证码
export const getCode = mobile => {
  return request({
    url: `/app/v1_0/sms/codes/:${mobile}`,
    method: 'GET'
  })
}
