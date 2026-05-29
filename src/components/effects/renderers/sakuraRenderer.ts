import type { ParticleRenderer, ParticleDensity } from './types'
import { densityMap } from './density'

interface Petal {
  x: number
  y: number
  size: number
  rotation: number
  rotationSpeed: number
  fallSpeed: number
  swayPhase: number
  swaySpeed: number
  opacity: number
}

let petals: Petal[] = []

export const sakuraRenderer: ParticleRenderer = {
  name: 'sakura',

  init(_ctx, width, _height, density) {
    const count = densityMap.sakura[density]
    petals = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * -100,
      size: 4 + Math.random() * 10,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 2,
      fallSpeed: 20 + Math.random() * 40,
      swayPhase: Math.random() * Math.PI * 2,
      swaySpeed: 0.5 + Math.random() * 1.5,
      opacity: 0.5 + Math.random() * 0.5,
    }))
  },

  render(ctx, width, height, dt) {
    for (const p of petals) {
      p.y += p.fallSpeed * dt
      p.swayPhase += p.swaySpeed * dt
      p.x += Math.sin(p.swayPhase) * 15 * dt
      p.rotation += p.rotationSpeed * dt

      if (p.y > height + 20) {
        p.y = -20
        p.x = Math.random() * width
      }
      if (p.x < -20) p.x = width + 20
      if (p.x > width + 20) p.x = -20

      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rotation)

      // 樱花花瓣形状：椭圆 + 心形凹陷
      ctx.fillStyle = `rgba(255, 183, 197, ${p.opacity * 0.7})`
      ctx.beginPath()
      ctx.ellipse(0, 0, p.size, p.size * 0.8, 0, 0, Math.PI * 2)
      ctx.fill()

      // 中心高光
      ctx.fillStyle = `rgba(255, 220, 230, ${p.opacity * 0.4})`
      ctx.beginPath()
      ctx.ellipse(0, -p.size * 0.2, p.size * 0.4, p.size * 0.3, 0, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()
    }
  },

  resize(width, _height) {
    for (const p of petals) {
      if (p.x > width) p.x = Math.random() * width
    }
  },

  destroy() {
    petals = []
  },
}
