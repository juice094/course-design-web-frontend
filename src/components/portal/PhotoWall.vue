<template>
  <div class="photos-section">
    <!-- 分类筛选 -->
    <div class="filter-tabs">
      <button
        v-for="cat in categories"
        :key="cat.value"
        class="filter-btn"
        :class="{ active: photoStore.activeCategory === cat.value }"
        @click="photoStore.setCategory(cat.value)"
      >
        {{ cat.label }}
      </button>
    </div>

    <!-- 照片网格 -->
    <div class="photos-grid">
      <div
        v-for="photo in photoStore.filteredPhotos"
        :key="photo.id"
        class="photo-item"
        @click="previewImage(photo)"
      >
        <img :src="photo.url" :alt="photo.title" class="photo-img" loading="lazy">
        <div class="photo-overlay">
          <h4 class="photo-title">{{ photo.title }}</h4>
          <span class="photo-date">{{ photo.date }}</span>
        </div>
      </div>
    </div>

    <!-- Element Plus 图片预览 -->
    <el-image-viewer
      v-if="previewVisible"
      :url-list="previewUrls"
      :initial-index="previewIndex"
      @close="previewVisible = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePhotoStore, type Photo } from '@/stores/photos'

const photoStore = usePhotoStore()
const previewVisible = ref(false)
const previewIndex = ref(0)

const categories = [
  { value: 'all' as const, label: '全部' },
  { value: 'campus' as const, label: '校园' },
  { value: 'project' as const, label: '项目' },
  { value: 'life' as const, label: '生活' },
  { value: 'certificate' as const, label: '证书' },
]

const previewUrls = computed(() =>
  photoStore.filteredPhotos.map(p => p.url),
)

function previewImage(photo: Photo) {
  const idx = photoStore.filteredPhotos.findIndex(p => p.id === photo.id)
  previewIndex.value = idx >= 0 ? idx : 0
  previewVisible.value = true
}
</script>

<style scoped>
.photos-section { width: 100%; }

.filter-tabs {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.filter-btn {
  padding: 0.375rem 0.875rem;
  border-radius: 9999px;
  font-size: 0.8125rem;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #475569;
  cursor: pointer;
  transition: all 0.3s;
}

.dark .filter-btn {
  background: rgba(51, 65, 85, 0.4);
  border-color: rgba(255, 255, 255, 0.1);
  color: #cbd5e1;
}

.filter-btn:hover {
  background: rgba(99, 102, 241, 0.15);
  color: #6366f1;
}

.filter-btn.active {
  background: #6366f1;
  color: #fff;
  border-color: #6366f1;
}

.dark .filter-btn.active {
  background: #4f46e5;
  border-color: #4f46e5;
}

.photos-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

@media (min-width: 768px) {
  .photos-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
}

@media (min-width: 1024px) {
  .photos-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.photo-item {
  position: relative;
  border-radius: 0.875rem;
  overflow: hidden;
  aspect-ratio: 1;
  cursor: pointer;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.5s;
}

.photo-item:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
}

.photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s;
}

.photo-item:hover .photo-img {
  transform: scale(1.08);
}

.photo-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 60%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0.75rem;
  opacity: 0;
  transition: opacity 0.3s;
}

.photo-item:hover .photo-overlay {
  opacity: 1;
}

.photo-title {
  font-size: 0.875rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 0.125rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.photo-date {
  font-size: 0.6875rem;
  color: rgba(255, 255, 255, 0.8);
}
</style>
