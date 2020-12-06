// 封装搜索页面所有搜索请求

import { tokenRequest } from './request'

// 获取联想建议
export const getSearchRec = function(data) {
  return tokenRequest({
    url: '/app/v1_0/suggestion',
    method: 'GET',
    params: {
      q:data
    }
  })
}

// 获取搜索结果
export const getSearchResult = (params) => {
  return tokenRequest({
    url: '/app/v1_0/search',
    method: 'GET',
    params
  })
}

// 请求搜索历史记录数据
export const getSearchHistory = () => {
  return tokenRequest({
    url: '/app/v1_0/search/histories',
    method: 'GET'
  })
}