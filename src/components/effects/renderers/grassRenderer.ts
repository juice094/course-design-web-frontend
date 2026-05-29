import type { ParticleRenderer, ParticleDensity } from './types'
import { densityMap } from './density'

interface Blade {
  x: number
  height: number
  width: number
  swayPhase: number
  swaySpeed: number
  opacity: number
  curveDir: number
}

let blades: Blade[] = []

export const grassRenderer: ParticleRenderer = {
  name: 'grass',

  init(_ctx, width, height, density) {
    const count = densityMap.grass[density]
    blades = Array.from({ length: count }, (_, i) => ({
      x: (i / count) * width + (Math.random() - 0.5) * (width / count) * 0.8,
      height: 20 + Math.random() * 50,
      width: 1 + Math.random() * 2,
      swayPhase: Math.random() * Math.PI * 2,
      swaySpeed: 1.5 + Math.random() * 2.5,
      opacity: 0.15 + Math.random() * 0.35,
      curveDir: Math.random() > 0.5 ? 1 : -1,
    }))
  },

  render(ctx, _width, height, dt) {
    for (const b of blades) {
      b.swayPhase += b.swaySpeed * dt
      const sway = Math.sin(b.swayPhase) * 8 * b.curveDir

      const baseY = height
      const tipX = b.x + sway
      const tipY = baseY - b.height
      const cpX = b.x + sway * 0.5
      const cpY = baseY - b.height * 0.6

      const gradient = ctx.createLinearGradient(b.x, baseY, tipX, tipY)
      gradient.addColorStop(0, `rgba(16, 185, 129, ${b.opacity * 0.9})`)
      gradient.addColorStop(1, `rgba(16, 185, 129, 0)`)

      ctx.strokeStyle = gradient
      ctx.lineWidth = b.width
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.moveTo(b.x, baseY)
      ctx.quadraticCurveTo(cpX, cpY, tipX, tipY)
      ctx.stroke()
    }
  },

  resize(width, _height) {
    const count = blades.length
    for (let i = 0; i < count; i++) {
      blades[i].x = (i / count) * width + (Math.random() - 0.5) * (width / count) * 0.8
    }
  },

  destroy() {
    blades = []
  },
}
