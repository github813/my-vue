
/**
 * http配置
 */
// 引入axios以及element ui中的loading和message组件
import axios from 'axios'
import { Loading, Message } from 'element-ui'
// 超时时间
axios.defaults.timeout = 5000
// http请求拦截器
var loadinginstace
axios.interceptors.request.use(config => {
  // element ui Loading方法
  loadinginstace = Loading.service({ fullscreen: true })
  return config
}, error => {
  loadinginstace.close()
  Message.error({
    message: '加载超时'
  })
  return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(data => {// 响应成功关闭loading
  loadinginstace.close()
  return data
}, error => {
  loadinginstace.close()
  Message.error({
    message: '加载失败'
  })
  return Promise.reject(error)
})



let base='https://api.clxkj.cn:8088';
function getheader() {
  let user=JSON.parse(sessionStorage.getItem("userinfo"));
  if(user){
    axios.defaults.headers.userId=user.userId;
    axios.defaults.headers.accessToken=user.accessToken;
  }
}

export const POST = (url, params) => {
  getheader()
  return axios.post(`${base}${url}`, params).then(res => res.data)
}

export const GET = (url, params) => {
  getheader()
  return axios.get(`${base}${url}`, {params: params}).then(res => res.data)
}
export const PUT = (url, params) => {
  getheader()
  return axios.put(`${base}${url}`, params).then(res => res.data)
}

export const DELETE = (url, params) => {
  getheader()
  return axios.delete(`${base}${url}`, {params: params}).then(res => res.data)
}

export const PATCH = (url, params) => {
  getheader()
  return axios.patch(`${base}${url}`, params).then(res => res.data)
}
