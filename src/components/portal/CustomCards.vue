<template>
  <div class="section">
    <div class="section-header">
      <div class="section-icon" :style="{ background: 'rgba(99,102,241,0.2)' }">
        <svg class="icon-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </div>
      <h2 class="section-title">自定义链接</h2>
    </div>

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
          <svg class="custom-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" :d="card.iconPath" />
          </svg>
        </div>
        <div class="custom-info">
          <h4 class="custom-name">{{ card.title }}</h4>
          <p class="custom-desc">{{ card.description }}</p>
        </div>
        <svg class="custom-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
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
</style>
