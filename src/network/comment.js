import { request,tokenRequest } from './request'

// 获取文章评论或评论回复
export const getComments = (params) => {
  return request({
    url: '/app/v1_0/comments',
    method: 'GET',
    params
  })
}

// 对评论或者评论回复点赞
export const likeComment = (com_id) => {
  return tokenRequest({
    url: '/app/v1_0/comment/likings',
    method: 'POST',
    data: {
      target: com_id
    }
  })
}

// 对评论或者评论回复取消点赞
export const cancelLikeComment = (com_id) => {
  return tokenRequest({
    url: `/app/v1_0/comment/likings/${com_id}`,
    method: 'DELETE'
  })
}

// 添加评论或评论回复
export const addComment = (data) => {
  return tokenRequest({
    url: '/app/v1_0/comments',
    method: 'POST',
    data
  })
}