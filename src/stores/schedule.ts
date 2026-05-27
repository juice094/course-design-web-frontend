import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const STORAGE_KEY = 'portal-schedule-v1'

export interface CourseItem {
  id: string
  name: string
  teacher: string
  location: string
  day: 1 | 2 | 3 | 4 | 5 | 6 | 7
  startSlot: number
  endSlot: number
  color: string
  weekPattern: string
}

export type ScheduleVisibility = 'public' | 'private' | 'whitelist'

export interface ScheduleConfig {
  courses: CourseItem[]
  semester: string
  maxSlots: number
  visibility: ScheduleVisibility
  whitelist: string[]
}

const DEFAULT_COLORS = [
  '#6366f1', '#ec4899', '#f59e0b', '#10b981',
  '#3b82f6', '#8b5cf6', '#ef4444', '#06b6d4',
]

function getDefaultColor(index: number): string {
  return DEFAULT_COLORS[index % DEFAULT_COLORS.length]
}

const demoData: ScheduleConfig = {
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

function loadConfig(): ScheduleConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as ScheduleConfig
      return {
        courses: parsed.courses ?? demoData.courses,
        semester: parsed.semester ?? demoData.semester,
        maxSlots: parsed.maxSlots ?? demoData.maxSlots,
        visibility: parsed.visibility ?? demoData.visibility,
        whitelist: parsed.whitelist ?? demoData.whitelist,
      }
    }
  } catch {
    // ignore parse errors
  }
  return JSON.parse(JSON.stringify(demoData))
}

function saveConfig(config: ScheduleConfig): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
}

export const useScheduleStore = defineStore('schedule', () => {
  const config = ref<ScheduleConfig>(loadConfig())

  const courses = computed(() => config.value.courses)
  const semester = computed(() => config.value.semester)
  const maxSlots = computed(() => config.value.maxSlots)
  const visibility = computed(() => config.value.visibility)
  const whitelist = computed(() => config.value.whitelist)

  function addCourse(item: Omit<CourseItem, 'id' | 'color'>) {
    const id = `course-${Date.now()}`
    const color = getDefaultColor(config.value.courses.length)
    config.value.courses.push({ ...item, id, color })
    saveConfig(config.value)
  }

  function removeCourse(id: string) {
    config.value.courses = config.value.courses.filter(c => c.id !== id)
    saveConfig(config.value)
  }

  function updateCourse(id: string, updates: Partial<CourseItem>) {
    const course = config.value.courses.find(c => c.id === id)
    if (course) {
      Object.assign(course, updates)
      saveConfig(config.value)
    }
  }

  function setSemester(value: string) {
    config.value.semester = value
    saveConfig(config.value)
  }

  function setMaxSlots(value: number) {
    config.value.maxSlots = value
    saveConfig(config.value)
  }

  function setVisibility(value: ScheduleVisibility) {
    config.value.visibility = value
    saveConfig(config.value)
  }

  function setWhitelist(value: string[]) {
    config.value.whitelist = value
    saveConfig(config.value)
  }

  function addToWhitelist(userId: string) {
    if (!config.value.whitelist.includes(userId)) {
      config.value.whitelist.push(userId)
      saveConfig(config.value)
    }
  }

  function removeFromWhitelist(userId: string) {
    config.value.whitelist = config.value.whitelist.filter(id => id !== userId)
    saveConfig(config.value)
  }

  function resetToDemo() {
    config.value = JSON.parse(JSON.stringify(demoData))
    saveConfig(config.value)
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
