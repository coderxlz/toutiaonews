// 封装home主页中的所有网络请求
import { request, tokenRequest } from './request'

// 获得用户频道列表
export const getUserChanel = () => {
  return tokenRequest({
    url: '/app/v1_0/user/channels',
    method: 'GET'
  })
  }

// 获取新闻推荐数据
// 要求必须传入查询params参数
export const getNews = (params) => {
  return tokenRequest({
    url: '/app/v1_1/articles',
    method: 'GET',
    params
  })
}

// 获取所有频道
export const getAllChannels = () => {
  return request({
    url: '/app/v1_0/channels',
    method: 'GET'
  })
}

// 提交用户添加频道数据到线上
// channels为用户关注的频道列表
export const commitChannels = (channels) => {
  return tokenRequest({
    url: '/app/v1_0/user/channels',
    method: 'PATCH',
    data:channels
  })
}

// 用户删除频道数据同步
export const deleteChannel = (id) => {
  return tokenRequest({
    url: `/app/v1_0/user/channels/${id}`,
    method: 'DELETE'
  })
}
