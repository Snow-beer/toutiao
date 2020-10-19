import request from '@/utils/request.js'

export const getArticle = params =>{
    return request({
        method: 'GET',
        url: '/mp/v1_0/articles',
        params
    })
}

export const getArticlechannel = () =>{
    return request({
        method: 'GET',
        url: '/mp/v1_0/channels'
    })
}
// 删除文章
export const deleteArticle = articleId =>{
    return request({
        method: 'DELETE',
        url: `/mp/v1_0/articles/${articleId}`
    })
}
//新建文章
export const addArticle = (data, draft = false) => {
    return request({
      method: 'POST',
      url: '/mp/v1_0/articles',
      params: {
        draft // 是否存为草稿（true 为草稿）
      },
      data
    })
  }

//   获取指定文章
export const getArticles = (articleId) =>{
    return request({
        method: 'GET',
        url: `/mp/v1_0/articles/${articleId}`
    })
}
//编辑文章
export const updataArticle = ( articleId, data,  draft = false) =>{
    return request({
        url: `/mp/v1_0/articles/${articleId}`,
        method: 'PUT',
        params: {
            draft
        },
        data
    })
}