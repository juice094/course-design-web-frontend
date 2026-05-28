import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { portalRoutes } from './portal'
import { adminRoutes } from './admin'

const loginRoute: RouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/LoginView.vue'),
  meta: { public: true, title: '登录' }
}

const routes: RouteRecordRaw[] = [
  loginRoute,
  ...portalRoutes,
  ...adminRoutes,
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to) => {
  const userStore = useUserStore()

  // 设置页面标题
  document.title = `${String(to.meta.title || '页面')} — 教务可视化系统`

  // 公开页面直接放行
  if (to.meta.public) {
    return true
  }

  // 未登录用户访问首页重定向到门户页，其余后台路由跳登录页
  if (!userStore.isLoggedIn) {
    return to.path === '/' ? '/portal' : '/login'
  }

  // 检查菜单权限
  const menuCode = to.meta.menu as string
  if (menuCode && !userStore.checkMenu(menuCode)) {
    return '/'
  }

  return true
})

export { router }
export default router
