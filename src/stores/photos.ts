import { ref, computed, readonly } from 'vue'
import { defineStore } from 'pinia'
import { createPersistPlugin } from '@/shared/persist/plugin'

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

const persistPlugin = createPersistPlugin<Photo[]>({
  key: STORAGE_KEY,
  fallback: () => JSON.parse(JSON.stringify(demoPhotos)),
})

export const usePhotoStore = defineStore('photos', () => {
  const _photos = ref<Photo[]>(persistPlugin.load())
  const photos = readonly(_photos)
  const _activeCategory = ref<PhotoCategory | 'all'>('all')
  const activeCategory = readonly(_activeCategory)

  const filteredPhotos = computed(() => {
    if (_activeCategory.value === 'all') return _photos.value
    return _photos.value.filter(p => p.category === _activeCategory.value)
  })

  function addPhoto(item: Omit<Photo, 'id' | 'date'>) {
    const id = `photo-${Date.now()}`
    const date = new Date().toISOString().split('T')[0]
    _photos.value.unshift({ ...item, id, date })
    persistPlugin.save(_photos.value)
  }

  function removePhoto(id: string) {
    _photos.value = _photos.value.filter(p => p.id !== id)
    persistPlugin.save(_photos.value)
  }

  function updatePhoto(id: string, updates: Partial<Photo>) {
    const photo = _photos.value.find(p => p.id === id)
    if (photo) {
      Object.assign(photo, updates)
      persistPlugin.save(_photos.value)
    }
  }

  function setCategory(cat: PhotoCategory | 'all') {
    _activeCategory.value = cat
  }

  function resetToDemo() {
    _photos.value = JSON.parse(JSON.stringify(demoPhotos))
    persistPlugin.save(_photos.value)
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
