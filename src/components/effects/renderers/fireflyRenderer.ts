import type { ParticleRenderer, ParticleDensity } from './types'
import { densityMap } from './density'

interface Firefly {
  x: number
  y: number
  baseX: number
  baseY: number
  size: number
  breathePhase: number
  breatheSpeed: number
  floatPhase: number
  floatSpeed: number
  floatRadius: number
}

let fireflies: Firefly[] = []

export const fireflyRenderer: ParticleRenderer = {
  name: 'fireflies',

  init(_ctx, width, height, density) {
    const count = densityMap.fireflies[density]
    fireflies = Array.from({ length: count }, () => {
      const x = Math.random() * width
      const y = Math.random() * height
      return {
        x, y, baseX: x, baseY: y,
        size: 2 + Math.random() * 3,
        breathePhase: Math.random() * Math.PI * 2,
        breatheSpeed: 0.5 + Math.random() * 1.2,
        floatPhase: Math.random() * Math.PI * 2,
        floatSpeed: 0.2 + Math.random() * 0.4,
        floatRadius: 30 + Math.random() * 60,
      }
    })
  },

  render(ctx, width, height, dt) {
    for (const f of fireflies) {
      // 更新呼吸相位
      f.breathePhase += f.breatheSpeed * dt
      const breathe = (Math.sin(f.breathePhase) + 1) / 2
      const opacity = 0.15 + breathe * 0.85
      const glowSize = f.size * (0.6 + breathe * 0.8)

      // 更新漂浮位置
      f.floatPhase += f.floatSpeed * dt
      f.x = f.baseX + Math.cos(f.floatPhase) * f.floatRadius
      f.y = f.baseY + Math.sin(f.floatPhase * 0.7) * f.floatRadius * 0.6

      // 边界回绕
      if (f.x < -50) f.baseX += width + 100
      if (f.x > width + 50) f.baseX -= width + 100
      if (f.y < -50) f.baseY += height + 100
      if (f.y > height + 50) f.baseY -= height + 100

      // 绘制发光
      const gradient = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, glowSize * 4)
      gradient.addColorStop(0, `rgba(180, 255, 180, ${opacity})`)
      gradient.addColorStop(0.3, `rgba(100, 255, 150, ${opacity * 0.5})`)
      gradient.addColorStop(1, 'rgba(100, 255, 150, 0)')

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(f.x, f.y, glowSize * 4, 0, Math.PI * 2)
      ctx.fill()

      // 核心亮点
      ctx.fillStyle = `rgba(220, 255, 220, ${opacity})`
      ctx.beginPath()
      ctx.arc(f.x, f.y, glowSize * 0.5, 0, Math.PI * 2)
      ctx.fill()
    }
  },

  resize(width, height) {
    for (const f of fireflies) {
      f.baseX = Math.min(f.baseX, width)
      f.baseY = Math.min(f.baseY, height)
    }
  },

  destroy() {
    fireflies = []
  },
}
