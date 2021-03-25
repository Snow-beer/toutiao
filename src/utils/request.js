import axios from 'axios'
import JSONbig from 'json-bigint'
import router from '@/router'

const request = axios.create({
    baseURL: 'http://112.74.99.5:3000',  // 请求的基础路径
    transformResponse: [function (data){
      try {
        // 如果转换成功，则直接把结果返回
        return JSONbig.parse(data)
      } catch (err) {
        console.log('转换失败', err)
        // 如果转换失败了，则进入这里
        // 我们在这里把数据原封不动的直接返回给请求使用
        return data
      }
    }]

})

request.interceptors.request.use(function (config) {
    const user = JSON.parse(window.localStorage.getItem('user'))
    if(user){
        config.headers.Authorization = `Bearer ${user.token}`
    }
    return config;
  }, function (error) {
    
    return Promise.reject(error);
  });
  // 添加响应拦截器
  request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  if(error.response && error.response.status === 401){
    window.localStorage.removeItem('user')
    router.push('/login')
  }
  return Promise.reject(error);
});

export default request
