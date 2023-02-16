import axios, { type InternalAxiosRequestConfig, type AxiosResponse, type AxiosError } from 'axios'
import { getLanguage, getToken } from '../utils'

// 返回数据结构
export type Response<T = any> = {
  code: number
  message: string
  data?: T
}

// 状态枚举
export enum CODE {
  SUCCESS = 1, // 成功状态码
  ERROR = 0, // 失败状态码
  NO_ID = -1, // 身份失效
  NO_PERMISSION = -2 // 没有权限
}

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

/**
 * @desc: 异常拦截处理器
 * @param { Object } error 错误信息
 */
const handlerError = (error: AxiosError): AxiosError | Promise<AxiosError> => {
  // Message.error(error.message)
  return Promise.reject(error)
}

/**
 * @desc: 请求发送前拦截
 * @param { Object } config 配置参数
 */
request.interceptors.request.use((config: Config): Config => {
  // 设置token
  if (getToken()) config.headers['Authorization'] = `Bearer ${getToken()}`
  // 设置语言
  if (getLanguage()) config.headers['Accept-Language'] = getLanguage()
  // 默认开启loding
  if (config.isLoading !== false) {
  }
  // 捕获400、500
  config.validateStatus = (status) => {
    if (status >= 400) {
      // Message.error(`E${status} - 服务器繁忙，请稍候再试！`)
    }
    return status >= 200 && status < 500
  }
  //
  return config
}, handlerError)

/**
 * @desc: 服务端响应后拦截
 * @param { Object } response 返回的数据
 */
request.interceptors.response.use((response: AxiosResponse): AxiosResponse | Promise<AxiosResponse> => {
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
}, handlerError)

// 导出常用方法
export const $get = request.get
export const $post = request.post
export const $put = request.put
export const $delete = request.delete

// 默认导出
export default request
