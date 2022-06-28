import axios from 'axios'
import store from '@/store'
import { Message, MessageBox } from 'element-ui'
import { projectBaseUrl } from '@/utils/global'
import Cookies from "js-cookie"
import router from '@/router'
// import { getToken } from '@/utils/auth'

const service = axios.create({
  // baseURL: process.env.BASE_API,
  baseURL: projectBaseUrl,
  timeout: 15000,
  // withCredentials: true // 允许携带cookie
  // 前端设置跨域，解决问题：The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'. The credentials mode of requests initiated by the XMLHttpRequest is controlled by the withCredentials attribute.
  withCredentials: false 
})

service.interceptors.request.use(config => {
  let token = Cookies.get('token')
  if (token) {
    config.headers.token = token
  }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

service.interceptors.response.use(response => {
  if (response.status === 200) {
    return response.data
  }
  const res = response.data
  if (res.status !== 200) {
    // 401:多ip登录 , 402 多IP登陆, 403 token验证失败
    if (res.status === 401 || res.status === 402 || res.status === 403) {
      // Cookies.remove('token')
      // router.push('/login')
      // MessageBox.confirm(res.message, '确定登出', {
      //   confirmButtonText: '重新登录',
      //   cancelButtonText: '取消',
      //   type: 'warning',
      //   center: true
      // }).then(() => {
      //   // store.dispatch('FedLogout').then(() => {
      //   //   location.reload() // 为了重新实例化vue-router对象 避免bug
      //   // })
      // })
    } else {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(new Error('error'))
  } else {
    return response.data
  }
}, error => {
  // Cookies.remove('token')
  // router.push('/login')  
  console.log('err' + error)// for debug
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
})

export default service
