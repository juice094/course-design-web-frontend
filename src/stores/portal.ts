import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import defaultBg from '@/assets/portal-bg.jpg'
import { schoolInfo } from '@/data/profile'
import type { CardColor, CustomCard, BackgroundConfig, SectionConfig, PortalConfig, IdentityCardLinksConfig, IdentityCardLink } from '@/types/portal'
export type { CardColor, CustomCard, BackgroundConfig, SectionConfig, PortalConfig, IdentityCardLinksConfig, IdentityCardLink } from '@/types/portal'

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
    { id: 'profileCard', name: '个人名片', enabled: true, order: 0 },
    { id: 'schoolStats', name: '学校统计', enabled: true, order: 1 },
    { id: 'schoolLinks', name: '快速链接', enabled: true, order: 2 },
    { id: 'courseSchedule', name: '课程表', enabled: true, order: 3 },
    { id: 'identityCards', name: '身份卡片', enabled: true, order: 4 },
    { id: 'articlesSection', name: '文章展示', enabled: true, order: 5 },
    { id: 'achievementsTimeline', name: '获奖成就', enabled: true, order: 6 },
    { id: 'projectShowcase', name: '项目展示', enabled: true, order: 7 },
    { id: 'steamHub', name: '游戏时光', enabled: true, order: 8 },
    { id: 'skillsRadar', name: '技能雷达', enabled: true, order: 9 },
    { id: 'momentsFeed', name: '动态说说', enabled: true, order: 10 },
    { id: 'photoWall', name: '照片墙', enabled: true, order: 11 },
    { id: 'customCards', name: '自定义卡片', enabled: true, order: 12 },
    { id: 'siteDashboard', name: '底部状态栏', enabled: true, order: 13 },
  ],
  customCards: [],
  identityCardLinks: defaultIdentityCardLinks,
}

function mergeSections(saved: SectionConfig[] | undefined): SectionConfig[] {
  const base = JSON.parse(JSON.stringify(defaultConfig.sections)) as SectionConfig[]
  if (!saved) return base

  // 保留用户已有的 section 配置（enabled / order）
  const merged = base.map((section) => {
    const existing = saved.find((s) => s.id === section.id)
    return existing ? { ...section, enabled: existing.enabled, order: existing.order } : section
  })

  // 追加用户自定义的 section（如有）
  const customSections = saved.filter((s) => !base.find((b) => b.id === s.id))
  return [...merged, ...customSections]
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
        sections: mergeSections(parsed.sections),
        customCards: parsed.customCards ?? defaultConfig.customCards,
        identityCardLinks: {
          ...defaultIdentityCardLinks,
          ...parsed.identityCardLinks,
        },
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

  function updateIdentityCardLink(
    card: keyof IdentityCardLinksConfig,
    field: keyof IdentityCardLink,
    value: string,
  ) {
    config.value.identityCardLinks[card][field] = value
    saveConfig(config.value)
  }

  function resetIdentityCardLinks() {
    config.value.identityCardLinks = JSON.parse(JSON.stringify(defaultIdentityCardLinks))
    saveConfig(config.value)
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
    updateIdentityCardLink,
    resetIdentityCardLinks,
    resetConfig,
    openSettings,
    closeSettings,
  }
})
