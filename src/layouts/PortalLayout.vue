<template>
  <div class="portal-layout" :class="{ dark: themeStore.isDark }">
    <PortalBackground />
    <PortalNavbar />
    <PortalSettings />

    <main class="portal-main">
      <div
        class="scale-wrapper"
        :style="scaleStyle"
      >
        <div class="portal-content">
          <router-view />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import PortalBackground from '@/components/portal/PortalBackground.vue'
import PortalNavbar from '@/components/portal/PortalNavbar.vue'
import PortalSettings from '@/components/portal/PortalSettings.vue'
import { useThemeStore } from '@/stores/theme'
import { ref, computed, onMounted, onUnmounted } from 'vue'

const themeStore = useThemeStore()

// 卡片区域自适应缩放 —— 导航栏保持原大小
const BASE_WIDTH = 1440  // 设计稿基准宽度
const windowWidth = ref(window.innerWidth)

const scaleRatio = computed(() => {
  // 只缩小的场景：窗口小于基准宽度时等比缩放，大于等于基准时保持 1
  if (windowWidth.value >= BASE_WIDTH) return 1
  // 最小缩放到 0.6，避免过度压缩
  return Math.max(windowWidth.value / BASE_WIDTH, 0.6)
})

const scaleStyle = computed(() => {
  const s = scaleRatio.value
  if (s >= 1) return {}
  return {
    transform: `scale(${s})`,
    transformOrigin: 'top center',
    width: `${BASE_WIDTH}px`,
    maxWidth: `${BASE_WIDTH}px`,
    marginLeft: 'auto',
    marginRight: 'auto',
  }
})

function onResize() {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
})
</script>

<style>
.portal-layout {
  min-height: 100vh;
  position: relative;
  padding-bottom: 2.5rem;
  font-family: 'Noto Serif SC', 'Source Han Serif SC', 'SimSun', serif;
}

.portal-main {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 6rem 1rem 0;
  position: relative;
  z-index: 10;
  overflow: visible; /* 允许缩放后的内容溢出 */
}

.scale-wrapper {
  transition: transform 0.3s ease;
  will-change: transform;
}

@media (min-width: 640px) {
  .portal-main {
    padding: 7rem 1.5rem 0;
  }
}

@media (min-width: 1024px) {
  .portal-main {
    padding: 7rem 2.5rem 0;
  }
}

@media (min-width: 1440px) {
  .scale-wrapper {
    transform: none !important;
    width: auto !important;
    max-width: 72rem;
    margin-left: auto;
    margin-right: auto;
  }
}

.portal-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  margin-top: 1.5rem;
}

.portal-layout ::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.portal-layout ::-webkit-scrollbar-track {
  background: transparent;
}
.portal-layout ::-webkit-scrollbar-thumb {
  background: rgba(99, 102, 241, 0.3);
  border-radius: 10px;
}
.portal-layout ::-webkit-scrollbar-thumb:hover {
  background: rgba(99, 102, 241, 0.8);
}
</style>
