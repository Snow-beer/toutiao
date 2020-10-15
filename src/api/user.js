import request from "@/utils/request.js";

export const login = data =>{
    return request({
        method: "POST",
        url: "/mp/v1_0/authorizations",
        // data 用来设置 POST 请求体
        data
      })
}

// export const gerUserProfile = () =>{
//   return request({
//     method: 'GET',
//     url: '/mp/v1_0/user/profile',
//     header: {
//       Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MzQyMDU5NjMsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.friyTPWU4EVhmg1yk9yQR4uSxFpO1uN1aTqNIn54t7I'
//     }
    
//   })
// }
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile',
    // 后端要求把需要授权的用户身份放到请求头中
    // axios 可以通过 headers 选项设置请求头
    headers: {
      // 属性名和值都得看接口的要求
      // 属性名：Authorization，接口要求的
      // 属性值：Bearer空格token数据
      Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTg5MDkxMjYsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.EdKErKDqMc3snkYxqt02jSa8t9G44002yWKY3CMOMJg'
    }
  })
}