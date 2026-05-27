import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const STORAGE_KEY = 'portal-achievements-v1'

export type AchievementLevel = 'national' | 'provincial' | 'school' | 'other'

export interface Achievement {
  id: string
  title: string
  level: AchievementLevel
  date: string
  description?: string
  certificateUrl?: string
}

const levelLabels: Record<AchievementLevel, string> = {
  national: '国家级',
  provincial: '省级',
  school: '校级',
  other: '其他',
}

const levelColors: Record<AchievementLevel, string> = {
  national: '#f59e0b',
  provincial: '#8b5cf6',
  school: '#3b82f6',
  other: '#64748b',
}

const demoAchievements: Achievement[] = [
  {
    id: 'demo-1',
    title: '全国大学生计算机设计大赛 二等奖',
    level: 'national',
    date: '2025-08-15',
    description: '作品《基于区块链的农产品溯源系统》获软件应用与开发组二等奖。',
  },
]

function loadAchievements(): Achievement[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as Achievement[]
  } catch {
    // ignore
  }
  return JSON.parse(JSON.stringify(demoAchievements))
}

function saveAchievements(achievements: Achievement[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(achievements))
}

export const useAchievementStore = defineStore('achievements', () => {
  const achievements = ref<Achievement[]>(loadAchievements())

  const sortedAchievements = computed(() =>
    [...achievements.value].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    ),
  )

  function addAchievement(item: Omit<Achievement, 'id'>) {
    const id = `achievement-${Date.now()}`
    achievements.value.push({ ...item, id })
    saveAchievements(achievements.value)
  }

  function removeAchievement(id: string) {
    achievements.value = achievements.value.filter(a => a.id !== id)
    saveAchievements(achievements.value)
  }

  function updateAchievement(id: string, updates: Partial<Achievement>) {
    const achievement = achievements.value.find(a => a.id === id)
    if (achievement) {
      Object.assign(achievement, updates)
      saveAchievements(achievements.value)
    }
  }

  function resetToDemo() {
    achievements.value = JSON.parse(JSON.stringify(demoAchievements))
    saveAchievements(achievements.value)
  }

  return {
    achievements,
    sortedAchievements,
    addAchievement,
    removeAchievement,
    updateAchievement,
    resetToDemo,
    levelLabels,
    levelColors,
  }
})
