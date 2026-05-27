<template>
  <div class="settings-appearance" :class="{ dark: themeStore.isDark }">
    <!-- 背景设置 -->
    <section class="setting-group">
      <h4 class="group-title">背景设置</h4>
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
              />
              <input
                v-model="bg.gradientFrom"
                class="text-input"
                @blur="portalStore.updateBackground({ gradientFrom: bg.gradientFrom })"
              />
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
              />
              <input
                v-model="bg.gradientTo"
                class="text-input"
                @blur="portalStore.updateBackground({ gradientTo: bg.gradientTo })"
              />
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
            />
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
              />
              <input
                v-model="bg.solidColor"
                class="text-input"
                @blur="portalStore.updateBackground({ solidColor: bg.solidColor })"
              />
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
            />
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
            />
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
          <input v-model="newCard.title" class="text-input" placeholder="标题" />
          <input v-model="newCard.description" class="text-input" placeholder="描述" />
          <input v-model="newCard.url" class="text-input" placeholder="URL" />
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
              :value="portalStore.config.identityCardLinks[card.key].internalUrl"
              class="text-input"
              placeholder="例如: /#/login"
              @blur="portalStore.updateIdentityCardLink(card.key, 'internalUrl', ($event.target as HTMLInputElement).value)"
            />
          </div>

          <div class="field">
            <label class="field-label">组织外链接（未登录访客）</label>
            <input
              :value="portalStore.config.identityCardLinks[card.key].externalUrl"
              class="text-input"
              placeholder="例如: https://www.gsau.edu.cn/"
              @blur="portalStore.updateIdentityCardLink(card.key, 'externalUrl', ($event.target as HTMLInputElement).value)"
            />
          </div>

          <div class="field">
            <label class="field-label">
              自定义链接（演示专用，优先级最高）
              <span
                v-if="portalStore.config.identityCardLinks[card.key].customUrl"
                class="badge active"
              >已启用</span>
              <span v-else class="badge">未设置</span>
            </label>
            <input
              :value="portalStore.config.identityCardLinks[card.key].customUrl"
              class="text-input"
              placeholder="留空则使用自动判断，设置后强制跳转此链接"
              @blur="portalStore.updateIdentityCardLink(card.key, 'customUrl', ($event.target as HTMLInputElement).value)"
            />
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePortalStore, getCardColorClasses } from '@/stores/portal'
import { useThemeStore } from '@/stores/theme'
import type { CardColor } from '@/stores/portal'

const portalStore = usePortalStore()
const themeStore = useThemeStore()
const bg = computed(() => portalStore.config.background)

const identityCards = [
  { key: 'student' as const, label: '学生卡', icon: '👨‍🎓' },
  { key: 'teacher' as const, label: '教师卡', icon: '👨‍🏫' },
  { key: 'developer' as const, label: '开发者卡', icon: '💻' },
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
.settings-appearance {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.setting-group {
  border-radius: 1.5rem;
  background: rgba(255, 255, 255, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.35);
  overflow: hidden;
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.dark .setting-group {
  background: rgba(30, 41, 59, 0.45);
  border-color: rgba(255, 255, 255, 0.08);
}

.group-title {
  font-size: 1rem;
  font-weight: 700;
  color: #475569;
  padding: 1rem 1.25rem;
  margin: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  font-family: 'Noto Serif SC', serif;
}

.dark .group-title {
  color: #e2e8f0;
  border-color: rgba(255, 255, 255, 0.08);
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
  border-radius: 0.75rem;
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
  border-radius: 0.5rem;
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
  width: 3rem;
  height: 3rem;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  padding: 0;
  background: none;
}

.text-input,
.select-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
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
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.2s;
  gap: 0.75rem;
  min-width: 0;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.dark .section-item {
  background: rgba(30, 41, 59, 0.35);
  border-color: rgba(255, 255, 255, 0.06);
}

.section-item:hover {
  background: rgba(255, 255, 255, 0.5);
  border-color: rgba(99, 102, 241, 0.2);
}

.dark .section-item:hover {
  background: rgba(30, 41, 59, 0.5);
  border-color: rgba(99, 102, 241, 0.2);
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
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.3);
  color: #64748b;
  font-size: 0.875rem;
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
  padding: 0.75rem;
  border-radius: 0.75rem;
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
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 1rem;
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
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 9999px;
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
  margin-top: 0.5rem;
}

.btn {
  padding: 0.625rem 1.25rem;
  border-radius: 0.75rem;
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
  border-radius: 1rem;
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
  margin-bottom: 0.5rem;
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
  font-size: 0.75rem;
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
</style>
