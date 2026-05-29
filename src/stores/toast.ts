import { ref } from 'vue'
import { defineStore } from 'pinia'

export type ToastType = 'success' | 'warning' | 'error' | 'info'

export interface ToastItem {
  id: string
  text: string
  type: ToastType
  createdAt: number
}

const MAX_TOASTS = 3
const AUTO_DISMISS_MS = 3000

export const useToastStore = defineStore('toast', () => {
  const items = ref<ToastItem[]>([])

  function show(text: string, type: ToastType = 'success') {
    // 如果超出上限，移除最旧的一条
    if (items.value.length >= MAX_TOASTS) {
      items.value.shift()
    }

    const id = Math.random().toString(36).slice(2, 9)
    items.value.push({ id, text, type, createdAt: Date.now() })

    setTimeout(() => dismiss(id), AUTO_DISMISS_MS)
  }

  function dismiss(id: string) {
    items.value = items.value.filter((i) => i.id !== id)
  }

  function clear() {
    items.value = []
  }

  return { items, show, dismiss, clear }
})
