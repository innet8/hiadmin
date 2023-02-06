import axios, { type InternalAxiosRequestConfig, type AxiosResponse } from 'axios'
import { getLanguage, getToken } from '../utils'

// 返回数据结构
// interface ResponseData<T = any> {
//   code?: number
//   data?: T
//   message?: string
// }
//
interface Config extends InternalAxiosRequestConfig {
  isLoading?: boolean // 是否开启加载
  isMessageError?: boolean // 是否开启错误提示弹窗
}

// 创建一个axios实例
const request = axios.create({
  baseURL: '/api',
  timeout: 5000, // 请求超时时间 默认5秒
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
request.interceptors.request.use(
  (config: Config) => {
    // 设置token
    if (getToken()) config.headers['Authorization'] = `Bearer ${getToken()}`
    // 设置语言
    if (getLanguage()) config.headers['Accept-Language'] = getLanguage()
    // 默认开启loding
    if (config.isLoading !== false) {
    }
    // 捕获400、500
    config.validateStatus = (status) => {
      if (status >= 500) {
        // Message.error('E' + status + ' - 服务器繁忙，请稍候再试！')
      }
      return status >= 200 && status < 500
    }
    //
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    // 所有参数
    const config: Config = response.config
    // 关闭loding
    if (config.isLoading !== false) {
    }
    // 数据处理
    const data = response.data
    // 全局错误提示
    if (data.code === CODE.ERROR && config.isMessageError !== false) {
      // Message.error(data.message || 'Error')
    }
    // 身份失效
    if (data.code === CODE.NO_ID) {
      // Message.error(data.message || '身份失效')
    }
    // 没有权限
    if (data.code === CODE.NO_PERMISSION) {
      // Message.error(data.message || '没有权限')
    }
    //
    return data
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 状态枚举
export enum CODE {
  SUCCESS = 1, // 成功状态码
  ERROR = 0, // 失败状态码
  NO_ID = -1, // 身份失效
  NO_PERMISSION = -2 // 没有权限
}

// 导出常用方法
export const $get = request.get
export const $post = request.post
export const $put = request.put
export const $delete = request.delete

// 默认导出
export default request
