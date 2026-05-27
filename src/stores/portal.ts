import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const STORAGE_KEY = 'portal-config-v1'

export type GradientDirection = 'to right' | 'to left' | 'to top' | 'to bottom' | 'to top right' | 'to top left' | 'to bottom right' | 'to bottom left' | '-45deg' | '45deg'

export type CardColor = 'blue' | 'emerald' | 'amber' | 'rose' | 'purple' | 'indigo' | 'cyan' | 'orange'

export interface CustomCard {
  id: string
  title: string
  description: string
  url: string
  color: CardColor
  iconPath: string
}

export interface BackgroundConfig {
  type: 'gradient' | 'solid' | 'image'
  gradientFrom: string
  gradientTo: string
  gradientDirection: GradientDirection
  gradientAnimated: boolean
  solidColor: string
  imageUrl: string
}

export interface SectionConfig {
  id: string
  name: string
  enabled: boolean
  order: number
}

export interface PortalConfig {
  background: BackgroundConfig
  sections: SectionConfig[]
  customCards: CustomCard[]
}

// 默认背景图路径：public/portal-bg.jpg，通过相对路径引用
// 用户可把任意图片放入 public/ 目录并在设置面板切换
const DEFAULT_IMAGE_URL = './portal-bg.jpg'

const defaultConfig: PortalConfig = {
  background: {
    type: 'image',
    gradientFrom: '#a18cd1',
    gradientTo: '#fbc2eb',
    gradientDirection: '-45deg',
    gradientAnimated: true,
    solidColor: '#f0f4f8',
    imageUrl: DEFAULT_IMAGE_URL,
  },
  sections: [
    { id: 'profileCard', name: '个人名片', enabled: true, order: 0 },
    { id: 'schoolStats', name: '学校统计', enabled: true, order: 1 },
    { id: 'schoolLinks', name: '快速链接', enabled: true, order: 2 },
    { id: 'identityCards', name: '身份卡片', enabled: true, order: 3 },
    { id: 'projectShowcase', name: '项目展示', enabled: true, order: 4 },
    { id: 'steamHub', name: '游戏时光', enabled: true, order: 5 },
    { id: 'skillsRadar', name: '技能雷达', enabled: true, order: 6 },
    { id: 'customCards', name: '自定义卡片', enabled: true, order: 7 },
    { id: 'siteDashboard', name: '底部状态栏', enabled: true, order: 8 },
  ],
  customCards: [],
}

function loadConfig(): PortalConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as PortalConfig
      const mergedBg = { ...defaultConfig.background, ...parsed.background }
      // 图片模式下若 URL 为空或空白，回退到默认图，避免显示空白背景
      if (mergedBg.type === 'image' && !mergedBg.imageUrl?.trim()) {
        mergedBg.imageUrl = DEFAULT_IMAGE_URL
      }
      return {
        background: mergedBg,
        sections: parsed.sections ?? defaultConfig.sections,
        customCards: parsed.customCards ?? defaultConfig.customCards,
      }
    }
  } catch {
    // 解析失败，回退到默认
  }
  return JSON.parse(JSON.stringify(defaultConfig))
}

function saveConfig(config: PortalConfig): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
}

const colorMap: Record<CardColor, { bg: string; text: string; darkText: string }> = {
  blue: { bg: 'rgba(59,130,246,0.2)', text: '#2563eb', darkText: '#60a5fa' },
  emerald: { bg: 'rgba(16,185,129,0.2)', text: '#059669', darkText: '#34d399' },
  amber: { bg: 'rgba(245,158,11,0.2)', text: '#d97706', darkText: '#fbbf24' },
  rose: { bg: 'rgba(244,63,94,0.2)', text: '#e11d48', darkText: '#fb7185' },
  purple: { bg: 'rgba(168,85,247,0.2)', text: '#7c3aed', darkText: '#a78bfa' },
  indigo: { bg: 'rgba(99,102,241,0.2)', text: '#4f46e5', darkText: '#818cf8' },
  cyan: { bg: 'rgba(6,182,212,0.2)', text: '#0891b2', darkText: '#22d3ee' },
  orange: { bg: 'rgba(249,115,22,0.2)', text: '#ea580c', darkText: '#fb923c' },
}

export function getCardColorClasses(color: CardColor): { bg: string; text: string; darkText: string } {
  return colorMap[color]
}

export const usePortalStore = defineStore('portal', () => {
  const config = ref<PortalConfig>(loadConfig())
  const settingsOpen = ref(false)

  const enabledSections = computed(() =>
    config.value.sections
      .filter((s) => s.enabled)
      .sort((a, b) => a.order - b.order),
  )

  const bgStyle = computed(() => {
    const bg = config.value.background
    switch (bg.type) {
      case 'gradient':
        return {
          background: `linear-gradient(${bg.gradientDirection}, ${bg.gradientFrom}, ${bg.gradientTo})`,
        }
      case 'solid':
        return { background: bg.solidColor }
      case 'image': {
        const url = bg.imageUrl?.trim() || DEFAULT_IMAGE_URL
        return { backgroundImage: `url(${url})`, backgroundSize: 'cover', backgroundPosition: 'center' }
      }
      default:
        return {}
    }
  })

  function updateBackground(updates: Partial<BackgroundConfig>) {
    Object.assign(config.value.background, updates)
    saveConfig(config.value)
  }

  function toggleSection(id: string) {
    const section = config.value.sections.find((s) => s.id === id)
    if (section) {
      section.enabled = !section.enabled
      saveConfig(config.value)
    }
  }

  function moveSection(id: string, direction: 'up' | 'down') {
    const sections = config.value.sections.filter((s) => s.enabled).sort((a, b) => a.order - b.order)
    const idx = sections.findIndex((s) => s.id === id)
    if (idx === -1) return

    const targetIdx = direction === 'up' ? idx - 1 : idx + 1
    if (targetIdx < 0 || targetIdx >= sections.length) return

    const temp = sections[idx].order
    sections[idx].order = sections[targetIdx].order
    sections[targetIdx].order = temp

    saveConfig(config.value)
  }

  function addCustomCard(card: Omit<CustomCard, 'id'>) {
    const id = `custom-${Date.now()}`
    config.value.customCards.push({ ...card, id })
    saveConfig(config.value)
  }

  function removeCustomCard(id: string) {
    config.value.customCards = config.value.customCards.filter((c) => c.id !== id)
    saveConfig(config.value)
  }

  function updateCustomCard(id: string, updates: Partial<CustomCard>) {
    const card = config.value.customCards.find((c) => c.id === id)
    if (card) {
      Object.assign(card, updates)
      saveConfig(config.value)
    }
  }

  function resetConfig() {
    config.value = JSON.parse(JSON.stringify(defaultConfig))
    saveConfig(config.value)
  }

  function openSettings() {
    settingsOpen.value = true
  }

  function closeSettings() {
    settingsOpen.value = false
  }

  return {
    config,
    settingsOpen,
    enabledSections,
    bgStyle,
    updateBackground,
    toggleSection,
    moveSection,
    addCustomCard,
    removeCustomCard,
    updateCustomCard,
    resetConfig,
    openSettings,
    closeSettings,
  }
})
