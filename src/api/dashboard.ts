import { $delete, $get, $post, $put } from './request'

/**
 * 获取列表
 * @param params
 * @returns
 */
export function getDashboard(params: object) {
  return $get('/dashboard', { params })
}

/**
 * 添加详情
 * @param data
 * @returns
 */
export function addDashboard(id: string | number, data: object) {
  return $post(`/dashboard/${id}`, { data })
}

/**
 * 更新详情
 * @param data
 * @returns
 */
export function putDashboard(id: string | number, data: object) {
  return $put(`/dashboard/${id}`, { data })
}

/**
 * 删除详情
 * @param data
 * @returns
 */
export function delDashboard(id: string | number) {
  return $delete(`/dashboard/${id}`)
}
