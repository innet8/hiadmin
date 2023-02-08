import { type App } from 'vue'
import { hasToken } from '../utils'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

// 实例化路由
const history = createWebHistory()
const router = createRouter({ history, routes })

// 路由守卫
router.beforeEach((to, from, next) => {
  // 打开进度条
  // NProgress.start()
  // 设置title
  if (to?.meta?.title) document.title = to.meta.title as string
  // 已经有token存在本地
  if (hasToken()) {
    // 如果已经登录，不可进入登录、注册页面
    if (['/login', '/register'].includes(to.path)) return next(to.query.redirect?.toString() ?? '/')
    // 如果没有权限，则进入403
    // if (!hasPermission()) return next('/403')
    // 显示页面
    return next()
  }
  // 根据白名单的登录状态进行鉴权
  if (to?.meta?.hasWhite) return next()
  // 跳转登录
  return next('/login')
})
// 路由守卫
router.afterEach((to, from) => {
  // 关闭进度条
  // NProgress.done()
})
// 路由跳转错误
router.onError((error) => {
  // Message.error(error.message)
  // NProgress.error()
})

export async function setupRouter(app: App) {
  app.use(router)
  // 路由准备就绪后挂载APP实例
  await router.isReady()
}

export default router
