<template>
  <div class="section">
    <div class="section-header">
      <div class="section-icon" :style="{ background: 'rgba(99,102,241,0.2)' }">
        <Plus class="icon-svg" :size="16" />
      </div>
      <h2 class="section-title">自定义链接</h2>
    </div>

    <template v-if="cards.length > 0">
      <div class="custom-grid">
        <a
          v-for="card in cards"
          :key="card.id"
          :href="card.url"
          target="_blank"
          rel="noopener noreferrer"
          class="custom-card"
          :style="{ '--card-bg': getCardColorClasses(card.color).bg, '--card-text': getCardColorClasses(card.color).text }"
        >
          <div class="custom-icon" :style="{ background: getCardColorClasses(card.color).bg, color: getCardColorClasses(card.color).text }">
            <Link class="custom-svg" :size="20" />
          </div>
          <div class="custom-info">
            <h4 class="custom-name">{{ card.title }}</h4>
            <p class="custom-desc">{{ card.description }}</p>
          </div>
          <ChevronRight class="custom-arrow" :size="16" />
        </a>
      </div>
    </template>

    <div v-else class="empty-state">
      <span class="empty-icon">🔗</span>
      <p class="empty-text">暂无自定义链接</p>
      <p class="empty-hint">在页面设置中添加常用链接</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Link, ChevronRight } from 'lucide-vue-next'
import { usePortalStore, getCardColorClasses } from '@/stores/portal'

const portalStore = usePortalStore()
const cards = computed(() => portalStore.config.customCards)
</script>

<script lang="ts">
import { computed } from 'vue'
</script>

<style scoped>
.section { width: 100%; }

.section-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.section-icon {
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-svg {
  width: 1rem;
  height: 1rem;
  color: #4f46e5;
}

.dark .icon-svg { color: #818cf8; }

.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
  font-family: 'Noto Serif SC', serif;
  margin: 0;
  transition: color 1s;
}

.dark .section-title { color: #fff; }

.custom-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

@media (min-width: 768px) {
  .custom-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
}

@media (min-width: 1024px) {
  .custom-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.custom-card {
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  transition: all 0.5s;
}

.dark .custom-card {
  background: rgba(30, 41, 59, 0.5);
  border-color: rgba(255, 255, 255, 0.1);
}

.custom-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15);
}

.custom-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.custom-svg { width: 1.25rem; height: 1.25rem; }

.custom-info { flex: 1; min-width: 0; }

.custom-name {
  font-size: 0.875rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
  transition: color 1s;
}

.dark .custom-name { color: #fff; }

.custom-desc {
  font-size: 0.6875rem;
  color: #64748b;
  margin: 0.125rem 0 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 1s;
}

.dark .custom-desc { color: #94a3b8; }

.custom-arrow {
  width: 1rem;
  height: 1rem;
  color: #94a3b8;
  transition: all 0.3s;
  flex-shrink: 0;
}

.custom-card:hover .custom-arrow {
  color: #6366f1;
  transform: translateX(2px);
}

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
