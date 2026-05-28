import { ref, readonly } from 'vue'
import { defineStore } from 'pinia'
import { createPersistPlugin } from '@/shared/persist/plugin'

import type { Moment } from '@/types/content'
export type { Moment } from '@/types/content'

const STORAGE_KEY = 'portal-moments-v1'

const demoMoments: Moment[] = [
  {
    id: 'demo-1',
    content: '终于把 syncthing-rust 的 handshake 协议调通了，Rust 的类型系统在这种协议实现场景下真的是神器。',
    tags: ['Rust', 'P2P'],
    date: '2026-05-20T14:30:00',
    mood: '开心',
  },
  {
    id: 'demo-2',
    content: '课设答辩结束了，Canvas 游戏组的演示效果比预期好。下一届可以考虑用 WebGL 升级一下渲染管线。',
    images: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400',
    ],
    tags: ['课设', 'Canvas'],
    date: '2026-05-15T09:00:00',
    mood: '满足',
  },
]

const persistPlugin = createPersistPlugin<Moment[]>({
  key: STORAGE_KEY,
  fallback: () => JSON.parse(JSON.stringify(demoMoments)),
})

export const useMomentStore = defineStore('moments', () => {
  const _moments = ref<Moment[]>(persistPlugin.load())
  const moments = readonly(_moments)

  function addMoment(item: Omit<Moment, 'id' | 'date'>) {
    const id = `moment-${Date.now()}`
    const date = new Date().toISOString()
    _moments.value.unshift({ ...item, id, date })
    persistPlugin.save(_moments.value)
  }

  function removeMoment(id: string) {
    _moments.value = _moments.value.filter(m => m.id !== id)
    persistPlugin.save(_moments.value)
  }

  function updateMoment(id: string, updates: Partial<Moment>) {
    const moment = _moments.value.find(m => m.id === id)
    if (moment) {
      Object.assign(moment, updates)
      persistPlugin.save(_moments.value)
    }
  }

  function resetToDemo() {
    _moments.value = JSON.parse(JSON.stringify(demoMoments))
    persistPlugin.save(_moments.value)
  }

  return {
    moments,
    addMoment,
    removeMoment,
    updateMoment,
    resetToDemo,
  }
})
