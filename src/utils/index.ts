import type { LocaleType } from '../types/config'

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
export function getLanguage(): LocaleType {
  return localStorage.getItem(LANGUAGE) as LocaleType
}
// 设置语言
export function setLanguage(data: LocaleType) {
  return localStorage.setItem(LANGUAGE, data)
}
