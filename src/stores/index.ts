import { defineStore } from 'pinia'
import { ref, computed, readonly } from 'vue'

export const useAppStore = defineStore('app', () => {
  const _sidebarCollapsed = ref(false)
  const sidebarCollapsed = readonly(_sidebarCollapsed)
  const _theme = ref<'light' | 'dark'>('light')
  const theme = readonly(_theme)

  const isDark = computed(() => _theme.value === 'dark')

  function toggleSidebar() {
    _sidebarCollapsed.value = !_sidebarCollapsed.value
  }

  function toggleTheme() {
    _theme.value = _theme.value === 'light' ? 'dark' : 'light'
  }

  return { sidebarCollapsed, theme, isDark, toggleSidebar, toggleTheme }
})
