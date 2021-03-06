import request from "@/utils/request.js";

export const login = data =>{
    return request({
        method: "POST",
        url: "/mp/v1_0/authorizations",
        // data 用来设置 POST 请求体
        data
      })
}

export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile'
    // 后端要求把需要授权的用户身份放到请求头中
    // axios 可以通过 headers 选项设置请求头
    // headers: {
    //   // 属性名和值都得看接口的要求
    //   // 属性名：Authorization，接口要求的
    //   // 属性值：Bearer空格token数据
    //   // Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MzQyNTgwMDMsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.fqhYkug5TjJ6kSKgiWEJDWskw24tOlBtHSWa7elpL7Q'
    //   Authorization: `Bearer ${user.token}`
    // }
  })
}
// 编辑用户资料
export const editUser = (data) =>{
  return request({
    url: '/mp/v1_0/user/profile',
    method: 'PATCH',
    data
  })
}