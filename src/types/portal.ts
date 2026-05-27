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

export interface IdentityCardLink {
  internalUrl: string
  externalUrl: string
  customUrl: string
}

export interface IdentityCardLinksConfig {
  student: IdentityCardLink
  teacher: IdentityCardLink
  developer: IdentityCardLink
}

export interface PortalConfig {
  background: BackgroundConfig
  sections: SectionConfig[]
  customCards: CustomCard[]
  identityCardLinks: IdentityCardLinksConfig
}
