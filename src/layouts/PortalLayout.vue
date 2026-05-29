<template>
  <div class="portal-layout" :class="{ dark: themeStore.isDark }">
    <PortalBackground />
    <PortalNavbar />
    <PortalSettings />

    <main class="portal-main">
      <div class="scale-outer" :style="outerStyle">
        <div
          ref="scaleWrapperRef"
          class="scale-wrapper"
          :style="scaleStyle"
        >
          <div class="portal-content">
            <PageTransition>
              <router-view />
            </PageTransition>
          </div>
        </div>
      </div>
    </main>

    <ParticleCanvas />
    <ClickRipple />
  </div>
</template>

<script setup lang="ts">
import PortalBackground from '@/components/portal/PortalBackground.vue'
import PortalNavbar from '@/components/portal/PortalNavbar.vue'
import PortalSettings from '@/components/portal/PortalSettings.vue'
import PageTransition from '@/components/effects/PageTransition.vue'
import ClickRipple from '@/components/effects/ClickRipple.vue'
import ParticleCanvas from '@/components/effects/ParticleCanvas.vue'
import { useThemeStore } from '@/stores/theme'
import { ref, computed, onMounted, onUnmounted } from 'vue'

const themeStore = useThemeStore()

// 卡片区域自适应缩放 —— 导航栏保持原大小
const BASE_WIDTH = 1440  // 设计稿基准宽度
const windowWidth = ref(window.innerWidth)
const scaleWrapperRef = ref<HTMLElement | null>(null)
const rawContentHeight = ref(0)

const scaleRatio = computed(() => {
  // 只缩小的场景：窗口小于基准宽度时等比缩放，大于等于基准时保持 1
  if (windowWidth.value >= BASE_WIDTH) return 1
  // 最小缩放到 0.6，避免过度压缩
  return Math.max(windowWidth.value / BASE_WIDTH, 0.6)
})

const scaleStyle = computed(() => {
  const s = scaleRatio.value
  if (s >= 1) return {}
  // 绝对定位脱离文档流，避免 transform scale 产生多余占位；
  // 外层容器通过 JS 计算视觉高度来占位。
  return {
    position: 'absolute',
    top: '0',
    left: '50%',
    transform: `translateX(-50%) scale(${s})`,
    transformOrigin: 'top center',
    width: `${BASE_WIDTH}px`,
  }
})

const outerStyle = computed(() => {
  const s = scaleRatio.value
  if (s >= 1) return {}
  return {
    height: `${rawContentHeight.value * s}px`,
  }
})

function onResize() {
  windowWidth.value = window.innerWidth
}

let ro: ResizeObserver | null = null

onMounted(() => {
  window.addEventListener('resize', onResize)

  const el = scaleWrapperRef.value
  if (el) {
    rawContentHeight.value = el.getBoundingClientRect().height
    ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        rawContentHeight.value = entry.contentRect.height
      }
    })
    ro.observe(el)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
  ro?.disconnect()
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

.scale-outer {
  position: relative;
  transition: height 0.3s ease;
  will-change: height;
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
    max-width: 1440px;
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
