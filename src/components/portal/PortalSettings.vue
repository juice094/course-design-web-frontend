<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="portalStore.settingsOpen" class="settings-overlay" @click="portalStore.closeSettings" />
    </transition>
    <transition name="slide">
      <div v-if="portalStore.settingsOpen" class="settings-panel">
        <div class="settings-header">
          <h3 class="settings-title">页面设置</h3>
          <button class="close-btn" @click="portalStore.closeSettings">
            <svg class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="settings-body">
          <!-- Tab 导航 -->
          <div class="settings-tabs">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              class="tab-btn"
              :class="{ active: activeTab === tab.id }"
              @click="activeTab = tab.id"
            >
              {{ tab.label }}
            </button>
          </div>

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

          <!-- 重置 -->
          <section class="setting-group">
            <button class="btn danger full" @click="portalStore.resetConfig">
              重置所有设置
            </button>
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
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePortalStore, getCardColorClasses } from '@/stores/portal'
import type { CardColor } from '@/stores/portal'
import SettingsScheduleEditor from './SettingsScheduleEditor.vue'
import SettingsArticleEditor from './SettingsArticleEditor.vue'
import SettingsPhotoEditor from './SettingsPhotoEditor.vue'
import SettingsMomentEditor from './SettingsMomentEditor.vue'
import SettingsAchievementEditor from './SettingsAchievementEditor.vue'

const portalStore = usePortalStore()
const bg = computed(() => portalStore.config.background)

const activeTab = ref('appearance')
const tabs = [
  { id: 'appearance', label: '外观' },
  { id: 'schedule', label: '课程表' },
  { id: 'articles', label: '文章' },
  { id: 'photos', label: '照片' },
  { id: 'moments', label: '动态' },
  { id: 'achievements', label: '成就' },
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
  max-width: 420px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  z-index: 101;
  display: flex;
  flex-direction: column;
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.1);
}

.dark .settings-panel {
  background: rgba(15, 23, 42, 0.95);
}

.settings-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.dark .settings-header {
  border-color: rgba(255, 255, 255, 0.06);
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
  border: none;
  cursor: pointer;
  color: #64748b;
  transition: all 0.2s;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.1);
}

.icon {
  width: 1rem;
  height: 1rem;
}

.settings-body {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.settings-tabs {
  display: flex;
  gap: 0.25rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;
  scrollbar-width: none;
}

.settings-tabs::-webkit-scrollbar { display: none; }

.tab-btn {
  padding: 0.5rem 0.875rem;
  border-radius: 0.5rem;
  border: none;
  background: rgba(0, 0, 0, 0.05);
  color: #64748b;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
}

.dark .tab-btn {
  background: rgba(255, 255, 255, 0.05);
  color: #94a3b8;
}

.tab-btn:hover {
  background: rgba(99, 102, 241, 0.1);
  color: #6366f1;
}

.tab-btn.active {
  background: #6366f1;
  color: #fff;
}

.dark .tab-btn.active {
  background: #4f46e5;
}

.setting-group {
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.dark .setting-group {
  background: rgba(30, 41, 59, 0.6);
  border-color: rgba(255, 255, 255, 0.06);
}

.group-title {
  font-size: 0.875rem;
  font-weight: 700;
  color: #475569;
  padding: 0.875rem 1rem;
  margin: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  font-family: 'Noto Serif SC', serif;
}

.dark .group-title {
  color: #94a3b8;
  border-color: rgba(255, 255, 255, 0.06);
}

.group-content {
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.field-inline {
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
}

.field-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #64748b;
}

.dark .field-label {
  color: #94a3b8;
}

.btn-group {
  display: flex;
  gap: 0.25rem;
  background: rgba(0, 0, 0, 0.04);
  padding: 0.25rem;
  border-radius: 0.5rem;
}

.btn-group-item {
  flex: 1;
  padding: 0.375rem 0.5rem;
  border-radius: 0.375rem;
  border: none;
  background: transparent;
  font-size: 0.8125rem;
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
  gap: 0.5rem;
  align-items: center;
}

.color-input {
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  padding: 0;
  background: none;
}

.text-input,
.select-input {
  flex: 1;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.6);
  font-size: 0.8125rem;
  color: #0f172a;
  outline: none;
  transition: all 0.2s;
}

.text-input:focus,
.select-input:focus {
  border-color: #6366f1;
}

.dark .text-input,
.dark .select-input {
  background: rgba(15, 23, 42, 0.5);
  border-color: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.section-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  color: #334155;
}

.dark .checkbox-label {
  color: #cbd5e1;
}

.check-text {
  font-weight: 500;
}

.section-actions {
  display: flex;
  gap: 0.25rem;
}

.action-btn {
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 0.375rem;
  border: none;
  background: rgba(0, 0, 0, 0.05);
  color: #64748b;
  font-size: 0.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.action-btn:hover:not(:disabled) {
  background: rgba(0, 0, 0, 0.1);
}

.action-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
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
  padding: 0.625rem;
  border-radius: 0.5rem;
  background: rgba(0, 0, 0, 0.03);
}

.custom-preview {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  min-width: 0;
}

.custom-title {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #0f172a;
}

.dark .custom-title {
  color: #fff;
}

.custom-url {
  font-size: 0.6875rem;
  color: #94a3b8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.add-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 0.75rem;
  background: rgba(0, 0, 0, 0.03);
}

.color-picker {
  display: flex;
  gap: 0.375rem;
  flex-wrap: wrap;
}

.color-dot {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
}

.color-dot.active {
  border-color: #0f172a;
  transform: scale(1.15);
}

.form-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.25rem;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  background: rgba(0, 0, 0, 0.05);
  color: #64748b;
}

.btn:hover {
  background: rgba(0, 0, 0, 0.1);
}

.btn.primary {
  background: #6366f1;
  color: #fff;
}

.btn.primary:hover {
  background: #4f46e5;
}

.btn.danger {
  color: #ef4444;
}

.btn.danger:hover {
  background: rgba(239, 68, 68, 0.1);
}

.btn.full {
  width: 100%;
}

.add-btn {
  width: 100%;
  border: 1px dashed rgba(0, 0, 0, 0.15);
  background: transparent;
}

.add-btn:hover {
  border-color: #6366f1;
  color: #6366f1;
  background: rgba(99, 102, 241, 0.05);
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
</style>
