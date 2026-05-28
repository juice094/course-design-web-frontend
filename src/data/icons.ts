/**
 * Portal 页面图标映射 —— 统一使用 lucide 图标名。
 * 避免在组件中直接写 lucide 组件名，集中维护便于批量替换。
 */
export const portalIcons = {
  student: 'GraduationCap',
  teacher: 'FlaskConical',
  developer: 'Code2',
  article: 'FileText',
  achievement: 'Trophy',
  project: 'FolderGit2',
  photo: 'Image',
  moment: 'MessageCircle',
  game: 'Gamepad2',
  schedule: 'CalendarDays',
  link: 'ExternalLink',
  settings: 'Settings',
  home: 'Home',
  user: 'User',
  book: 'BookOpen',
  chart: 'BarChart3',
  plus: 'Plus',
  calendar: 'CalendarDays',
  star: 'Star',
  document: 'FileText',
  info: 'Info',
  lock: 'Lock',
  mail: 'Mail',
  github: 'Github',
  arrowRight: 'ChevronRight',
  add: 'Plus',
  image: 'Image',
  tag: 'Tag',
  school: 'School',
} as const

export type PortalIconKey = keyof typeof portalIcons
