import type { RouteRecordRaw } from 'vue-router'
import AppLayout from '@/components/AppLayout.vue'

export const adminRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/HomeView.vue'),
        meta: { title: '数据概览', icon: 'Home', menu: 'Home' }
      },
      {
        path: 'panel/users',
        name: 'Student',
        component: () => import('@/views/StudentView.vue'),
        meta: { title: '用户数据', icon: 'User', menu: 'Student' }
      },
      {
        path: 'panel/staff',
        name: 'Teacher',
        component: () => import('@/views/TeacherView.vue'),
        meta: { title: '人员档案', icon: 'User', menu: 'Teacher' }
      },
      {
        path: 'panel/courses',
        name: 'Course',
        component: () => import('@/views/CourseView.vue'),
        meta: { title: '课程资源', icon: 'BookOpen', menu: 'Course' }
      },
      {
        path: 'panel/grades',
        name: 'Score',
        component: () => import('@/views/ScoreView.vue'),
        meta: { title: '成绩分析', icon: 'BarChart3', menu: 'Score' }
      },
      {
        path: 'panel/enrollment',
        name: 'CourseSelect',
        component: () => import('@/views/CourseSelectView.vue'),
        meta: { title: '选课规划', icon: 'Plus', menu: 'CourseSelect' }
      },
      {
        path: 'panel/timetable',
        name: 'Schedule',
        component: () => import('@/views/ScheduleView.vue'),
        meta: { title: '课表编排', icon: 'CalendarDays', menu: 'Schedule' }
      },
      {
        path: 'panel/reviews',
        name: 'Evaluation',
        component: () => import('@/views/EvaluationView.vue'),
        meta: { title: '教学评价', icon: 'Star', menu: 'Evaluation' }
      },
      {
        path: 'panel/logs',
        name: 'OperationLog',
        component: () => import('@/views/OperationLogView.vue'),
        meta: { title: '操作记录', icon: 'FileText', menu: 'OperationLog' }
      },
      {
        path: 'system',
        name: 'About',
        component: () => import('@/views/AboutView.vue'),
        meta: { title: '系统信息', icon: 'Info', menu: 'About' }
      }
    ]
  }
]
