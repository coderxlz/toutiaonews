import { request, tokenRequest } from './request'

// 获取新闻文章详情
export const getDetailNews = (article_id) => {
  return tokenRequest({
    url: `/app/v1_0/articles/${article_id}`,
    method: 'GET'
  })
}

// 关注作者
export const follow = (userId) => {
  return tokenRequest({
    url: '/app/v1_0/user/followings',
    method: 'POST',
    data:{
      target: Number(userId)
    }
  })
}
// 取消关注作者
export const deleteFollow = (userId) => {
  return tokenRequest({
    url: `/app/v1_0/user/followings/${userId}`,
    method: 'DELETE'
  })
}

// 收藏文章
export const starNews = (new_id) => {
  return tokenRequest({
    url: '/app/v1_0/article/collections',
    method: 'POST',
    data:{
      target: new_id
    }
  })
}

// 取消收藏文章
export const cancelStar = (new_id) => {
  return tokenRequest({
    url: `/app/v1_0/article/collections/${new_id}`,
    method: 'DELETE'
  })
}