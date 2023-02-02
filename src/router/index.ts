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
      isWhite: true // 是否为白名单 为true时不需要登录
    }
  },
  {
    path: '/register',
    component: () => import('../pages/register/index.vue'),
    meta: {
      title: '免费注册',
      isWhite: true // 是否为白名单 为true时不需要登录
    }
  },
  {
    path: '/admin',
    component: Layout,
    children: [
      {
        path: 'dashboard', // 默认跳转不用写路径
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
    path: '/:pathMatch(.*)*',
    component: () => import('../layouts/404.vue'),
    meta: {
      title: '404',
      isWhite: true // 是否为白名单 为true时不需要登录
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
  // NProgress.start(); // start progress bar
  // 设置title
  if (to?.meta?.title) document.title = `${to.meta.title}`
  // 根据白名单的登录状态进行鉴权
  if (to?.meta?.isWhite) return next()
  // 已经有token存在本地
  const token = localStorage.getItem('token')
  if (token) {
    // 如果没有权限，则进入403
    // if (!isPermiss()) return next('/403')
    //
    return next()
  }
  // 跳转登录
  return next('/login')
})
router.afterEach(() => {
  // NProgress.done(); // finish progress bar
})

export default router
