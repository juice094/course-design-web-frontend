import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import type { Photo, PhotoCategory } from '@/types/content'
export type { Photo, PhotoCategory } from '@/types/content'

const STORAGE_KEY = 'portal-photos-v1'

const demoPhotos: Photo[] = [
  {
    id: 'demo-1',
    url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800',
    title: '校园秋景',
    description: '图书馆前的银杏大道',
    category: 'campus',
    date: '2025-10-20',
  },
  {
    id: 'demo-2',
    url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
    title: '代码之夜',
    description: '熬夜调试 syncthing-rust',
    category: 'project',
    date: '2026-01-15',
  },
  {
    id: 'demo-3',
    url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800',
    title: '游戏桌面',
    description: '新到的机械键盘和显示器',
    category: 'life',
    date: '2026-02-10',
  },
]

function loadPhotos(): Photo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as Photo[]
  } catch {
    // ignore
  }
  return JSON.parse(JSON.stringify(demoPhotos))
}

function savePhotos(photos: Photo[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(photos))
}

export const usePhotoStore = defineStore('photos', () => {
  const photos = ref<Photo[]>(loadPhotos())
  const activeCategory = ref<PhotoCategory | 'all'>('all')

  const filteredPhotos = computed(() => {
    if (activeCategory.value === 'all') return photos.value
    return photos.value.filter(p => p.category === activeCategory.value)
  })

  function addPhoto(item: Omit<Photo, 'id' | 'date'>) {
    const id = `photo-${Date.now()}`
    const date = new Date().toISOString().split('T')[0]
    photos.value.unshift({ ...item, id, date })
    savePhotos(photos.value)
  }

  function removePhoto(id: string) {
    photos.value = photos.value.filter(p => p.id !== id)
    savePhotos(photos.value)
  }

  function updatePhoto(id: string, updates: Partial<Photo>) {
    const photo = photos.value.find(p => p.id === id)
    if (photo) {
      Object.assign(photo, updates)
      savePhotos(photos.value)
    }
  }

  function setCategory(cat: PhotoCategory | 'all') {
    activeCategory.value = cat
  }

  function resetToDemo() {
    photos.value = JSON.parse(JSON.stringify(demoPhotos))
    savePhotos(photos.value)
  }

  return {
    photos,
    activeCategory,
    filteredPhotos,
    addPhoto,
    removePhoto,
    updatePhoto,
    setCategory,
    resetToDemo,
  }
})
