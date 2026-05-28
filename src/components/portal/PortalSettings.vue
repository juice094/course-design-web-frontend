<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="portalStore.settingsOpen" class="settings-overlay" @click="portalStore.closeSettings" />
    </transition>
    <transition name="slide">
      <div v-if="portalStore.settingsOpen" class="settings-panel" :class="{ dark: themeStore.isDark }">
        <div class="settings-header">
          <h3 class="settings-title">页面设置</h3>
          <button class="close-btn" @click="portalStore.closeSettings">
            <svg class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="settings-body">
          <!-- 左侧图标菜单 -->
          <div class="settings-sidebar">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              class="sidebar-item"
              :class="{ active: activeTab === tab.id }"
              @click="activeTab = tab.id"
            >
              <span class="sidebar-icon">{{ tab.icon }}</span>
              <span class="sidebar-label">{{ tab.label }}</span>
            </button>
          </div>

          <!-- 右侧内容区域 -->
          <div class="settings-content">
            <!-- 外观 Tab -->
            <template v-if="activeTab === 'appearance'">
              <!-- 背景设置 -->
              <section class="setting-group">
                <h4 class="group-title">背景</h4>
                <div class="group-content">
                  <div class="field">
                    <label class="field-label">背景类型</label>
                    <div class="btn-group">
                      <button
                        v-for="t in ['gradient', 'solid', 'image']"
                        :key="t"
                        class="btn-group-item"
                        :class="{ active: bg.type === t }"
                        @click="portalStore.updateBackground({ type: t as any })"
                      >
                        {{ { gradient: '渐变', solid: '纯色', image: '图片' }[t] }}
                      </button>
                    </div>
                  </div>

                  <template v-if="bg.type === 'gradient'">
                    <div class="field">
                      <label class="field-label">起始颜色</label>
                      <div class="color-row">
                        <input
                          v-model="bg.gradientFrom"
                          type="color"
                          class="color-input"
                          @change="portalStore.updateBackground({ gradientFrom: bg.gradientFrom })"
                        >
                        <input
                          v-model="bg.gradientFrom"
                          class="text-input"
                          @blur="portalStore.updateBackground({ gradientFrom: bg.gradientFrom })"
                        >
                      </div>
                    </div>
                    <div class="field">
                      <label class="field-label">结束颜色</label>
                      <div class="color-row">
                        <input
                          v-model="bg.gradientTo"
                          type="color"
                          class="color-input"
                          @change="portalStore.updateBackground({ gradientTo: bg.gradientTo })"
                        >
                        <input
                          v-model="bg.gradientTo"
                          class="text-input"
                          @blur="portalStore.updateBackground({ gradientTo: bg.gradientTo })"
                        >
                      </div>
                    </div>
                    <div class="field">
                      <label class="field-label">方向</label>
                      <select
                        v-model="bg.gradientDirection"
                        class="select-input"
                        @change="portalStore.updateBackground({ gradientDirection: bg.gradientDirection })"
                      >
                        <option value="to right">从左到右</option>
                        <option value="to left">从右到左</option>
                        <option value="to top">从下到上</option>
                        <option value="to bottom">从上到下</option>
                        <option value="to top right">左下到右上</option>
                        <option value="to top left">右下到左上</option>
                        <option value="to bottom right">左上到右下</option>
                        <option value="to bottom left">右上到左下</option>
                        <option value="-45deg">对角线(-45°)</option>
                        <option value="45deg">对角线(45°)</option>
                      </select>
                    </div>
                    <div class="field field-inline">
                      <label class="field-label">流动动画</label>
                      <input
                        v-model="bg.gradientAnimated"
                        type="checkbox"
                        @change="portalStore.updateBackground({ gradientAnimated: bg.gradientAnimated })"
                      >
                    </div>
                  </template>

                  <template v-if="bg.type === 'solid'">
                    <div class="field">
                      <label class="field-label">背景颜色</label>
                      <div class="color-row">
                        <input
                          v-model="bg.solidColor"
                          type="color"
                          class="color-input"
                          @change="portalStore.updateBackground({ solidColor: bg.solidColor })"
                        >
                        <input
                          v-model="bg.solidColor"
                          class="text-input"
                          @blur="portalStore.updateBackground({ solidColor: bg.solidColor })"
                        >
                      </div>
                    </div>
                  </template>

                  <template v-if="bg.type === 'image'">
                    <div class="field">
                      <label class="field-label">图片 URL</label>
                      <input
                        v-model="bg.imageUrl"
                        class="text-input"
                        placeholder="https://..."
                        @blur="portalStore.updateBackground({ imageUrl: bg.imageUrl })"
                      >
                    </div>
                  </template>
                </div>
              </section>

              <!-- 模块管理 -->
              <section class="setting-group">
                <h4 class="group-title">模块显示</h4>
                <div class="group-content">
                  <div
                    v-for="section in sortedSections"
                    :key="section.id"
                    class="section-item"
                  >
                    <label class="checkbox-label">
                      <input
                        type="checkbox"
                        :checked="section.enabled"
                        @change="portalStore.toggleSection(section.id)"
                      >
                      <span class="check-text">{{ section.name }}</span>
                    </label>
                    <div class="section-actions">
                      <button
                        class="action-btn"
                        :disabled="!canMoveUp(section)"
                        @click="portalStore.moveSection(section.id, 'up')"
                      >
                        ↑
                      </button>
                      <button
                        class="action-btn"
                        :disabled="!canMoveDown(section)"
                        @click="portalStore.moveSection(section.id, 'down')"
                      >
                        ↓
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              <!-- 自定义卡片 -->
              <section class="setting-group">
                <h4 class="group-title">自定义链接卡片</h4>
                <div class="group-content">
                  <div
                    v-for="card in portalStore.config.customCards"
                    :key="card.id"
                    class="custom-item"
                  >
                    <div class="custom-preview">
                      <span class="custom-title">{{ card.title }}</span>
                      <span class="custom-url">{{ card.url }}</span>
                    </div>
                    <button class="action-btn danger" @click="portalStore.removeCustomCard(card.id)">删除</button>
                  </div>

                  <div v-if="showAddForm" class="add-form">
                    <input v-model="newCard.title" class="text-input" placeholder="标题">
                    <input v-model="newCard.description" class="text-input" placeholder="描述">
                    <input v-model="newCard.url" class="text-input" placeholder="URL">
                    <div class="color-picker">
                      <button
                        v-for="c in colorOptions"
                        :key="c"
                        class="color-dot"
                        :class="{ active: newCard.color === c }"
                        :style="{ background: getCardColorClasses(c).text }"
                        @click="newCard.color = c"
                      />
                    </div>
                    <div class="form-actions">
                      <button class="btn primary" @click="submitCard">添加</button>
                      <button class="btn" @click="showAddForm = false">取消</button>
                    </div>
                  </div>

                  <button v-else class="btn add-btn" @click="openAddForm">
                    + 添加卡片
                  </button>
                </div>
              </section>

              <!-- 身份卡片链接 -->
              <section class="setting-group">
                <h4 class="group-title">身份卡片链接</h4>
                <div class="group-content">
                  <div
                    v-for="card in identityCards"
                    :key="card.key"
                    class="identity-card-config"
                  >
                    <div class="identity-card-header">
                      <span class="identity-card-icon">{{ card.icon }}</span>
                      <span class="identity-card-name">{{ card.label }}</span>
                    </div>

                    <div class="field">
                      <label class="field-label">组织内链接（已登录用户）</label>
                      <input
                        :value="portalStore.config.identityCardLinks[card.key]?.internalUrl ?? ''"
                        class="text-input"
                        placeholder="例如: /#/login"
                        @blur="portalStore.updateIdentityCardLink(card.key, 'internalUrl', ($event.target as HTMLInputElement).value)"
                      >
                    </div>

                    <div class="field">
                      <label class="field-label">组织外链接（未登录访客）</label>
                      <input
                        :value="portalStore.config.identityCardLinks[card.key]?.externalUrl ?? ''"
                        class="text-input"
                        placeholder="例如: https://www.gsau.edu.cn/"
                        @blur="portalStore.updateIdentityCardLink(card.key, 'externalUrl', ($event.target as HTMLInputElement).value)"
                      >
                    </div>

                    <div class="field">
                      <label class="field-label">
                        自定义链接（演示专用，优先级最高）
                        <span
                          v-if="portalStore.config.identityCardLinks[card.key]?.customUrl"
                          class="badge active"
                        >已启用</span>
                        <span v-else class="badge">未设置</span>
                      </label>
                      <input
                        :value="portalStore.config.identityCardLinks[card.key]?.customUrl ?? ''"
                        class="text-input"
                        placeholder="留空则使用自动判断，设置后强制跳转此链接"
                        @blur="portalStore.updateIdentityCardLink(card.key, 'customUrl', ($event.target as HTMLInputElement).value)"
                      >
                    </div>
                  </div>

                  <button class="btn full" @click="portalStore.resetIdentityCardLinks">
                    重置为默认链接
                  </button>
                </div>
              </section>

              <!-- 重置 -->
              <section class="setting-group">
                <button class="btn danger full" @click="portalStore.resetConfig">
                  重置所有设置
                </button>
              </section>
            </template>

            <!-- 布局 Tab -->
            <template v-if="activeTab === 'layout'">
              <section class="setting-group">
                <h4 class="group-title">卡片布局管理</h4>
                <p class="group-desc">拖拽调整顺序，点击尺寸按钮改变宽度</p>
                <div class="group-content">
                  <div
                    v-for="section in sortedSections"
                    :key="section.id"
                    class="layout-section-item"
                    :class="{ disabled: !section.enabled, dragging: layoutDragId === section.id }"
                    draggable="true"
                    @dragstart="onLayoutDragStart(section.id, $event)"
                    @dragend="onLayoutDragEnd"
                    @dragenter.prevent="onLayoutDragEnter(section.id)"
                    @dragover.prevent="onLayoutDragOver"
                    @drop.prevent="onLayoutDrop(section.id, $event)"
                  >
                    <div class="layout-drag-handle"
                      :class="{ 'is-dragging': layoutDragId === section.id }"
                    >
                      <span class="layout-drag-icon">⋮⋮</span>
                      <label class="checkbox-label">
                        <input
                          type="checkbox"
                          :checked="section.enabled"
                          @change="portalStore.toggleSection(section.id)"
                        >
                        <span class="check-text">{{ section.name }}</span>
                      </label>
                      <div class="layout-size-picker">
                        <button
                          v-for="s in sizeOptions"
                          :key="s.value"
                          class="layout-size-btn"
                          :class="{ active: section.size === s.value }"
                          :title="s.label"
                          @click="portalStore.updateSectionSize(section.id, s.value)"
                        >
                          {{ s.icon }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <!-- 布局预览 -->
              <section class="setting-group">
                <h4 class="group-title">布局预览</h4>
                <div class="group-content">
                  <div class="layout-preview">
                    <div
                      v-for="section in enabledSectionsPreview"
                      :key="section.id"
                      class="layout-preview-cell"
                      :class="`size-${section.size}`"
                    >
                      {{ section.name }}
                    </div>
                  </div>
                </div>
              </section>
            </template>

            <!-- 课程表 Tab -->
            <template v-if="activeTab === 'schedule'">
              <section class="setting-group">
                <h4 class="group-title">课程表管理</h4>
                <div class="group-content">
                  <SettingsScheduleEditor />
                </div>
              </section>
            </template>

            <!-- 文章 Tab -->
            <template v-if="activeTab === 'articles'">
              <section class="setting-group">
                <h4 class="group-title">文章管理</h4>
                <div class="group-content">
                  <SettingsArticleEditor />
                </div>
              </section>
            </template>

            <!-- 照片 Tab -->
            <template v-if="activeTab === 'photos'">
              <section class="setting-group">
                <h4 class="group-title">照片管理</h4>
                <div class="group-content">
                  <SettingsPhotoEditor />
                </div>
              </section>
            </template>

            <!-- 动态 Tab -->
            <template v-if="activeTab === 'moments'">
              <section class="setting-group">
                <h4 class="group-title">动态管理</h4>
                <div class="group-content">
                  <SettingsMomentEditor />
                </div>
              </section>
            </template>

            <!-- 成就 Tab -->
            <template v-if="activeTab === 'achievements'">
              <section class="setting-group">
                <h4 class="group-title">成就管理</h4>
                <div class="group-content">
                  <SettingsAchievementEditor />
                </div>
              </section>
            </template>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePortalStore, getCardColorClasses } from '@/stores/portal'
import { useThemeStore } from '@/stores/theme'
import type { CardColor, SectionSize } from '@/stores/portal'
import SettingsScheduleEditor from './SettingsScheduleEditor.vue'
import SettingsArticleEditor from './SettingsArticleEditor.vue'
import SettingsPhotoEditor from './SettingsPhotoEditor.vue'
import SettingsMomentEditor from './SettingsMomentEditor.vue'
import SettingsAchievementEditor from './SettingsAchievementEditor.vue'

const portalStore = usePortalStore()
const themeStore = useThemeStore()
const bg = computed(() => portalStore.config.background)

const activeTab = ref('appearance')

const identityCards = [
  { key: 'student' as const, label: '学生卡', icon: '👨‍🎓' },
  { key: 'teacher' as const, label: '教师卡', icon: '👨‍🏫' },
  { key: 'developer' as const, label: '开发者卡', icon: '💻' },
]
const tabs = [
  { id: 'appearance', label: '外观', icon: '🎨' },
  { id: 'layout', label: '布局', icon: '📐' },
  { id: 'schedule', label: '课程表', icon: '📅' },
  { id: 'articles', label: '文章', icon: '📝' },
  { id: 'photos', label: '照片', icon: '🖼️' },
  { id: 'moments', label: '动态', icon: '💬' },
  { id: 'achievements', label: '成就', icon: '🏆' },
]

const sortedSections = computed(() =>
  [...portalStore.config.sections].sort((a, b) => a.order - b.order),
)

function canMoveUp(section: typeof portalStore.config.sections[0]) {
  const enabled = sortedSections.value.filter((s) => s.enabled)
  return enabled.findIndex((s) => s.id === section.id) > 0
}

function canMoveDown(section: typeof portalStore.config.sections[0]) {
  const enabled = sortedSections.value.filter((s) => s.enabled)
  return enabled.findIndex((s) => s.id === section.id) < enabled.length - 1
}

const showAddForm = ref(false)
const newCard = ref({
  title: '',
  description: '',
  url: '',
  color: 'blue' as CardColor,
  iconPath: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1',
})

const colorOptions: CardColor[] = ['blue', 'emerald', 'amber', 'rose', 'purple', 'indigo', 'cyan', 'orange']

const sizeOptions = [
  { value: 'full' as SectionSize, label: '全宽', icon: '▭' },
  { value: 'half' as SectionSize, label: '半宽', icon: '▭▭' },
  { value: 'third' as SectionSize, label: '三分之一', icon: '▭▭▭' },
  { value: 'quarter' as SectionSize, label: '四分之一', icon: '▭▭▭▭' },
]

// 布局拖拽状态
const layoutDragId = ref<string | null>(null)
const layoutDragOverId = ref<string | null>(null)

const enabledSectionsPreview = computed(() =>
  sortedSections.value.filter((s) => s.enabled),
)

function onLayoutDragStart(id: string, e: DragEvent) {
  layoutDragId.value = id
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', id)
  }
}

function onLayoutDragEnd() {
  layoutDragId.value = null
  layoutDragOverId.value = null
}

function onLayoutDragEnter(id: string) {
  if (!layoutDragId.value || layoutDragId.value === id) return
  layoutDragOverId.value = id
}

function onLayoutDragOver(e: DragEvent) {
  e.preventDefault()
  if (e.dataTransfer) {
    e.dataTransfer.dropEffect = 'move'
  }
}

function onLayoutDrop(targetId: string, e: DragEvent) {
  e.preventDefault()
  const fromId = e.dataTransfer?.getData('text/plain')
  if (!fromId || fromId === targetId) return

  const sections = [...sortedSections.value]
  const fromIdx = sections.findIndex((s) => s.id === fromId)
  const toIdx = sections.findIndex((s) => s.id === targetId)

  if (fromIdx === -1 || toIdx === -1) return

  const newOrder = sections.map((s) => s.id)
  newOrder.splice(fromIdx, 1)
  newOrder.splice(toIdx, 0, fromId)

  portalStore.reorderSections(newOrder)
  layoutDragId.value = null
  layoutDragOverId.value = null
}

function openAddForm() {
  showAddForm.value = true
  newCard.value = {
    title: '',
    description: '',
    url: '',
    color: 'blue',
    iconPath: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1',
  }
}

function submitCard() {
  if (!newCard.value.title || !newCard.value.url) return
  portalStore.addCustomCard(newCard.value)
  showAddForm.value = false
}
</script>

<style scoped>
.settings-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  z-index: 100;
}

.settings-panel {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 480px;
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  z-index: 101;
  display: flex;
  flex-direction: column;
  box-shadow: -10px 0 40px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  border-left: 1px solid rgba(255, 255, 255, 0.5);
}

.dark .settings-panel {
  background: rgba(15, 23, 42, 0.7);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
}

.settings-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.dark .settings-header {
  border-color: rgba(255, 255, 255, 0.1);
  background: rgba(15, 23, 42, 0.5);
}

.settings-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
  font-family: 'Noto Serif SC', serif;
}

.dark .settings-title {
  color: #fff;
}

.close-btn {
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.3);
  cursor: pointer;
  color: #64748b;
  transition: all 0.2s;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.1);
}

.dark .close-btn {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.1);
  color: #94a3b8;
}

.dark .close-btn:hover {
  background: rgba(255, 255, 255, 0.15);
}

.icon {
  width: 1rem;
  height: 1rem;
}

.settings-body {
  flex: 1;
  display: flex;
  overflow: hidden;
  min-height: 0;
}

/* 左侧图标菜单 */
.settings-sidebar {
  width: 64px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  border-right: 1px solid rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.12) transparent;
}

.settings-sidebar::-webkit-scrollbar {
  width: 4px;
}

.settings-sidebar::-webkit-scrollbar-track {
  background: transparent;
}

.settings-sidebar::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.12);
  border-radius: 2px;
}

.dark .settings-sidebar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.12);
}

.dark .settings-sidebar {
  border-color: rgba(255, 255, 255, 0.1);
  background: rgba(15, 23, 42, 0.45);
}

.sidebar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.625rem 0.25rem;
  border-radius: 0.75rem;
  border: none;
  background: transparent;
  color: #64748b;
  font-size: 0.625rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.dark .sidebar-item {
  color: #94a3b8;
}

.sidebar-item:hover {
  background: rgba(99, 102, 241, 0.1);
  color: #6366f1;
}

.sidebar-item.active {
  background: rgba(99, 102, 241, 0.85);
  color: #fff;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
}

.dark .sidebar-item.active {
  background: rgba(79, 70, 229, 0.85);
  box-shadow: 0 2px 8px rgba(79, 70, 229, 0.3);
}

.sidebar-icon {
  font-size: 1.25rem;
  line-height: 1;
  font-family: 'Segoe UI Emoji', 'Apple Color Emoji', 'Noto Color Emoji', sans-serif;
}

.sidebar-label {
  font-size: 0.6875rem;
  font-weight: 600;
}

/* 右侧内容区域 */
.settings-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  min-height: 0;
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.15) transparent;
}

.dark .settings-content {
  scrollbar-color: rgba(255, 255, 255, 0.15) transparent;
}

.settings-content::-webkit-scrollbar {
  width: 6px;
}

.settings-content::-webkit-scrollbar-track {
  background: transparent;
}

.settings-content::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.15);
  border-radius: 3px;
}

.dark .settings-content::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
}

.setting-group {
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.5);
  overflow: hidden;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.dark .setting-group {
  background: rgba(30, 41, 59, 0.6);
  border-color: rgba(255, 255, 255, 0.12);
}

.group-title {
  font-size: 0.875rem;
  font-weight: 700;
  color: #475569;
  padding: 0.875rem 1.25rem;
  margin: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.35);
  font-family: 'Noto Serif SC', serif;
}

.dark .group-title {
  color: #e2e8f0;
  border-color: rgba(255, 255, 255, 0.1);
}

.group-content {
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 0;
}

.field-inline {
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
}

.field-inline > * {
  flex-shrink: 0;
}

.field-inline > .field-label {
  flex-shrink: 0;
}

.field-label {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #64748b;
}

.dark .field-label {
  color: #94a3b8;
}

.btn-group {
  display: flex;
  gap: 0.25rem;
  background: rgba(255, 255, 255, 0.3);
  padding: 0.25rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.dark .btn-group {
  background: rgba(30, 41, 59, 0.4);
  border-color: rgba(255, 255, 255, 0.06);
}

.btn-group-item {
  flex: 1;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  border: none;
  background: transparent;
  font-size: 0.875rem;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-group-item.active {
  background: #fff;
  color: #0f172a;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.dark .btn-group-item.active {
  background: rgba(51, 65, 85, 0.8);
  color: #fff;
}

.color-row {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.color-input {
  width: 2.75rem;
  height: 2.75rem;
  border: none;
  border-radius: 0.625rem;
  cursor: pointer;
  padding: 0;
  background: none;
}

.text-input,
.select-input {
  flex: 1;
  padding: 0.625rem 0.875rem;
  border-radius: 0.625rem;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: rgba(255, 255, 255, 0.4);
  font-size: 0.875rem;
  color: #0f172a;
  outline: none;
  transition: all 0.2s;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.text-input:focus,
.select-input:focus {
  border-color: rgba(99, 102, 241, 0.6);
  background: rgba(255, 255, 255, 0.6);
}

.dark .text-input,
.dark .select-input {
  background: rgba(30, 41, 59, 0.4);
  border-color: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.dark .text-input:focus,
.dark .select-input:focus {
  background: rgba(30, 41, 59, 0.6);
  border-color: rgba(99, 102, 241, 0.5);
}

.section-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-radius: 0.625rem;
  background: rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.25);
  transition: all 0.2s;
  gap: 0.75rem;
  min-width: 0;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.dark .section-item {
  background: rgba(30, 41, 59, 0.4);
  border-color: rgba(255, 255, 255, 0.08);
}

.section-item:hover {
  background: rgba(255, 255, 255, 0.45);
  border-color: rgba(99, 102, 241, 0.25);
}

.dark .section-item:hover {
  background: rgba(30, 41, 59, 0.55);
  border-color: rgba(99, 102, 241, 0.25);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  font-size: 0.875rem;
  color: #334155;
  min-width: 0;
}

.dark .checkbox-label {
  color: #e2e8f0;
}

.check-text {
  font-weight: 500;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dark .check-text {
  color: #e2e8f0;
}

.section-actions {
  display: flex;
  gap: 0.375rem;
}

.action-btn {
  width: 1.875rem;
  height: 1.875rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.3);
  color: #64748b;
  font-size: 0.8125rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.dark .action-btn {
  background: rgba(30, 41, 59, 0.4);
  border-color: rgba(255, 255, 255, 0.08);
  color: #94a3b8;
}

.action-btn:hover:not(:disabled) {
  background: rgba(99, 102, 241, 0.15);
  border-color: rgba(99, 102, 241, 0.3);
}

.action-btn:disabled {
  opacity: 0.25;
  cursor: not-allowed;
  background: transparent;
  border-color: transparent;
}

.action-btn.danger {
  color: #ef4444;
}

.action-btn.danger:hover {
  background: rgba(239, 68, 68, 0.1);
}

.custom-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  border-radius: 0.625rem;
  background: rgba(255, 255, 255, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.dark .custom-item {
  background: rgba(30, 41, 59, 0.35);
  border-color: rgba(255, 255, 255, 0.06);
}

.custom-preview {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}

.custom-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #0f172a;
}

.dark .custom-title {
  color: #fff;
}

.custom-url {
  font-size: 0.75rem;
  color: #64748b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dark .custom-url {
  color: #94a3b8;
}

.add-form {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  padding: 1rem;
  border-radius: 0.875rem;
  background: rgba(255, 255, 255, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.dark .add-form {
  background: rgba(30, 41, 59, 0.35);
  border-color: rgba(255, 255, 255, 0.06);
}

.color-picker {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.color-dot {
  width: 1.625rem;
  height: 1.625rem;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
}

.color-dot.active {
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.8), 0 0 0 4px #6366f1;
}

.dark .color-dot.active {
  box-shadow: 0 0 0 2px rgba(15, 23, 42, 0.8), 0 0 0 4px #818cf8;
}

.form-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.25rem;
}

.btn {
  padding: 0.625rem 1.25rem;
  border-radius: 0.625rem;
  border: 1px solid rgba(255, 255, 255, 0.25);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  background: rgba(255, 255, 255, 0.4);
  color: #64748b;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.dark .btn {
  background: rgba(30, 41, 59, 0.4);
  border-color: rgba(255, 255, 255, 0.08);
  color: #94a3b8;
}

.btn:hover {
  background: rgba(255, 255, 255, 0.6);
  border-color: rgba(99, 102, 241, 0.3);
}

.dark .btn:hover {
  background: rgba(30, 41, 59, 0.6);
}

.btn.primary {
  background: rgba(99, 102, 241, 0.85);
  color: #fff;
  border-color: rgba(99, 102, 241, 0.4);
}

.btn.primary:hover {
  background: rgba(79, 70, 229, 0.9);
}

.btn.danger {
  color: #ef4444;
}

.btn.danger:hover {
  background: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.3);
}

.btn.full {
  width: 100%;
}

.add-btn {
  width: 100%;
  border: 1px dashed rgba(0, 0, 0, 0.15);
  background: transparent;
}

.dark .add-btn {
  border-color: rgba(255, 255, 255, 0.15);
}

.add-btn:hover {
  border-color: #6366f1;
  color: #6366f1;
  background: rgba(99, 102, 241, 0.05);
}

.identity-card-config {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  padding: 1.25rem;
  border-radius: 0.875rem;
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.25);
  margin-bottom: 0.75rem;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.dark .identity-card-config {
  background: rgba(30, 41, 59, 0.4);
  border-color: rgba(255, 255, 255, 0.06);
}

.identity-card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.25rem;
}

.identity-card-icon {
  font-size: 1.5rem;
}

.identity-card-name {
  font-size: 1rem;
  font-weight: 700;
  color: #0f172a;
}

.dark .identity-card-name {
  color: #fff;
}

.badge {
  font-size: 0.6875rem;
  font-weight: 600;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  background: rgba(0, 0, 0, 0.06);
  color: #64748b;
  margin-left: 0.5rem;
}

.dark .badge {
  background: rgba(255, 255, 255, 0.08);
  color: #94a3b8;
}

.badge.active {
  background: rgba(16, 185, 129, 0.15);
  color: #059669;
}

.dark .badge.active {
  background: rgba(16, 185, 129, 0.2);
  color: #34d399;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
/* 布局 Tab 样式 */
.group-desc {
  font-size: 0.75rem;
  color: var(--text-secondary, #666);
  margin: -0.5rem 0 0.75rem;
  opacity: 0.8;
}

.layout-section-item {
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 0.75rem;
  margin-bottom: 0.5rem;
  transition: all 0.2s;
  background: rgba(255, 255, 255, 0.4);
}

.layout-section-item.disabled {
  opacity: 0.5;
  background: rgba(0, 0, 0, 0.02);
}

.layout-section-item.dragging {
  opacity: 0.7;
  border-color: rgba(26, 95, 42, 0.5);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.layout-drag-handle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  cursor: grab;
}

.layout-drag-handle:active {
  cursor: grabbing;
}

.layout-drag-icon {
  font-size: 1rem;
  letter-spacing: -2px;
  opacity: 0.4;
  flex-shrink: 0;
}

.layout-drag-handle .checkbox-label {
  flex: 1;
  margin: 0;
}

.layout-size-picker {
  display: flex;
  gap: 0.125rem;
  flex-shrink: 0;
}

.layout-size-btn {
  width: 1.75rem;
  height: 1.75rem;
  border: 1px solid rgba(0, 0, 0, 0.15);
  background: rgba(255, 255, 255, 0.5);
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  color: var(--text-primary, #333);
}

.layout-size-btn:hover {
  background: rgba(255, 255, 255, 0.8);
  border-color: rgba(0, 0, 0, 0.3);
}

.layout-size-btn.active {
  background: rgba(26, 95, 42, 0.9);
  color: #fff;
  border-color: rgba(26, 95, 42, 0.5);
}

.dark .layout-size-btn {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.15);
  color: #e2e8f0;
}

.dark .layout-size-btn.active {
  background: rgba(34, 197, 94, 0.8);
  color: #fff;
}

/* 布局预览 */
.layout-preview {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 0.5rem;
  padding: 0.75rem;
  background: rgba(0, 0, 0, 0.03);
  border-radius: 0.75rem;
  min-height: 120px;
}

.dark .layout-preview {
  background: rgba(255, 255, 255, 0.05);
}

.layout-preview-cell {
  grid-column: span 12;
  padding: 0.5rem 0.75rem;
  background: rgba(26, 95, 42, 0.1);
  border: 1px solid rgba(26, 95, 42, 0.15);
  border-radius: 0.5rem;
  font-size: 0.75rem;
  color: rgba(26, 95, 42, 0.9);
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dark .layout-preview-cell {
  background: rgba(34, 197, 94, 0.15);
  border-color: rgba(34, 197, 94, 0.2);
  color: rgba(34, 197, 94, 0.9);
}

.layout-preview-cell.size-full {
  grid-column: span 12;
}

.layout-preview-cell.size-half {
  grid-column: span 6;
}

.layout-preview-cell.size-third {
  grid-column: span 4;
}

.layout-preview-cell.size-quarter {
  grid-column: span 3;
}

@media (max-width: 480px) {
  .layout-preview-cell.size-third,
  .layout-preview-cell.size-quarter {
    grid-column: span 6;
  }
}
</style>
