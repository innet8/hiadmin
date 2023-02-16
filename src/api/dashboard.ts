import { $delete, $get, $post, $put } from './request'

/**
 * 获取列表
 */
export function getDashboardList(params: object) {
  return $get('/dashboard_list', { params })
}

/**
 * 添加详情
 */
export function addDashboardDetail(data: object) {
  return $post('/dashboard_detail', { data })
}

/**
 * 更新详情
 */
export function putDashboardDetail(data: object) {
  return $put('/dashboard_detail', { data })
}

/**
 * 删除详情
 */
export function delDashboardDetail(data: { id: string | number }) {
  return $delete(`/dashboard_detail/${data.id}`)
}
