import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { createLocalStorageRepo } from '@/shared/repository/localStorage'

import type { CourseItem, ScheduleConfig, ScheduleVisibility } from '@/types/content'
export type { CourseItem, ScheduleConfig, ScheduleVisibility } from '@/types/content'

const STORAGE_KEY = 'portal-schedule-v1'

const DEFAULT_COLORS = [
  '#6366f1', '#ec4899', '#f59e0b', '#10b981',
  '#3b82f6', '#8b5cf6', '#ef4444', '#06b6d4',
]

function getDefaultColor(index: number): string {
  return DEFAULT_COLORS[index % DEFAULT_COLORS.length]
}

function createDemoData(): ScheduleConfig {
  return {
    semester: '2025-2026-2',
    maxSlots: 12,
    visibility: 'public',
    whitelist: [],
    courses: [
      {
        id: 'demo-1',
        name: '数据结构',
        teacher: '王老师',
        location: '信工楼 301',
        day: 1,
        startSlot: 1,
        endSlot: 2,
        color: '#6366f1',
        weekPattern: '全周',
      },
      {
        id: 'demo-2',
        name: '操作系统',
        teacher: '李老师',
        location: '信工楼 205',
        day: 2,
        startSlot: 3,
        endSlot: 4,
        color: '#ec4899',
        weekPattern: '全周',
      },
      {
        id: 'demo-3',
        name: '计算机网络',
        teacher: '张老师',
        location: '信工楼 402',
        day: 3,
        startSlot: 5,
        endSlot: 6,
        color: '#10b981',
        weekPattern: '单周',
      },
    ],
  }
}

function mergeFields(parsed: Partial<ScheduleConfig>, fallback: ScheduleConfig): ScheduleConfig {
  return {
    courses: parsed.courses ?? fallback.courses,
    semester: parsed.semester ?? fallback.semester,
    maxSlots: parsed.maxSlots ?? fallback.maxSlots,
    visibility: parsed.visibility ?? fallback.visibility,
    whitelist: parsed.whitelist ?? fallback.whitelist,
  }
}

const repo = createLocalStorageRepo<ScheduleConfig>(
  STORAGE_KEY,
  () => JSON.parse(JSON.stringify(createDemoData())),
  (parsed) => mergeFields(parsed, createDemoData()),
)

export const useScheduleStore = defineStore('schedule', () => {
  const config = ref<ScheduleConfig>(repo.load())

  const courses = computed(() => config.value.courses)
  const semester = computed(() => config.value.semester)
  const maxSlots = computed(() => config.value.maxSlots)
  const visibility = computed(() => config.value.visibility)
  const whitelist = computed(() => config.value.whitelist)

  function persist() {
    repo.save(config.value)
  }

  function addCourse(item: Omit<CourseItem, 'id' | 'color'>) {
    const id = `course-${Date.now()}`
    const color = getDefaultColor(config.value.courses.length)
    config.value.courses.push({ ...item, id, color })
    persist()
  }

  function removeCourse(id: string) {
    config.value.courses = config.value.courses.filter(c => c.id !== id)
    persist()
  }

  function updateCourse(id: string, updates: Partial<CourseItem>) {
    const course = config.value.courses.find(c => c.id === id)
    if (course) {
      Object.assign(course, updates)
      persist()
    }
  }

  function setSemester(value: string) {
    config.value.semester = value
    persist()
  }

  function setMaxSlots(value: number) {
    config.value.maxSlots = value
    persist()
  }

  function setVisibility(value: ScheduleVisibility) {
    config.value.visibility = value
    persist()
  }

  function setWhitelist(value: string[]) {
    config.value.whitelist = value
    persist()
  }

  function addToWhitelist(userId: string) {
    if (!config.value.whitelist.includes(userId)) {
      config.value.whitelist.push(userId)
      persist()
    }
  }

  function removeFromWhitelist(userId: string) {
    config.value.whitelist = config.value.whitelist.filter(id => id !== userId)
    persist()
  }

  function resetToDemo() {
    config.value = JSON.parse(JSON.stringify(createDemoData()))
    persist()
  }

  return {
    config,
    courses,
    semester,
    maxSlots,
    visibility,
    whitelist,
    addCourse,
    removeCourse,
    updateCourse,
    setSemester,
    setMaxSlots,
    setVisibility,
    setWhitelist,
    addToWhitelist,
    removeFromWhitelist,
    resetToDemo,
  }
})
