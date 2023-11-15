import { baseUrl } from './env'

import axios from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
  // process.env.NDDE_ENV === 'development' 来判断是否开发环境
  // easy-mock服务器挂了,暂时不使用了
  baseURL: baseUrl,
  timeout: 5000
});

// 添加请求拦截器
service.interceptors.request.use(
  // 在发送请求之前做什么
  config => {
    return config;
  },
  // 对请求错误做什么
  error => {
    console.log(error);
    return Promise.reject(error);
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  // 对响应数据做什么
  response => {
    if (response.status === 200) {
      return response.data;
    } else {
      Promise.reject();
    }
  },

  // 对响应错误做什么
  error => {
    // console.log(error);
    // return Promise.reject(error);
    const { response } = error
    if (response) {
      const status = response.status
      switch (status) {
        case 404:
          ElMessage.error('资源不存在 404')
          break;
        case 403:
          ElMessage.error('拒绝访问 403')
          break;
        case 401:
          ElMessage.error('身份凭证确实 401')
          break;
        case 500:
          ElMessage.error('服务器错误 500')
          break;
        default:
          ElMessage.error('出现意想不到的错误')
          break;
      }
    } else {
      // 服务器崩溃问题或是网络问题
      if (!window.navigator.onLine) {
        ElMessage.error('当前网络不可用,请检查你的网络连接')
        return
      } else {
        ElMessage.error('连接服务器错误' + error?.message)
        return Promise.reject(error)
      }
    }
    return Promise.reject(error)
  }
)

export default service;