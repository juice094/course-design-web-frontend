import type { RouteRecordRaw } from 'vue-router'

export const portalRoutes: RouteRecordRaw[] = [
  {
    path: '/portal',
    component: () => import('@/layouts/PortalLayout.vue'),
    meta: { public: true, title: '个人主页' },
    children: [
      { path: '', name: 'PortalHome', component: () => import('@/views/portal/HomeView.vue'), meta: { title: '首页' } },
      { path: 'academic', name: 'PortalAcademic', component: () => import('@/views/portal/AcademicView.vue'), meta: { title: '学业中心' } },
      { path: 'works', name: 'PortalWorks', component: () => import('@/views/portal/WorksView.vue'), meta: { title: '作品集' } },
      { path: 'space', name: 'PortalSpace', component: () => import('@/views/portal/SpaceView.vue'), meta: { title: '个人空间' } },
      { path: 'about', name: 'PortalAbout', component: () => import('@/views/portal/AboutView.vue'), meta: { title: '关于' } },
    ]
  }
]
