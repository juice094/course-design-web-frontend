<template>
  <canvas
    v-if="shouldShow"
    ref="canvasRef"
    class="particle-canvas"
    aria-hidden="true"
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useEffectsStore } from '@/stores/effects'
import { useThemeStore } from '@/stores/theme'
import type { ParticleRenderer } from './renderers/types'
import { fireflyRenderer } from './renderers/fireflyRenderer'
import { sakuraRenderer } from './renderers/sakuraRenderer'
import { grassRenderer } from './renderers/grassRenderer'
import { danmakuRenderer } from './renderers/danmakuRenderer'
import { snowRenderer } from './renderers/snowRenderer'

const renderers: Record<string, ParticleRenderer> = {
  fireflies: fireflyRenderer,
  sakura: sakuraRenderer,
  grass: grassRenderer,
  danmaku: danmakuRenderer,
  snow: snowRenderer,
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
const effectsStore = useEffectsStore()
const themeStore = useThemeStore()

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

const resolvedType = computed(() => {
  if (!effectsStore.isEnabled || prefersReducedMotion) return null
  let t = effectsStore.activeType
  if (t === 'auto') {
    t = themeStore.isDark ? 'fireflies' : 'sakura'
  }
  if (t === 'none') return null
  return t as keyof typeof renderers
})

const shouldShow = computed(() => resolvedType.value !== null)

let rafId = 0
let lastTime = 0
let activeRenderer: ParticleRenderer | null = null
let ctx: CanvasRenderingContext2D | null = null
let isRunning = false
let dpr = 1

function setupCanvas() {
  const canvas = canvasRef.value
  if (!canvas) return false
  ctx = canvas.getContext('2d')
  if (!ctx) return false

  dpr = Math.min(window.devicePixelRatio, 2)
  const w = window.innerWidth
  const h = window.innerHeight

  canvas.width = w * dpr
  canvas.height = h * dpr
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

  return true
}

function resize() {
  const canvas = canvasRef.value
  if (!canvas || !ctx) return

  const w = window.innerWidth
  const h = window.innerHeight

  canvas.width = w * dpr
  canvas.height = h * dpr
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

  activeRenderer?.resize(w, h)
}

function switchRenderer(type: string | null) {
  activeRenderer?.destroy()
  activeRenderer = null
  if (!type || !ctx) return

  const renderer = renderers[type]
  if (!renderer) return

  const w = window.innerWidth
  const h = window.innerHeight

  renderer.init(ctx, w, h, effectsStore.density)
  activeRenderer = renderer
}

function animate(timestamp: number) {
  if (!isRunning || !ctx) return

  const dt = lastTime ? (timestamp - lastTime) / 1000 : 0
  lastTime = timestamp

  const w = window.innerWidth
  const h = window.innerHeight

  // 省电模式：限制帧率到 30fps
  if (effectsStore.isPowerSave && dt < 0.033) {
    rafId = requestAnimationFrame(animate)
    return
  }

  ctx.clearRect(0, 0, w, h)
  activeRenderer?.render(ctx, w, h, dt)

  rafId = requestAnimationFrame(animate)
}

function start() {
  if (isRunning) return
  isRunning = true
  lastTime = 0
  rafId = requestAnimationFrame(animate)
}

function stop() {
  isRunning = false
  cancelAnimationFrame(rafId)
  rafId = 0
}

// 后台标签页暂停
function handleVisibility() {
  if (document.hidden) {
    stop()
  } else if (shouldShow.value) {
    start()
  }
}

// 监听配置变化
watch(resolvedType, (type) => {
  stop()
  if (!type) return
  if (!setupCanvas()) return
  switchRenderer(type)
  start()
})

onMounted(() => {
  if (!shouldShow.value) return
  if (!setupCanvas()) return
  switchRenderer(resolvedType.value)
  start()

  window.addEventListener('resize', resize, { passive: true })
  document.addEventListener('visibilitychange', handleVisibility)
})

onUnmounted(() => {
  stop()
  activeRenderer?.destroy()
  window.removeEventListener('resize', resize)
  document.removeEventListener('visibilitychange', handleVisibility)
})
</script>

<style scoped>
.particle-canvas {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 0;
  contain: layout paint;
}
</style>
