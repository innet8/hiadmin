import type { LocaleType } from '../types/config'

// token key
export const TOKEN = 'hiadmin_token'.toUpperCase()
// 获取token
export function getToken(): string {
  return localStorage.getItem(TOKEN) || ''
}
// 设置token
export function setToken(data: string) {
  return localStorage.setItem(TOKEN, data)
}
// 删除token
export function delToken() {
  return localStorage.removeItem(TOKEN)
}
export function hasToken(): boolean {
  return !!localStorage.getItem(TOKEN)
}

// language key
export const LANGUAGE = 'hiadmin_language'.toUpperCase()
// 获取语言
export function getLanguage(): LocaleType {
  return localStorage.getItem(LANGUAGE) as LocaleType
}
// 设置语言
export function setLanguage(data: LocaleType) {
  return localStorage.setItem(LANGUAGE, data)
}
