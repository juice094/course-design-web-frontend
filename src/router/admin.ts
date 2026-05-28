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
        meta: { title: '首页概览', icon: 'Home', menu: 'Home' }
      },
      {
        path: 'student',
        name: 'Student',
        component: () => import('@/views/StudentView.vue'),
        meta: { title: '学生管理', icon: 'User', menu: 'Student' }
      },
      {
        path: 'teacher',
        name: 'Teacher',
        component: () => import('@/views/TeacherView.vue'),
        meta: { title: '教师管理', icon: 'User', menu: 'Teacher' }
      },
      {
        path: 'course',
        name: 'Course',
        component: () => import('@/views/CourseView.vue'),
        meta: { title: '课程管理', icon: 'BookOpen', menu: 'Course' }
      },
      {
        path: 'score',
        name: 'Score',
        component: () => import('@/views/ScoreView.vue'),
        meta: { title: '成绩管理', icon: 'BarChart3', menu: 'Score' }
      },
      {
        path: 'course-select',
        name: 'CourseSelect',
        component: () => import('@/views/CourseSelectView.vue'),
        meta: { title: '学生选课', icon: 'Plus', menu: 'CourseSelect' }
      },
      {
        path: 'schedule',
        name: 'Schedule',
        component: () => import('@/views/ScheduleView.vue'),
        meta: { title: '排课管理', icon: 'CalendarDays', menu: 'Schedule' }
      },
      {
        path: 'evaluation',
        name: 'Evaluation',
        component: () => import('@/views/EvaluationView.vue'),
        meta: { title: '评教结果', icon: 'Star', menu: 'Evaluation' }
      },
      {
        path: 'operation-log',
        name: 'OperationLog',
        component: () => import('@/views/OperationLogView.vue'),
        meta: { title: '操作日志', icon: 'FileText', menu: 'OperationLog' }
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/AboutView.vue'),
        meta: { title: '关于系统', icon: 'Info', menu: 'About' }
      }
    ]
  }
]
