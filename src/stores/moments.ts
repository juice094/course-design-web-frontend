import { ref } from 'vue'
import { defineStore } from 'pinia'

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

function loadMoments(): Moment[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as Moment[]
  } catch {
    // ignore
  }
  return JSON.parse(JSON.stringify(demoMoments))
}

function saveMoments(moments: Moment[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(moments))
}

export const useMomentStore = defineStore('moments', () => {
  const moments = ref<Moment[]>(loadMoments())

  function addMoment(item: Omit<Moment, 'id' | 'date'>) {
    const id = `moment-${Date.now()}`
    const date = new Date().toISOString()
    moments.value.unshift({ ...item, id, date })
    saveMoments(moments.value)
  }

  function removeMoment(id: string) {
    moments.value = moments.value.filter(m => m.id !== id)
    saveMoments(moments.value)
  }

  function updateMoment(id: string, updates: Partial<Moment>) {
    const moment = moments.value.find(m => m.id === id)
    if (moment) {
      Object.assign(moment, updates)
      saveMoments(moments.value)
    }
  }

  function resetToDemo() {
    moments.value = JSON.parse(JSON.stringify(demoMoments))
    saveMoments(moments.value)
  }

  return {
    moments,
    addMoment,
    removeMoment,
    updateMoment,
    resetToDemo,
  }
})
