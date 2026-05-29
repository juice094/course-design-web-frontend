export type ParticleDensity = 'low' | 'medium' | 'high'

export interface ParticleRenderer {
  name: string
  init(ctx: CanvasRenderingContext2D, width: number, height: number, density: ParticleDensity): void
  render(ctx: CanvasRenderingContext2D, width: number, height: number, deltaTime: number): void
  resize(width: number, height: number): void
  destroy(): void
}
