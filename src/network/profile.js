import { tokenRequest } from './request'

//请求用户资料
export const getUserDetail = function() {
  return tokenRequest({
    url: '/app/v1_0/user',
    method: 'GET'
  })
}

// 获取用户个人资料
export const getProfile = () => {
  return tokenRequest({
    url: '/app/v1_0/user/profile',
    method: 'GET'
  })
}

// 编辑用户资料
export const setProfile = (data) => {
  return tokenRequest({
    url: '/app/v1_0/user/profile',
    method: 'PATCH',
    data
  })
}

// 上传更改用户头像
export const updateAvatar = (data) => {
  return tokenRequest({
    url: '/app/v1_0/user/photo',
    method: 'PATCH',
    data
  })
}