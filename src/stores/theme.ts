import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(true)
  const mounted = ref(false)

  onMounted(() => {
    mounted.value = true
    const saved = localStorage.getItem('portal-theme')
    const isDarkMode = saved !== 'light'
    isDark.value = isDarkMode
    applyTheme(isDarkMode)
  })

  function applyTheme(dark: boolean) {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }

  function toggleTheme() {
    const next = !isDark.value
    isDark.value = next
    localStorage.setItem('portal-theme', next ? 'dark' : 'light')
    applyTheme(next)
  }

  return { isDark, mounted, toggleTheme }
})
