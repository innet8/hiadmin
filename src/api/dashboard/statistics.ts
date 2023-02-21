import { $delete, $get, $post, $put } from '../request'

/**
 * 获取列表
 * @param params
 * @returns
 */
export function getStatistics(params: object) {
  return $get('/statistics', { params })
}

/**
 * 添加详情
 * @param data
 * @returns
 */
export function addStatistics(id: string | number, data: object) {
  return $post(`/statistics/${id}`, { data })
}

/**
 * 更新详情
 * @param data
 * @returns
 */
export function putStatistics(id: string | number, data: object) {
  return $put(`/statistics/${id}`, { data })
}

/**
 * 删除详情
 * @param data
 * @returns
 */
export function delStatistics(id: string | number) {
  return $delete(`/statistics/${id}`)
}
