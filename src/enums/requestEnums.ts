// 请求体类型
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data   上传资源（图片，视频）
  FORM_DATA = 'multipart/form-data;charset=UTF-8'
}

// 状态码
export enum RequestCodeEnum {
  SUCCESS = 1, // 成功
  FAILED = 0, // 失败
  IDENTITY_FAILURE = -1, // 身份失效
  NO_PERMISSION = -2 // 没有权限
}
