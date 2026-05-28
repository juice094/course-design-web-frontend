import { ref, computed, readonly } from 'vue'
import { defineStore } from 'pinia'
import { createPersistPlugin } from '@/shared/persist/plugin'

import type { Achievement, AchievementLevel } from '@/types/content'
export type { Achievement, AchievementLevel } from '@/types/content'

const STORAGE_KEY = 'portal-achievements-v1'

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

const persistPlugin = createPersistPlugin<Achievement[]>({
  key: STORAGE_KEY,
  fallback: () => JSON.parse(JSON.stringify(demoAchievements)),
})

export const useAchievementStore = defineStore('achievements', () => {
  const _achievements = ref<Achievement[]>(persistPlugin.load())
  const achievements = readonly(_achievements)

  const sortedAchievements = computed(() =>
    [..._achievements.value].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    ),
  )

  function addAchievement(item: Omit<Achievement, 'id'>) {
    const id = `achievement-${Date.now()}`
    _achievements.value.push({ ...item, id })
    persistPlugin.save(_achievements.value)
  }

  function removeAchievement(id: string) {
    _achievements.value = _achievements.value.filter(a => a.id !== id)
    persistPlugin.save(_achievements.value)
  }

  function updateAchievement(id: string, updates: Partial<Achievement>) {
    const achievement = _achievements.value.find(a => a.id === id)
    if (achievement) {
      Object.assign(achievement, updates)
      persistPlugin.save(_achievements.value)
    }
  }

  function resetToDemo() {
    _achievements.value = JSON.parse(JSON.stringify(demoAchievements))
    persistPlugin.save(_achievements.value)
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
