<template>
  <div class="moments-section">
    <div v-if="momentStore.moments.length === 0" class="empty-state">
      <span class="empty-icon">💬</span>
      <p class="empty-text">暂无动态说说</p>
      <p class="empty-hint">记录你的生活点滴</p>
    </div>
    <div v-else class="moments-timeline">
      <div
        v-for="(moment, index) in momentStore.moments"
        :key="moment.id"
        class="moment-item"
        :class="{ last: index === momentStore.moments.length - 1 }"
      >
        <div class="moment-dot">
          <span v-if="moment.mood" class="mood-emoji">{{ moodEmoji(moment.mood) }}</span>
        </div>
        <div class="moment-card">
          <div class="moment-meta">
            <span class="moment-date">{{ formatDate(moment.date) }}</span>
            <span v-if="moment.mood" class="moment-mood">{{ moment.mood }}</span>
          </div>
          <p class="moment-content">{{ moment.content }}</p>
          <div v-if="moment.images?.length" class="moment-images">
            <div
              v-for="(img, i) in moment.images.slice(0, 4)"
              :key="i"
              class="moment-img-wrap"
              :class="{ more: i === 3 && moment.images.length > 4 }"
              @click="previewImages(moment.images, i)"
            >
              <img :src="img" class="moment-img" loading="lazy">
              <span v-if="i === 3 && moment.images.length > 4" class="more-badge">+{{ moment.images.length - 4 }}</span>
            </div>
          </div>
          <div v-if="moment.tags?.length" class="moment-tags">
            <span v-for="tag in moment.tags" :key="tag" class="tag">#{{ tag }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 图片预览 -->
    <el-image-viewer
      v-if="previewVisible"
      :url-list="previewList"
      :initial-index="previewIndex"
      @close="previewVisible = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMomentStore } from '@/stores/moments'

const momentStore = useMomentStore()
const previewVisible = ref(false)
const previewList = ref<string[]>([])
const previewIndex = ref(0)

function moodEmoji(mood: string): string {
  const map: Record<string, string> = {
    '开心': '😊',
    '满足': '😌',
    '疲惫': '😴',
    '兴奋': '🤩',
    '焦虑': '😰',
    '平静': '😶',
    '愤怒': '😠',
    '悲伤': '😢',
  }
  return map[mood] || '💭'
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (days === 0) {
    const hours = Math.floor(diff / (1000 * 60 * 60))
    if (hours === 0) return '刚刚'
    return `${hours}小时前`
  }
  if (days === 1) return '昨天'
  if (days < 7) return `${days}天前`
  if (days < 30) return `${Math.floor(days / 7)}周前`

  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}

function previewImages(images: string[], index: number) {
  previewList.value = images
  previewIndex.value = index
  previewVisible.value = true
}
</script>

<style scoped>
.moments-section { width: 100%; }

.moments-timeline {
  position: relative;
  padding-left: 1.5rem;
}

.moments-timeline::before {
  content: '';
  position: absolute;
  left: 0.4375rem;
  top: 0.5rem;
  bottom: 0.5rem;
  width: 2px;
  background: linear-gradient(to bottom, rgba(99, 102, 241, 0.3), rgba(236, 72, 153, 0.3));
  border-radius: 1px;
}

.moment-item {
  position: relative;
  padding-bottom: 1.25rem;
  display: flex;
  gap: 0.875rem;
}

.moment-item.last {
  padding-bottom: 0;
}

.moment-dot {
  position: absolute;
  left: -1.5rem;
  top: 0.25rem;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: rgba(99, 102, 241, 0.2);
  border: 2px solid rgba(99, 102, 241, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.mood-emoji {
  font-size: 0.625rem;
  line-height: 1;
}

.moment-card {
  flex: 1;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  transition: all 0.5s;
}

.dark .moment-card {
  background: rgba(30, 41, 59, 0.5);
  border-color: rgba(255, 255, 255, 0.1);
}

.moment-card:hover {
  transform: translateX(4px);
}

.moment-meta {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  margin-bottom: 0.5rem;
}

.moment-date {
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 600;
}

.moment-mood {
  font-size: 0.6875rem;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  background: rgba(99, 102, 241, 0.1);
  color: #6366f1;
  font-weight: 600;
}

.dark .moment-mood {
  background: rgba(99, 102, 241, 0.2);
  color: #818cf8;
}

.moment-content {
  font-size: 0.9375rem;
  line-height: 1.7;
  color: #0f172a;
  margin: 0 0 0.625rem;
  white-space: pre-wrap;
  word-wrap: break-word;
  transition: color 1s;
}

.dark .moment-content { color: #e2e8f0; }

.moment-images {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.375rem;
  margin-bottom: 0.625rem;
}

.moment-img-wrap {
  position: relative;
  border-radius: 0.5rem;
  overflow: hidden;
  aspect-ratio: 1;
  cursor: pointer;
}

.moment-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.moment-img-wrap:hover .moment-img {
  transform: scale(1.05);
}

.more-badge {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 1.125rem;
  font-weight: 700;
}

.moment-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag {
  font-size: 0.6875rem;
  color: #64748b;
  font-weight: 600;
  transition: color 1s;
}

.dark .tag { color: #94a3b8; }

/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
  text-align: center;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px dashed rgba(255, 255, 255, 0.4);
  transition: all 0.5s;
}

.dark .empty-state {
  background: rgba(30, 41, 59, 0.3);
  border-color: rgba(255, 255, 255, 0.1);
}

.empty-icon {
  font-size: 2rem;
  line-height: 1;
  margin-bottom: 0.75rem;
  opacity: 0.6;
}

.empty-text {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 0.25rem;
  transition: color 1s;
}

.dark .empty-text { color: #e2e8f0; }

.empty-hint {
  font-size: 0.8125rem;
  color: #94a3b8;
  margin: 0;
  transition: color 1s;
}
</style>
