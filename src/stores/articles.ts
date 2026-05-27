import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const STORAGE_KEY = 'portal-articles-v1'

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

const demoArticles: Article[] = [
  {
    id: 'demo-1',
    title: '基于 Rust 的分布式文件同步协议实现',
    description: '本文探讨了 Syncthing BEP 协议的 Rust 原生实现方案，包括 Block Exchange Protocol 的消息序列化、设备发现机制和冲突解决策略。',
    content: '# 基于 Rust 的分布式文件同步协议实现\n\n## 摘要\n\n本文探讨了 Syncthing BEP 协议的 Rust 原生实现方案...',
    cover: 'https://opengraph.githubassets.com/1/juice094/syncthing-rust',
    tags: ['Rust', 'P2P', 'Protocol', '论文'],
    date: '2026-03-15',
    category: 'paper',
    published: true,
    url: 'https://github.com/juice094/syncthing-rust',
  },
  {
    id: 'demo-2',
    title: 'Vue 3 Composition API 实践总结',
    description: '在教务系统前端重构过程中积累的 Composition API 使用经验，涵盖响应式原理、逻辑复用模式以及与 Options API 的对比分析。',
    content: '# Vue 3 Composition API 实践总结\n\n## 背景\n\n在教务系统前端重构过程中...',
    tags: ['Vue 3', 'TypeScript', '前端'],
    date: '2026-04-20',
    category: 'article',
    published: true,
  },
]

function loadArticles(): Article[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as Article[]
  } catch {
    // ignore
  }
  return JSON.parse(JSON.stringify(demoArticles))
}

function saveArticles(articles: Article[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(articles))
}

export const useArticleStore = defineStore('articles', () => {
  const articles = ref<Article[]>(loadArticles())
  const activeCategory = ref<ArticleCategory | 'all'>('all')

  const filteredArticles = computed(() => {
    if (activeCategory.value === 'all') return articles.value
    return articles.value.filter(a => a.category === activeCategory.value)
  })

  const publishedArticles = computed(() =>
    filteredArticles.value.filter(a => a.published),
  )

  function addArticle(item: Omit<Article, 'id' | 'date'>) {
    const id = `article-${Date.now()}`
    const date = new Date().toISOString().split('T')[0]
    articles.value.unshift({ ...item, id, date })
    saveArticles(articles.value)
  }

  function removeArticle(id: string) {
    articles.value = articles.value.filter(a => a.id !== id)
    saveArticles(articles.value)
  }

  function updateArticle(id: string, updates: Partial<Article>) {
    const article = articles.value.find(a => a.id === id)
    if (article) {
      Object.assign(article, updates)
      saveArticles(articles.value)
    }
  }

  function setCategory(cat: ArticleCategory | 'all') {
    activeCategory.value = cat
  }

  function resetToDemo() {
    articles.value = JSON.parse(JSON.stringify(demoArticles))
    saveArticles(articles.value)
  }

  return {
    articles,
    activeCategory,
    filteredArticles,
    publishedArticles,
    addArticle,
    removeArticle,
    updateArticle,
    setCategory,
    resetToDemo,
  }
})
