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
export const starNews = (art_id) => {
  return tokenRequest({
    url: '/app/v1_0/article/collections',
    method: 'POST',
    data:{
      target: art_id
    }
  })
}

// 取消收藏文章
export const cancelStar = (art_id) => {
  return tokenRequest({
    url: `/app/v1_0/article/collections/${art_id}`,
    method: 'DELETE'
  })
}

// 对文章点赞
export const likeNew = (art_id) => {
  return tokenRequest({
    url: '/app/v1_0/article/likings',
    method: 'POST',
    data: {
      target: art_id
    }
  })
}

// 取消对文章点赞
export const likeCancel = (art_id) => {
  return tokenRequest({
    url: `/app/v1_0/article/likings/${art_id}`,
    method: 'DELETE'
  })
}
