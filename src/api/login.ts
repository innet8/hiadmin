import { $get, $post } from './request'

//
export type LoginType = {
  username: string
  password: string
}

/**
 *  登录
 * @param data
 * @returns
 */
export function login(data: LoginType) {
  return $post('/login', { data })
}

/**
 * 退出
 * @returns
 */
export function logout(params: object) {
  return $get('/logout', { params })
}
