import type { LocaleType } from '../types/config'

// 格式化时间
export function getTime(timestamp: string): string {
  var date = new Date(timestamp)
  let Y = date.getFullYear(),
    M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
    D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
    h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
    m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
    s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s
}

//
export const TOKEN = `${import.meta.env.APP_NAME}_token`.toUpperCase()
// 获取token
export function getToken() {
  return localStorage.getItem(TOKEN)
}
// 设置token
export function setToken(data: string) {
  return localStorage.setItem(TOKEN, data)
}

//
export const LANGUAGE = `${import.meta.env.APP_NAME}_language`.toUpperCase()
// 获取语言
export function getLanguage() {
  return localStorage.getItem(LANGUAGE)
}
// 设置语言
export function setLanguage(data: LocaleType) {
  return localStorage.setItem(LANGUAGE, data)
}
