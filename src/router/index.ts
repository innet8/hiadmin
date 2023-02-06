import { type App } from 'vue'
import { hasToken } from '../utils'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '../layouts/default.vue'

// 定义路由数据
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/admin'
  },
  {
    path: '/login',
    component: () => import('../pages/login/index.vue'),
    meta: {
      title: '登录',
      hasWhite: true // 是否为白名单 为true时不需要登录
    }
  },
  {
    path: '/register',
    component: () => import('../pages/register/index.vue'),
    meta: {
      title: '免费注册',
      hasWhite: true // 是否为白名单 为true时不需要登录
    }
  },
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/dashboard',
    children: [
      {
        path: 'dashboard', // 默认
        component: () => import('../pages/dashboard/index.vue'),
        meta: {
          title: '仪表盘'
        }
      },
      {
        path: 'settings',
        component: () => import('../pages/settings/index.vue'),
        meta: {
          title: '系统设置'
        }
      }
    ]
  },
  {
    path: '/500',
    component: () => import('../layouts/500.vue'),
    meta: {
      title: '服务器报错',
      hasWhite: true // 是否为白名单 为true时不需要登录
    }
  },
  {
    path: '/403',
    component: () => import('../layouts/403.vue'),
    meta: {
      title: '暂无权限',
      hasWhite: true // 是否为白名单 为true时不需要登录
    }
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../layouts/404.vue'),
    meta: {
      title: '页面不存在',
      hasWhite: true // 是否为白名单 为true时不需要登录
    }
  }
]

// 实例化路由
const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 打开进度条
  // NProgress.start()
  // 设置title
  if (to?.meta?.title) document.title = to.meta.title as string
  // 已经有token存在本地
  if (hasToken()) {
    // 如果已经登录，不可进入登录、注册页面
    if (['/login', '/register'].includes(to.path)) return next('/admin')
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
router.afterEach(() => {
  // 关闭进度条
  // NProgress.done()
})

export async function setupRouter(app: App) {
  app.use(router);
  // 路由准备就绪后挂载APP实例
  await router.isReady();
}

export default router;