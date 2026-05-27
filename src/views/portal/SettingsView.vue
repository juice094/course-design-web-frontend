<template>
  <div class="settings-view" :class="{ dark: themeStore.isDark }">
    <div class="settings-container">
      <!-- 左侧导航菜单 -->
      <div class="sidebar">
        <div class="sidebar-card">
          <p class="sidebar-label">系统管理</p>
          <nav class="sidebar-nav">
            <button
              v-for="item in menuItems"
              :key="item.id"
              class="nav-item"
              :class="{ active: activeTab === item.id }"
              @click="activeTab = item.id"
            >
              <span class="nav-icon">{{ item.icon }}</span>
              <span class="nav-name">{{ item.label }}</span>
            </button>
          </nav>
        </div>
      </div>

      <!-- 右侧内容区域 -->
      <div class="content">
        <transition name="fade" mode="out-in">
          <div v-if="activeTab === 'appearance'" key="appearance">
            <SettingsAppearance />
          </div>
          <div v-else-if="activeTab === 'schedule'" key="schedule">
            <SettingsScheduleEditor />
          </div>
          <div v-else-if="activeTab === 'articles'" key="articles">
            <SettingsArticleEditor />
          </div>
          <div v-else-if="activeTab === 'photos'" key="photos">
            <SettingsPhotoEditor />
          </div>
          <div v-else-if="activeTab === 'moments'" key="moments">
            <SettingsMomentEditor />
          </div>
          <div v-else-if="activeTab === 'achievements'" key="achievements">
            <SettingsAchievementEditor />
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeStore } from '@/stores/theme'
import SettingsScheduleEditor from '@/components/portal/SettingsScheduleEditor.vue'
import SettingsArticleEditor from '@/components/portal/SettingsArticleEditor.vue'
import SettingsPhotoEditor from '@/components/portal/SettingsPhotoEditor.vue'
import SettingsMomentEditor from '@/components/portal/SettingsMomentEditor.vue'
import SettingsAchievementEditor from '@/components/portal/SettingsAchievementEditor.vue'
import SettingsAppearance from '@/components/portal/SettingsAppearance.vue'

const router = useRouter()
const themeStore = useThemeStore()

const activeTab = ref('appearance')

const menuItems = [
  { id: 'appearance', label: '外观设置', icon: '🎨' },
  { id: 'schedule', label: '课程表管理', icon: '📅' },
  { id: 'articles', label: '文章管理', icon: '📝' },
  { id: 'photos', label: '照片管理', icon: '🖼️' },
  { id: 'moments', label: '动态管理', icon: '💬' },
  { id: 'achievements', label: '成就管理', icon: '🏆' },
]
</script>

<style scoped>
.settings-view {
  min-height: 100vh;
  padding: 6rem 1rem 4rem;
  font-family: 'Noto Serif SC', 'Source Han Serif SC', 'SimSun', serif;
}

@media (min-width: 640px) {
  .settings-view {
    padding: 7rem 1.5rem 4rem;
  }
}

@media (min-width: 1024px) {
  .settings-view {
    padding: 7rem 2.5rem 4rem;
  }
}

.settings-container {
  width: 100%;
  max-width: 72rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

@media (min-width: 1024px) {
  .settings-container {
    flex-direction: row;
    align-items: flex-start;
    gap: 2rem;
  }
}

.sidebar {
  width: 100%;
  flex-shrink: 0;
}

@media (min-width: 1024px) {
  .sidebar {
    width: 18rem;
  }
}

.sidebar-card {
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 1.5rem;
  padding: 1.25rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.dark .sidebar-card {
  background: rgba(30, 41, 59, 0.4);
  border-color: rgba(255, 255, 255, 0.08);
}

.sidebar-label {
  font-size: 0.625rem;
  font-weight: 900;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
  margin-left: 0.5rem;
}

.dark .sidebar-label {
  color: #64748b;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  border: none;
  background: transparent;
  color: #475569;
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
}

.dark .nav-item {
  color: #94a3b8;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.5);
}

.dark .nav-item:hover {
  background: rgba(30, 41, 59, 0.5);
}

.nav-item.active {
  background: #6366f1;
  color: #fff;
  box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.3), 0 2px 4px -1px rgba(99, 102, 241, 0.2);
  transform: translateX(0.25rem);
}

.nav-icon {
  font-size: 1rem;
}

.content {
  flex: 1;
  width: 100%;
  min-width: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>
