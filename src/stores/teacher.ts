import { defineStore } from 'pinia'
import { ref, readonly } from 'vue'
import type { Teacher } from '@/types/teacher'
import { createPersistPlugin } from '@/shared/persist/plugin'

const PERSIST_KEY = 'teachers'

const mockTeachers: Teacher[] = [
  { id: 1, teacherNo: 'T2021001', name: '王教授', gender: '男', age: 45, title: '教授', collegeId: 1, collegeName: '信息工程学院', phone: '13800138001', email: 'wang@edu.cn', courses: ['计算机导论', '数据结构'] },
  { id: 2, teacherNo: 'T2021002', name: '李副教授', gender: '女', age: 38, title: '副教授', collegeId: 1, collegeName: '信息工程学院', phone: '13800138002', email: 'li@edu.cn', courses: ['操作系统', '计算机网络'] },
  { id: 3, teacherNo: 'T2021003', name: '张老师', gender: '男', age: 32, title: '讲师', collegeId: 2, collegeName: '经济管理学院', phone: '13800138003', email: 'zhang@edu.cn', courses: ['经济学原理'] },
  { id: 4, teacherNo: 'T2021004', name: '刘老师', gender: '女', age: 29, title: '讲师', collegeId: 3, collegeName: '机械工程学院', phone: '13800138004', email: 'liu@edu.cn', courses: ['机械设计基础'] },
  { id: 5, teacherNo: 'T2021005', name: '陈老师', gender: '男', age: 50, title: '教授', collegeId: 1, collegeName: '信息工程学院', phone: '13800138005', email: 'chen@edu.cn', courses: ['软件工程', '数据库系统'] }
]

const persistPlugin = createPersistPlugin<Teacher[]>({
  key: PERSIST_KEY,
  fallback: () => mockTeachers,
})

export const useTeacherStore = defineStore('teacher', () => {
  const _teachers = ref<Teacher[]>([])
  const teachers = readonly(_teachers)

  function loadTeachers() {
    if (_teachers.value.length === 0) {
      _teachers.value = persistPlugin.load()
    }
  }

  function addTeacher(t: Teacher) {
    _teachers.value.push(t)
    persistPlugin.save(_teachers.value)
  }

  function updateTeacher(t: Teacher) {
    const idx = _teachers.value.findIndex((item) => item.id === t.id)
    if (idx !== -1) {
      _teachers.value[idx] = t
      persistPlugin.save(_teachers.value)
    }
  }

  function deleteTeacher(id: number) {
    const idx = _teachers.value.findIndex((item) => item.id === id)
    if (idx !== -1) {
      _teachers.value.splice(idx, 1)
      persistPlugin.save(_teachers.value)
    }
  }

  return {
    teachers,
    loadTeachers,
    addTeacher,
    updateTeacher,
    deleteTeacher
  }
})
