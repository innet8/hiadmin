import { $get } from '../request'

/**
 * 获取用户详情
 * @param params
 * @returns
 */
export function getInfo() {
  return $get('/info')
}
