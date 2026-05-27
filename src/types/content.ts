export interface CourseItem {
  id: string
  name: string
  teacher: string
  location: string
  day: 1 | 2 | 3 | 4 | 5 | 6 | 7
  startSlot: number
  endSlot: number
  color: string
  weekPattern: string
}

export type ScheduleVisibility = 'public' | 'private' | 'whitelist'

export interface ScheduleConfig {
  courses: CourseItem[]
  semester: string
  maxSlots: number
  visibility: ScheduleVisibility
  whitelist: string[]
}

export type ArticleCategory = 'paper' | 'article' | 'tutorial' | 'note'

export interface Article {
  id: string
  title: string
  description: string
  content: string
  cover?: string
  tags: string[]
  date: string
  category: ArticleCategory
  published: boolean
  url?: string
}

export type PhotoCategory = 'campus' | 'project' | 'life' | 'certificate'

export interface Photo {
  id: string
  url: string
  thumbnail?: string
  title: string
  description?: string
  category: PhotoCategory
  date: string
}

export interface Moment {
  id: string
  content: string
  images?: string[]
  tags?: string[]
  date: string
  mood?: string
}

export type AchievementLevel = 'national' | 'provincial' | 'school' | 'other'

export interface Achievement {
  id: string
  title: string
  level: AchievementLevel
  date: string
  description?: string
  certificateUrl?: string
}
