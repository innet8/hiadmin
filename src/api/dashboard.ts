import { $delete, $get, $post, $put } from './request'

/**
 * 获取列表
 * @param params
 * @returns
 */
export function getDashboardList(params: object) {
  return $get('/dashboard_list', { params })
}

/**
 * 添加详情
 * @param data
 * @returns
 */
export function addDashboardDetail(data: object) {
  return $post('/dashboard_detail', { data })
}

/**
 * 更新详情
 * @param data
 * @returns
 */
export function putDashboardDetail(data: object) {
  return $put('/dashboard_detail', { data })
}

/**
 * 删除详情
 * @param data
 * @returns
 */
export function delDashboardDetail(id: string | number) {
  return $delete(`/dashboard_detail/${id}`)
}
