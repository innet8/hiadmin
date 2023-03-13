import axios, { type AxiosRequestConfig, type InternalAxiosRequestConfig, type AxiosResponse, type AxiosError } from 'axios'

import { getLanguage, getToken } from '../utils'
import { RequestCodeEnum, ContentTypeEnum } from './../enums/requestEnums'
import { RequestResponseType, RequestConfigType } from '../types/requestTypes'

/**
 * // 实例化
 * const controller = new AbortController();
 * // 请求
 * axios.get('url', { signal: controller.signal }).then(function(response) {});
 * // 取消请求
 * controller.abort()
 */

// 创建一个axios实例
const request = axios.create({
  baseURL: '/api',
  timeout: 5000, // 请求超时时间 默认5秒
  headers: {
    'Content-Type': ContentTypeEnum.JSON
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
request.interceptors.request.use((config: InternalAxiosRequestConfig & RequestConfigType) => {
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
request.interceptors.response.use((response: AxiosResponse) => {
  // 所有参数
  const config: AxiosRequestConfig & RequestConfigType = response.config
  // 关闭loding
  if (config.isLoading !== false) {
  }
  // 数据处理
  const data: RequestResponseType = response.data
  // 全局错误提示
  if (data.code === RequestCodeEnum.FAILED && config.isMessageError !== false) {
    // Message.error(data.message || 'Error')
  }
  // 身份失效
  if (data.code === RequestCodeEnum.IDENTITY_FAILURE) {
    // Message.error(data.message || '身份失效')
  }
  // 没有权限
  if (data.code === RequestCodeEnum.NO_PERMISSION) {
    // Message.error(data.message || '没有权限')
  }
  //
  return response
}, handlerError)

// $get
export const $get = <T = any, D = any>(url: string, config?: AxiosRequestConfig<D> & RequestConfigType): Promise<RequestResponseType<T>> => {
  return new Promise((resolve, reject) => {
    request
      .get<RequestResponseType<T>>(url, config)
      .then((res) => resolve(res.data))
      .catch((error) => reject(error))
  })
}

// $post
export const $post = <T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D> & RequestConfigType): Promise<RequestResponseType<T>> => {
  return new Promise((resolve, reject) => {
    request
      .post<RequestResponseType<T>>(url, data, config)
      .then((res) => resolve(res.data))
      .catch((error) => reject(error))
  })
}

// $put
export const $put = <T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D> & RequestConfigType): Promise<RequestResponseType<T>> => {
  return new Promise((resolve, reject) => {
    request
      .put<RequestResponseType<T>>(url, data, config)
      .then((res) => resolve(res.data))
      .catch((error) => reject(error))
  })
}

// $delete
export const $delete = <T = any, D = any>(url: string, config?: AxiosRequestConfig<D> & RequestConfigType): Promise<RequestResponseType<T>> => {
  return new Promise((resolve, reject) => {
    request
      .delete<RequestResponseType<T>>(url, config)
      .then((res) => resolve(res.data))
      .catch((error) => reject(error))
  })
}

// 默认导出
export default request
