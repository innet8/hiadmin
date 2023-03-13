// 返回数据结构
export interface RequestResponseType<T = any> {
  code?: number
  message?: string
  data?: T
}

// 配置扩展
export interface RequestConfigType {
  isLoading?: boolean // 是否开启加载
  isMessageError?: boolean // 是否开启错误提示弹窗
}
