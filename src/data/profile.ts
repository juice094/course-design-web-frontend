// 个人资料静态配置 —— 真实账号数据
// 集中管理所有社交链接、GitHub 项目、Steam 游戏数据

export const schoolInfo = {
  name: '甘肃农业大学',
  shortName: 'GSAU',
  enName: 'Gansu Agricultural University',
  website: 'https://www.gsau.edu.cn/',
  motto: '敦品励学，笃志允能',
  location: '甘肃省兰州市安宁区营门村1号',
  established: 1946,
} as const

export const socialLinks = {
  github: {
    url: 'https://github.com/juice094',
    username: 'juice094',
    avatar: 'https://avatars.githubusercontent.com/u/160722440?v=4',
    repos: 18,
    followers: 4,
  },
  steam: {
    url: 'https://steamcommunity.com/profiles/76561199284361018/',
    nickname: '今筱尤玖',
    formerName: '酒宿_juice',
    level: 109,
    games: 513,
    perfectGames: 230,
    achievements: 9969,
    avgCompletion: 80,
    recentHours: 32,
  },
  email: 'dev@gsau.edu.cn',
  qq: '1124533793',
} as const

export interface Project {
  name: string
  description: string
  url: string
  cover: string
  tags: string[]
  language: string
  stars: number
  forks: number
}

export const projects: Project[] = [
  {
    name: 'syncthing-rust',
    description: 'A Rust implementation of the Syncthing BEP protocol — 分布式文件同步协议的 Rust 原生实现。',
    url: 'https://github.com/juice094/syncthing-rust',
    cover: 'https://opengraph.githubassets.com/1/juice094/syncthing-rust',
    tags: ['Rust', 'P2P', 'Protocol'],
    language: 'Rust',
    stars: 1,
    forks: 0,
  },
  {
    name: 'clarity',
    description: 'Rust-native personal AI runtime — 面向开发者的个人 AI 运行时，本地优先架构。',
    url: 'https://github.com/juice094/clarity',
    cover: 'https://opengraph.githubassets.com/1/juice094/clarity',
    tags: ['Rust', 'AI', 'Runtime'],
    language: 'Rust',
    stars: 1,
    forks: 0,
  },
  {
    name: 'devbase',
    description: 'The open-source World Model Compiler for developer workspaces — 开发者工作空间的开放世界模型编译器。',
    url: 'https://github.com/juice094/devbase',
    cover: 'https://opengraph.githubassets.com/1/juice094/devbase',
    tags: ['Rust', 'Compiler', 'DevTools'],
    language: 'Rust',
    stars: 0,
    forks: 0,
  },
  {
    name: 'Personal-Blog-Glass',
    description: '采用 Next.js 构建的高颜值、毛玻璃风格个人博客系统 — 即当前 Portal 页面的风格参考来源。',
    url: 'https://github.com/juice094/Personal-Blog-Glass',
    cover: 'https://opengraph.githubassets.com/1/juice094/Personal-Blog-Glass',
    tags: ['Next.js', 'TypeScript', 'Glassmorphism'],
    language: 'TypeScript',
    stars: 0,
    forks: 0,
  },
  {
    name: 'agri-paper',
    description: 'Domain-as-Config prototype: adapts Clarity to agricultural pest/disease diagnosis — 农业病虫害诊断领域适配原型。',
    url: 'https://github.com/juice094/agri-paper',
    cover: 'https://opengraph.githubassets.com/1/juice094/agri-paper',
    tags: ['Python', 'AI', 'Agriculture'],
    language: 'Python',
    stars: 0,
    forks: 0,
  },
  {
    name: 'course-design-canvas-game',
    description: '2026 Spring 课程设计 - 游戏组：HTML5 Canvas 英雄抓怪物小游戏 — 甘肃农业大学课程设计作品。',
    url: 'https://github.com/juice094/course-design-canvas-game',
    cover: 'https://opengraph.githubassets.com/1/juice094/course-design-canvas-game',
    tags: ['JavaScript', 'Canvas', 'Game'],
    language: 'JavaScript',
    stars: 0,
    forks: 0,
  },
]

export interface SteamGame {
  name: string
  hours: string
  progress: number
  cover: string
  appId?: number
}

export const recentGames: SteamGame[] = [
  {
    name: 'Monster Hunter Stories 3: Twisted Reflection',
    hours: '30',
    progress: 25,
    cover: 'https://cdn.akamai.steamstatic.com/steam/apps/2768440/header.jpg',
    appId: 2768440,
  },
  {
    name: 'Two Point Museum',
    hours: '0.5',
    progress: 2,
    cover: 'https://cdn.akamai.steamstatic.com/steam/apps/3189830/header.jpg',
    appId: 3189830,
  },
  {
    name: 'PRAGMATA',
    hours: '0.1',
    progress: 1,
    cover: 'https://cdn.akamai.steamstatic.com/steam/apps/2291850/header.jpg',
    appId: 2291850,
  },
]

export const steamStats = {
  totalGames: 513,
  perfectGames: 230,
  totalAchievements: 9969,
  avgCompletion: 80,
  recentHours: 32,
} as const

export const gameTags = [
  'Arknights',
  'Monster Hunter',
  'Elden Ring',
  'Hollow Knight',
  'Stardew Valley',
  'CS2',
  'RimWorld',
  'Factorio',
] as const
