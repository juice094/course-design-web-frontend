<template>
  <nav class="portal-nav">
    <div class="nav-inner">
      <div class="brand" role="button" tabindex="0" @click="onBrandClick">
        <span class="brand-name">GSAU</span>
        <span class="brand-divider">·</span>
        <span class="brand-desc">教务数据可视化系统</span>
      </div>

      <!-- 导航菜单 -->
      <nav class="nav-menu">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="nav-link"
          active-class="active"
        >
          {{ item.label }}
        </router-link>
      </nav>

      <div class="actions">
        <button
          class="theme-btn"
          aria-label="页面设置"
          @click="portalStore.openSettings"
        >
          <svg class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>

        <button
          class="theme-btn"
          aria-label="切换主题"
          @click="themeStore.toggleTheme"
        >
          <svg
            v-if="themeStore.isDark"
            class="icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <svg
            v-else
            class="icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </button>

        <router-link
          :to="userStore.isLoggedIn ? '/' : '/login'"
          class="enter-btn"
        >
          {{ userStore.isLoggedIn ? '教务系统' : '进入系统' }}
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useThemeStore } from '@/stores/theme'
import { usePortalStore } from '@/stores/portal'
import { useUserStore } from '@/stores/user'
import { schoolInfo } from '@/data/profile'

const router = useRouter()
const themeStore = useThemeStore()
const portalStore = usePortalStore()
const userStore = useUserStore()

const navItems = [
  { path: '/portal', label: '首页' },
  { path: '/portal/academic', label: '学业' },
  { path: '/portal/works', label: '作品' },
  { path: '/portal/space', label: '空间' },
  { path: '/portal/about', label: '关于' },
]

function onBrandClick() {
  if (userStore.isLoggedIn) {
    router.push('/')
  } else {
    window.open(schoolInfo.website, '_blank', 'noopener,noreferrer')
  }
}
</script>

<style scoped>
.portal-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.3);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  transition: background 1s, border-color 1s;
}

.dark .portal-nav {
  background: rgba(15, 23, 42, 0.4);
  border-color: rgba(255, 255, 255, 0.05);
}

.nav-inner {
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 1rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.nav-menu {
  display: none;
  align-items: center;
  gap: 0.25rem;
  flex: 1;
  justify-content: center;
}

@media (min-width: 768px) {
  .nav-menu { display: flex; }
}

.nav-link {
  padding: 0.5rem 0.875rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #475569;
  text-decoration: none;
  transition: all 0.3s;
  white-space: nowrap;
}

.dark .nav-link { color: #94a3b8; }

.nav-link:hover {
  color: #6366f1;
  background: rgba(99, 102, 241, 0.08);
}

.dark .nav-link:hover {
  background: rgba(99, 102, 241, 0.15);
}

.nav-link.active {
  color: #6366f1;
  background: rgba(99, 102, 241, 0.12);
}

.dark .nav-link.active {
  color: #818cf8;
  background: rgba(99, 102, 241, 0.2);
}

@media (min-width: 640px) {
  .nav-inner { padding: 0 1.5rem; }
}

@media (min-width: 1024px) {
  .nav-inner { padding: 0 2.5rem; }
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  cursor: pointer;
  user-select: none;
}

.brand-name {
  font-size: 1.125rem;
  font-weight: 700;
  color: #0f172a;
  font-family: 'Noto Serif SC', serif;
  letter-spacing: 0.05em;
  transition: color 1s;
}

.dark .brand-name { color: #fff; }

@media (min-width: 768px) {
  .brand-name { font-size: 1.25rem; }
}

.brand-divider {
  color: #94a3b8;
  font-size: 0.875rem;
}

.brand-desc {
  color: #475569;
  font-size: 0.75rem;
  font-weight: 500;
  font-family: 'Noto Serif SC', serif;
  display: none;
  transition: color 1s;
}

.dark .brand-desc { color: #cbd5e1; }

@media (min-width: 640px) {
  .brand-desc { display: inline; }
}

.actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.theme-btn {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #475569;
  border: 1px solid rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: all 0.3s;
}

.dark .theme-btn {
  background: rgba(51, 65, 85, 0.5);
  color: #cbd5e1;
  border-color: rgba(255, 255, 255, 0.1);
}

.theme-btn:hover {
  background: #6366f1;
  color: #fff;
}

.dark .theme-btn:hover { background: #4f46e5; }

.icon { width: 1rem; height: 1rem; }

.enter-btn {
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  background: #6366f1;
  color: #fff;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
  box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.3);
}

.enter-btn:hover {
  background: #4f46e5;
  transform: scale(1.05);
  box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.4);
}
</style>
