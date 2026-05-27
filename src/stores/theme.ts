import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'

const STORAGE_KEY = 'portal-theme'

function loadTheme(): boolean {
  const saved = localStorage.getItem(STORAGE_KEY)
  return saved !== 'light'
}

function saveTheme(isDark: boolean): void {
  localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light')
}

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(loadTheme())
  const mounted = ref(false)

  onMounted(() => {
    mounted.value = true
  })

  function toggleTheme() {
    const next = !isDark.value
    isDark.value = next
    saveTheme(next)
  }

  return { isDark, mounted, toggleTheme }
})
