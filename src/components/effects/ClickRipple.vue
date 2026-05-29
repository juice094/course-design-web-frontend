<template>
  <canvas ref="canvasRef" class="click-ripple-canvas" aria-hidden="true" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)

interface Ripple {
  x: number
  y: number
  r: number
  maxR: number
  opacity: number
  velocity: number
}

const MAX_RIPPLES = 20
const RIPPLE_COLOR = '129, 140, 248' // indigo-400

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  // SAFETY: 检测用户是否偏好减少动态效果
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  let ripples: Ripple[] = []
  let rafId = 0
  let isRunning = true

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio, 2)
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  const handleClick = (e: MouseEvent) => {
    if (ripples.length >= MAX_RIPPLES) {
      ripples.shift()
    }
    ripples.push({
      x: e.clientX,
      y: e.clientY,
      r: 0,
      maxR: 60,
      opacity: 0.6,
      velocity: 2.5,
    })
  }

  const animate = () => {
    if (!isRunning) return

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

    // 全局阴影增加"云端"质感
    ctx.shadowBlur = 15
    ctx.shadowColor = `rgba(${RIPPLE_COLOR}, 0.5)`

    for (let i = ripples.length - 1; i >= 0; i--) {
      const r = ripples[i]
      r.r += r.velocity
      r.velocity *= 0.96
      r.opacity -= 0.015

      if (r.opacity <= 0) {
        ripples.splice(i, 1)
        continue
      }

      // 外圈
      ctx.beginPath()
      ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(${RIPPLE_COLOR}, ${r.opacity})`
      ctx.lineWidth = 2
      ctx.stroke()

      // 内部淡实心圆
      ctx.beginPath()
      ctx.arc(r.x, r.y, r.r * 0.5, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${RIPPLE_COLOR}, ${r.opacity * 0.3})`
      ctx.fill()
    }

    ctx.shadowBlur = 0
    rafId = requestAnimationFrame(animate)
  }

  // 后台降频
  const handleVisibility = () => {
    if (document.hidden) {
      isRunning = false
      cancelAnimationFrame(rafId)
    } else {
      isRunning = true
      rafId = requestAnimationFrame(animate)
    }
  }

  window.addEventListener('resize', resize, { passive: true })
  window.addEventListener('click', handleClick, { capture: true, passive: true })
  document.addEventListener('visibilitychange', handleVisibility)
  resize()
  rafId = requestAnimationFrame(animate)

  onUnmounted(() => {
    isRunning = false
    cancelAnimationFrame(rafId)
    window.removeEventListener('resize', resize)
    window.removeEventListener('click', handleClick, { capture: true })
    document.removeEventListener('visibilitychange', handleVisibility)
  })
})
</script>

<style scoped>
.click-ripple-canvas {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 9999;
  contain: layout paint;
}
</style>
