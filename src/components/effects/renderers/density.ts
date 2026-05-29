import type { ParticleDensity } from './types'

export const densityMap: Record<string, Record<ParticleDensity, number>> = {
  fireflies: { low: 15, medium: 30, high: 50 },
  sakura:    { low: 12, medium: 25, high: 40 },
  grass:     { low: 40, medium: 80, high: 150 },
  danmaku:   { low: 6,  medium: 10, high: 15 },
  snow:      { low: 15, medium: 30, high: 40 },
}
