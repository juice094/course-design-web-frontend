import type { ParticleRenderer, ParticleDensity } from './types'
import { densityMap } from './density'

interface DanmakuItem {
  text: string
  x: number
  y: number
  speed: number
  opacity: number
}

const TEXTS = [
  '在干嘛呢？', '有笨蛋嘛？', '前方高能反应！',
  'GROMACS 跑起来了吗？', 'MD 模拟什么时候才能出图啊',
  'Graph Neural Networks 炼丹中...', 'BUG 修复进度 99%',
  '今天背单词了吗？', 'Tailwind CSS 拯救前端',
  '写算法中', '睡大觉中', '到底在干嘛？',
]

let items: DanmakuItem[] = []

export const danmakuRenderer: ParticleRenderer = {
  name: 'danmaku',

  init(_ctx, width, height, density) {
    const count = densityMap.danmaku[density]
    items = Array.from({ length: count }, () => ({
      text: TEXTS[Math.floor(Math.random() * TEXTS.length)],
      x: Math.random() * width + width * 0.5,
      y: 40 + Math.random() * (height * 0.3),
      speed: 60 + Math.random() * 80,
      opacity: 0.15 + Math.random() * 0.15,
    }))
  },

  render(ctx, width, height, dt) {
    ctx.font = 'bold 16px "Noto Serif SC", sans-serif'

    for (const item of items) {
      item.x -= item.speed * dt

      if (item.x < -ctx.measureText(item.text).width - 50) {
        item.x = width + 50 + Math.random() * 200
        item.y = 40 + Math.random() * (height * 0.3)
        item.text = TEXTS[Math.floor(Math.random() * TEXTS.length)]
      }

      ctx.fillStyle = `rgba(255, 255, 255, ${item.opacity})`
      ctx.fillText(item.text, item.x, item.y)
    }
  },

  resize(width, height) {
    for (const item of items) {
      if (item.x > width) item.x = width + Math.random() * 100
      if (item.y > height * 0.35) item.y = 40 + Math.random() * (height * 0.3)
    }
  },

  destroy() {
    items = []
  },
}
