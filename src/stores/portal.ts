import { ref, computed, readonly } from 'vue'
import { defineStore } from 'pinia'
import defaultBg from '@/assets/portal-bg.jpg'
import { schoolInfo } from '@/data/profile'
import { createPersistPlugin } from '@/shared/persist/plugin'
import type { CardColor, CustomCard, BackgroundConfig, SectionConfig, SectionSize, PortalConfig, IdentityCardLinksConfig, IdentityCardLink } from '@/types/portal'
export type { CardColor, CustomCard, BackgroundConfig, SectionConfig, SectionSize, PortalConfig, IdentityCardLinksConfig, IdentityCardLink } from '@/types/portal'

const STORAGE_KEY = 'portal-config-v1'

// Vite 处理后的默认背景图 URL，开发和生产环境路径自动正确
const DEFAULT_IMAGE_URL = defaultBg

const defaultIdentityCardLinks: IdentityCardLinksConfig = {
  student: {
    internalUrl: '/#/login',
    externalUrl: schoolInfo.website,
    customUrl: '',
  },
  teacher: {
    internalUrl: '/#/login',
    externalUrl: schoolInfo.website,
    customUrl: '',
  },
  developer: {
    internalUrl: '/#/login',
    externalUrl: schoolInfo.website,
    customUrl: '',
  },
}

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
    { id: 'profileCard', name: '个人名片', enabled: true, order: 0, size: 'full' },
    { id: 'schoolStats', name: '学校统计', enabled: true, order: 1, size: 'half' },
    { id: 'schoolLinks', name: '快速链接', enabled: true, order: 2, size: 'half' },
    { id: 'courseSchedule', name: '课程表', enabled: false, order: 3, size: 'full' },
    { id: 'identityCards', name: '身份卡片', enabled: true, order: 4, size: 'full' },
    { id: 'articlesSection', name: '文章展示', enabled: true, order: 5, size: 'full' },
    { id: 'achievementsTimeline', name: '获奖成就', enabled: true, order: 6, size: 'half' },
    { id: 'projectShowcase', name: '项目展示', enabled: true, order: 7, size: 'half' },
    { id: 'steamHub', name: '游戏时光', enabled: true, order: 8, size: 'half' },
    { id: 'skillsRadar', name: '技能雷达', enabled: true, order: 9, size: 'half' },
    { id: 'momentsFeed', name: '动态说说', enabled: true, order: 10, size: 'full' },
    { id: 'photoWall', name: '照片墙', enabled: true, order: 11, size: 'full' },
    { id: 'customCards', name: '自定义卡片', enabled: true, order: 12, size: 'full' },
    { id: 'siteDashboard', name: '底部状态栏', enabled: true, order: 13, size: 'full' },
  ],
  customCards: [],
  identityCardLinks: defaultIdentityCardLinks,
}

function mergeSections(saved: SectionConfig[] | undefined): SectionConfig[] {
  const base = JSON.parse(JSON.stringify(defaultConfig.sections)) as SectionConfig[]
  if (!saved) return base

  const merged = base.map((section) => {
    const existing = saved.find((s) => s.id === section.id)
    return existing ? { ...section, enabled: existing.enabled, order: existing.order, size: existing.size || section.size } : section
  })

  const customSections = saved.filter((s) => !base.find((b) => b.id === s.id))
  return [...merged, ...customSections]
}

function loadConfig(): PortalConfig {
  const saved = persistPlugin.load()
  const mergedBg = { ...defaultConfig.background, ...saved.background }
  // 图片模式下若 URL 为空或空白，回退到默认图，避免显示空白背景
  if (mergedBg.type === 'image' && !mergedBg.imageUrl?.trim()) {
    mergedBg.imageUrl = DEFAULT_IMAGE_URL
  }
  return {
    background: mergedBg,
    sections: mergeSections(saved.sections),
    customCards: saved.customCards ?? defaultConfig.customCards,
    identityCardLinks: {
      ...defaultIdentityCardLinks,
      ...saved.identityCardLinks,
    },
  }
}

function saveConfig(config: PortalConfig): void {
  persistPlugin.save(config)
}

const persistPlugin = createPersistPlugin<PortalConfig>({
  key: STORAGE_KEY,
  fallback: () => JSON.parse(JSON.stringify(defaultConfig)),
})

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
  const _config = ref<PortalConfig>(loadConfig())
  const config = readonly(_config)
  const _settingsOpen = ref(false)
  const settingsOpen = readonly(_settingsOpen)

  const enabledSections = computed(() =>
    _config.value.sections
      .filter((s) => s.enabled)
      .sort((a, b) => a.order - b.order),
  )

  const bgStyle = computed(() => {
    const bg = _config.value.background
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
    Object.assign(_config.value.background, updates)
    saveConfig(_config.value)
  }

  function toggleSection(id: string) {
    const section = _config.value.sections.find((s) => s.id === id)
    if (section) {
      section.enabled = !section.enabled
      saveConfig(_config.value)
    }
  }

  function moveSection(id: string, direction: 'up' | 'down') {
    const sections = _config.value.sections.filter((s) => s.enabled).sort((a, b) => a.order - b.order)
    const idx = sections.findIndex((s) => s.id === id)
    if (idx === -1) return

    const targetIdx = direction === 'up' ? idx - 1 : idx + 1
    if (targetIdx < 0 || targetIdx >= sections.length) return

    const temp = sections[idx].order
    sections[idx].order = sections[targetIdx].order
    sections[targetIdx].order = temp

    saveConfig(_config.value)
  }

  function reorderSections(newOrder: string[]) {
    newOrder.forEach((id, index) => {
      const section = _config.value.sections.find((s) => s.id === id)
      if (section) section.order = index
    })
    saveConfig(_config.value)
  }

  function updateSectionSize(id: string, size: SectionSize) {
    const section = _config.value.sections.find((s) => s.id === id)
    if (section) {
      section.size = size
      saveConfig(_config.value)
    }
  }

  function addCustomCard(card: Omit<CustomCard, 'id'>) {
    const id = `custom-${Date.now()}`
    _config.value.customCards.push({ ...card, id })
    saveConfig(_config.value)
  }

  function removeCustomCard(id: string) {
    _config.value.customCards = _config.value.customCards.filter((c) => c.id !== id)
    saveConfig(_config.value)
  }

  function updateCustomCard(id: string, updates: Partial<CustomCard>) {
    const card = _config.value.customCards.find((c) => c.id === id)
    if (card) {
      Object.assign(card, updates)
      saveConfig(_config.value)
    }
  }

  function updateIdentityCardLink(
    card: keyof IdentityCardLinksConfig,
    field: keyof IdentityCardLink,
    value: string,
  ) {
    _config.value.identityCardLinks[card][field] = value
    saveConfig(_config.value)
  }

  function resetIdentityCardLinks() {
    _config.value.identityCardLinks = JSON.parse(JSON.stringify(defaultIdentityCardLinks))
    saveConfig(_config.value)
  }

  function resetConfig() {
    _config.value = JSON.parse(JSON.stringify(defaultConfig))
    saveConfig(_config.value)
  }

  function openSettings() {
    _settingsOpen.value = true
  }

  function closeSettings() {
    _settingsOpen.value = false
  }

  return {
    config,
    settingsOpen,
    enabledSections,
    bgStyle,
    updateBackground,
    toggleSection,
    moveSection,
    reorderSections,
    updateSectionSize,
    addCustomCard,
    removeCustomCard,
    updateCustomCard,
    updateIdentityCardLink,
    resetIdentityCardLinks,
    resetConfig,
    openSettings,
    closeSettings,
  }
})
