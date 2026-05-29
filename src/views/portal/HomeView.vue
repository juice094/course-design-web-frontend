<template>
  <div class="home-view" :class="{ 'layout-editing': isEditing }">
    <!-- 编辑模式开关 -->
    <div class="layout-toolbar">
      <button class="edit-toggle" :class="{ active: isEditing }" @click="isEditing = !isEditing">
        <span v-if="isEditing">✓ 完成编辑</span>
        <span v-else>🎛 调整布局</span>
      </button>
      <span v-if="isEditing" class="edit-hint">拖拽卡片调整顺序，点击尺寸按钮改变宽度</span>
    </div>

    <!-- 卡片网格 -->
    <div
      class="card-grid"
      @dragover.prevent="onDragOver"
      @drop.prevent="onDrop"
    >
      <div
        v-for="section in enabledSections"
        :key="section.id"
        class="card-wrapper"
        :class="[`size-${section.size}`, { dragging: draggedId === section.id, 'edit-mode': isEditing }]"
        :style="{ order: section.order }"
        :draggable="isEditing"
        @dragstart="onDragStart(section.id, $event)"
        @dragend="onDragEnd"
        @dragenter.prevent="onDragEnter(section.id)"
      >
        <!-- 拖拽手柄 -->
        <div v-if="isEditing" class="drag-handle">
          <span class="drag-icon">⋮⋮</span>
          <span class="card-name">{{ section.name }}</span>
          <div class="size-controls">
            <button
              v-for="s in sizeOptions"
              :key="s.value"
              class="size-btn"
              :class="{ active: section.size === s.value }"
              :title="s.label"
              @click.stop="portalStore.updateSectionSize(section.id, s.value)"
            >
              {{ s.icon }}
            </button>
          </div>
        </div>

        <!-- 卡片内容 -->
        <component :is="componentMap[section.id]" v-if="componentMap[section.id]" />
        <div v-else class="missing-card">卡片 {{ section.id }} 未实现</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePortalStore } from '@/stores/portal'
import type { SectionSize } from '@/stores/portal'
import ProfileCard from '@/components/portal/ProfileCard.vue'
import SchoolStats from '@/components/portal/SchoolStats.vue'
import SchoolQuickLinks from '@/components/portal/SchoolQuickLinks.vue'
import IdentityCards from '@/components/portal/IdentityCards.vue'
import SkillsRadar from '@/components/portal/SkillsRadar.vue'
import SiteDashboard from '@/components/portal/SiteDashboard.vue'
import ArticlesSection from '@/components/portal/ArticlesSection.vue'
import AchievementsTimeline from '@/components/portal/AchievementsTimeline.vue'
import ProjectShowcase from '@/components/portal/ProjectShowcase.vue'
import SteamHub from '@/components/portal/SteamHub.vue'
import MomentsFeed from '@/components/portal/MomentsFeed.vue'
import PhotoWall from '@/components/portal/PhotoWall.vue'
import CustomCards from '@/components/portal/CustomCards.vue'

const portalStore = usePortalStore()

const isEditing = ref(false)
const draggedId = ref<string | null>(null)
const dragOverId = ref<string | null>(null)

const enabledSections = computed(() => portalStore.enabledSections)

const componentMap: Record<string, any> = {
  profileCard: ProfileCard,
  schoolStats: SchoolStats,
  schoolLinks: SchoolQuickLinks,
  identityCards: IdentityCards,
  skillsRadar: SkillsRadar,
  siteDashboard: SiteDashboard,
  articlesSection: ArticlesSection,
  achievementsTimeline: AchievementsTimeline,
  projectShowcase: ProjectShowcase,
  steamHub: SteamHub,
  momentsFeed: MomentsFeed,
  photoWall: PhotoWall,
  customCards: CustomCards,
}

const sizeOptions = [
  { value: 'full' as SectionSize, label: '全宽', icon: '▭' },
  { value: 'half' as SectionSize, label: '半宽', icon: '▭▭' },
  { value: 'third' as SectionSize, label: '三分之一', icon: '▭▭▭' },
  { value: 'quarter' as SectionSize, label: '四分之一', icon: '▭▭▭▭' },
]

function onDragStart(id: string, e: DragEvent) {
  draggedId.value = id
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', id)
  }
}

function onDragEnd() {
  draggedId.value = null
  dragOverId.value = null
}

function onDragEnter(id: string) {
  if (!isEditing.value || !draggedId.value || draggedId.value === id) return
  dragOverId.value = id
}

function onDragOver(e: DragEvent) {
  e.preventDefault()
  if (e.dataTransfer) {
    e.dataTransfer.dropEffect = 'move'
  }
}

function onDrop(e: DragEvent) {
  e.preventDefault()
  const fromId = e.dataTransfer?.getData('text/plain')
  if (!fromId || !dragOverId.value || fromId === dragOverId.value) return

  const sections = [...enabledSections.value]
  const fromIdx = sections.findIndex((s) => s.id === fromId)
  const toIdx = sections.findIndex((s) => s.id === dragOverId.value)

  if (fromIdx === -1 || toIdx === -1) return

  // Reorder: move fromId to position of toId
  const newOrder = sections.map((s) => s.id)
  newOrder.splice(fromIdx, 1)
  newOrder.splice(toIdx, 0, fromId)

  portalStore.reorderSections(newOrder)
  dragOverId.value = null
  draggedId.value = null
}
</script>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.layout-toolbar {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0;
}

.edit-toggle {
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.2);
  color: var(--text-primary, #333);
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.3s;
  backdrop-filter: blur(8px);
}

.edit-toggle:hover {
  background: rgba(255, 255, 255, 0.4);
}

.edit-toggle.active {
  background: rgba(26, 95, 42, 0.8);
  color: #fff;
  border-color: rgba(26, 95, 42, 0.5);
}

.edit-hint {
  font-size: 0.75rem;
  color: var(--text-secondary, #666);
  opacity: 0.8;
}

/* 卡片网格 - 12列系统 */
.card-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.5rem;
  align-items: stretch;
}

.card-wrapper {
  grid-column: span 12;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  flex-direction: column;
}

.card-wrapper > * {
  flex: 1 1 auto;
  min-height: 0;
  width: 100%;
}

.card-wrapper > .drag-handle {
  flex: 0 0 auto;
  min-height: unset;
  width: auto;
}

/* 尺寸类 */
.card-wrapper.size-full {
  grid-column: span 12;
}

.card-wrapper.size-half {
  grid-column: span 6;
}

.card-wrapper.size-third {
  grid-column: span 4;
}

.card-wrapper.size-quarter {
  grid-column: span 3;
}

/* 编辑模式样式 */
.card-wrapper.edit-mode {
  border: 2px dashed rgba(26, 95, 42, 0.4);
  border-radius: 1.5rem;
  overflow: hidden;
}

.card-wrapper.edit-mode:hover {
  border-color: rgba(26, 95, 42, 0.8);
  box-shadow: 0 0 0 4px rgba(26, 95, 42, 0.1);
}

.card-wrapper.dragging {
  opacity: 0.5;
  transform: scale(0.98);
}

/* 拖拽手柄 */
.drag-handle {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: rgba(26, 95, 42, 0.9);
  color: #fff;
  cursor: grab;
  user-select: none;
  border-radius: 1.25rem 1.25rem 0 0;
  font-size: 0.875rem;
}

.drag-handle:active {
  cursor: grabbing;
}

.drag-icon {
  font-size: 1.25rem;
  letter-spacing: -2px;
  opacity: 0.7;
}

.card-name {
  flex: 1;
  font-weight: 500;
}

.size-controls {
  display: flex;
  gap: 0.25rem;
}

.size-btn {
  width: 2rem;
  height: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.size-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.size-btn.active {
  background: #fff;
  color: #1a5f2a;
  border-color: #fff;
}

/* 缺失卡片提示 */
.missing-card {
  padding: 2rem;
  text-align: center;
  color: #999;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 1rem;
}

/* 响应式 */
@media (max-width: 1024px) {
  .card-wrapper.size-third {
    grid-column: span 6;
  }

  .card-wrapper.size-quarter {
    grid-column: span 6;
  }
}

@media (max-width: 768px) {
  .card-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .card-wrapper.size-full,
  .card-wrapper.size-half,
  .card-wrapper.size-third,
  .card-wrapper.size-quarter {
    grid-column: span 1;
  }

  .edit-hint {
    display: none;
  }

  .size-controls {
    flex-wrap: wrap;
    max-width: 120px;
  }
}
</style>
