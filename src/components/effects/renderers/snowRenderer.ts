import type { ParticleRenderer, ParticleDensity } from './types'
import { densityMap } from './density'

interface Snowflake {
  char: string
  x: number
  y: number
  size: number
  fallSpeed: number
  swayPhase: number
  swaySpeed: number
  opacity: number
  rotation: number
  rotationSpeed: number
}

const SNOW_CHARS = ['❄', '❅', '❆']

let flakes: Snowflake[] = []

export const snowRenderer: ParticleRenderer = {
  name: 'snow',

  init(_ctx, width, _height, density) {
    const count = densityMap.snow[density]
    flakes = Array.from({ length: count }, () => ({
      char: SNOW_CHARS[Math.floor(Math.random() * SNOW_CHARS.length)],
      x: Math.random() * width,
      y: Math.random() * -100,
      size: 10 + Math.random() * 14,
      fallSpeed: 30 + Math.random() * 50,
      swayPhase: Math.random() * Math.PI * 2,
      swaySpeed: 0.8 + Math.random() * 1.5,
      opacity: 0.25 + Math.random() * 0.4,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 3,
    }))
  },

  render(ctx, width, height, dt) {
    for (const f of flakes) {
      f.y += f.fallSpeed * dt
      f.swayPhase += f.swaySpeed * dt
      f.x += Math.sin(f.swayPhase) * 10 * dt
      f.rotation += f.rotationSpeed * dt

      if (f.y > height + 20) {
        f.y = -20
        f.x = Math.random() * width
      }
      if (f.x < -20) f.x = width + 20
      if (f.x > width + 20) f.x = -20

      ctx.save()
      ctx.translate(f.x, f.y)
      ctx.rotate(f.rotation)
      ctx.font = `${f.size}px sans-serif`
      ctx.fillStyle = `rgba(255, 255, 255, ${f.opacity})`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      // 雪花阴影增加立体感
      ctx.shadowColor = 'rgba(255, 255, 255, 0.6)'
      ctx.shadowBlur = 4
      ctx.fillText(f.char, 0, 0)
      ctx.shadowBlur = 0

      ctx.restore()
    }
  },

  resize(width, _height) {
    for (const f of flakes) {
      if (f.x > width) f.x = Math.random() * width
    }
  },

  destroy() {
    flakes = []
  },
}
