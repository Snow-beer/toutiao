import request from '@/utils/request.js'


// 获取用户图片
export const getImage = (params) =>{
    return request({
        url: '/mp/v1_0/user/images',
        method: 'GET',
        params,

    })
}