import { ref, onMounted, readonly } from 'vue'
import { defineStore } from 'pinia'
import { createPersistPlugin } from '@/shared/persist/plugin'

const STORAGE_KEY = 'portal-theme'

const persistPlugin = createPersistPlugin<string>({
  key: STORAGE_KEY,
  fallback: () => 'dark',
})

function loadTheme(): boolean {
  return persistPlugin.load() !== 'light'
}

export const useThemeStore = defineStore('theme', () => {
  const _isDark = ref(loadTheme())
  const isDark = readonly(_isDark)
  const _mounted = ref(false)
  const mounted = readonly(_mounted)

  onMounted(() => {
    _mounted.value = true
  })

  function toggleTheme() {
    const next = !_isDark.value
    _isDark.value = next
    persistPlugin.save(next ? 'dark' : 'light')
  }

  return { isDark, mounted, toggleTheme }
})
