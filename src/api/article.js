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

export const deleteArticle = articleId =>{
    return request({
        method: 'DELETE',
        url: `/mp/v1_0/articles/${articleId}`
    })
}