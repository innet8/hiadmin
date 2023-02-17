import { $delete, $get, $post, $put } from './request'

/**
 * 获取列表
 * @param params
 * @returns
 */
export function dashboardList(params: object) {
  return $get('/dashboard/list', { params })
}

/**
 * 添加详情
 * @param data
 * @returns
 */
export function dashboardAdd(id: string | number, data: object) {
  return $post(`/dashboard/add/${id}`, { data })
}

/**
 * 更新详情
 * @param data
 * @returns
 */
export function dashboardPut(id: string | number, data: object) {
  return $put(`/dashboard/put/${id}`, { data })
}

/**
 * 删除详情
 * @param data
 * @returns
 */
export function dashboardDel(id: string | number) {
  return $delete(`/dashboard/del/${id}`)
}
