import { ref, computed, readonly } from 'vue'
import { defineStore } from 'pinia'
import { createPersistPlugin } from '@/shared/persist/plugin'

export type EffectType = 'auto' | 'fireflies' | 'sakura' | 'grass' | 'snow' | 'danmaku' | 'none'
export type ParticleDensity = 'low' | 'medium' | 'high'

export interface EffectsConfig {
  enabled: boolean
  type: EffectType
  density: ParticleDensity
  powerSave: boolean
}

const STORAGE_KEY = 'portal-effects-v1'

const defaultConfig: EffectsConfig = {
  enabled: false, // 默认禁用，避免首次访问性能冲击
  type: 'auto',
  density: 'medium',
  powerSave: false,
}

const persistPlugin = createPersistPlugin<EffectsConfig>({
  key: STORAGE_KEY,
  fallback: () => ({ ...defaultConfig }),
})

function loadConfig(): EffectsConfig {
  const saved = persistPlugin.load()
  return { ...defaultConfig, ...saved }
}

function saveConfig(config: EffectsConfig): void {
  persistPlugin.save(config)
}

export const useEffectsStore = defineStore('effects', () => {
  const _config = ref<EffectsConfig>(loadConfig())
  const config = readonly(_config)

  const isEnabled = computed(() => _config.value.enabled)
  const activeType = computed(() => _config.value.type)
  const density = computed(() => _config.value.density)
  const isPowerSave = computed(() => _config.value.powerSave)

  function setEnabled(value: boolean) {
    _config.value.enabled = value
    saveConfig(_config.value)
  }

  function setType(type: EffectType) {
    _config.value.type = type
    saveConfig(_config.value)
  }

  function setDensity(d: ParticleDensity) {
    _config.value.density = d
    saveConfig(_config.value)
  }

  function setPowerSave(value: boolean) {
    _config.value.powerSave = value
    saveConfig(_config.value)
  }

  function reset() {
    _config.value = { ...defaultConfig }
    saveConfig(_config.value)
  }

  return {
    config,
    isEnabled,
    activeType,
    density,
    isPowerSave,
    setEnabled,
    setType,
    setDensity,
    setPowerSave,
    reset,
  }
})
