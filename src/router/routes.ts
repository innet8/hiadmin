import { RouteRecordRaw } from 'vue-router'
import Layout from '../layouts/default.vue'

// 定义路由数据
const routes: RouteRecordRaw[] = [
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
      title: '500 服务器报错',
      hasWhite: true // 是否为白名单 为true时不需要登录
    }
  },
  {
    path: '/403',
    component: () => import('../layouts/403.vue'),
    meta: {
      title: '403 暂无权限',
      hasWhite: true // 是否为白名单 为true时不需要登录
    }
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../layouts/404.vue'),
    meta: {
      title: '404 页面不存在',
      hasWhite: true // 是否为白名单 为true时不需要登录
    }
  }
]

export default routes