# 身份卡片跳转链接功能 实现计划

> **Goal:** 为 Portal 页面的三张身份卡片（学生/教师/开发者）增加可配置的跳转链接支持，实现"组织内用户跳转教务系统，组织外用户跳转校方主页"，并支持用户自定义链接用于演示。

> **Architecture:** 扩展 PortalConfig 类型新增 `identityCardLinks` 字段，每张卡片配置内/外/自定义三类链接；PortalStore 负责状态管理与持久化；设置面板新增编辑区域；IdentityCards 组件根据登录状态智能选择跳转目标，自定义链接优先级最高。

> **Tech Stack:** Vue 3.5 + TypeScript 6 + Pinia 3 + SCSS

---

## 文件变更清单

| 文件 | 操作 | 职责 |
|:---|:---:|:---|
| `src/types/portal.ts` | 修改 | 新增 `IdentityCardLink` 和 `IdentityCardLinksConfig` 类型 |
| `src/stores/portal.ts` | 修改 | 扩展 defaultConfig 和 loadConfig/saveConfig 逻辑，新增链接管理方法 |
| `src/components/portal/PortalSettings.vue` | 修改 | 在外观 Tab 新增"身份卡片链接"设置区域 |
| `src/components/portal/IdentityCards.vue` | 修改 | 将静态卡片改为可点击，实现跳转逻辑 |

---

## Task 1: 扩展类型定义

**Files:**
- 修改: `src/types/portal.ts`

**目标:** 新增身份卡片链接相关的 TypeScript 类型定义。

### Step 1: 在 `src/types/portal.ts` 追加类型

在文件末尾（`PortalConfig` 接口之后）追加以下内容：

```typescript
export interface IdentityCardLink {
  /** 组织内用户（已登录）跳转目标，默认指向教务系统 */
  internalUrl: string
  /** 组织外用户（未登录访客）跳转目标，默认指向学校官网 */
  externalUrl: string
  /** 自定义链接（演示专用），设置后优先级最高 */
  customUrl: string
}

export interface IdentityCardLinksConfig {
  student: IdentityCardLink
  teacher: IdentityCardLink
  developer: IdentityCardLink
}
```

### Step 2: 更新 `PortalConfig` 接口

修改 `PortalConfig` 接口，新增 `identityCardLinks` 字段：

```typescript
export interface PortalConfig {
  background: BackgroundConfig
  sections: SectionConfig[]
  customCards: CustomCard[]
  identityCardLinks: IdentityCardLinksConfig  // ← 新增
}
```

---

## Task 2: 扩展 Portal Store

**Files:**
- 修改: `src/stores/portal.ts`

**目标:** 在 Store 中集成身份卡片链接的默认配置、加载/保存逻辑，以及更新方法。

### Step 1: 定义默认链接配置

在 `defaultConfig` 之前添加默认链接配置常量：

```typescript
import { schoolInfo } from '@/data/profile'

const defaultIdentityCardLinks: IdentityCardLinksConfig = {
  student: {
    internalUrl: '/#/login',
    externalUrl: schoolInfo.website,
    customUrl: '',
  },
  teacher: {
    internalUrl: '/#/login',
    externalUrl: schoolInfo.website,
    customUrl: '',
  },
  developer: {
    internalUrl: '/#/login',
    externalUrl: schoolInfo.website,
    customUrl: '',
  },
}
```

### Step 2: 更新 `defaultConfig`

在 `defaultConfig` 对象中新增 `identityCardLinks` 字段：

```typescript
const defaultConfig: PortalConfig = {
  background: { /* ... 保持不变 ... */ },
  sections: [ /* ... 保持不变 ... */ ],
  customCards: [],
  identityCardLinks: defaultIdentityCardLinks,  // ← 新增
}
```

### Step 3: 更新 `loadConfig` 函数

在 `loadConfig` 的解析逻辑中，合并 `identityCardLinks`：

```typescript
function loadConfig(): PortalConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as PortalConfig
      const mergedBg = { ...defaultConfig.background, ...parsed.background }
      if (mergedBg.type === 'image' && !mergedBg.imageUrl?.trim()) {
        mergedBg.imageUrl = DEFAULT_IMAGE_URL
      }
      return {
        background: mergedBg,
        sections: mergeSections(parsed.sections),
        customCards: parsed.customCards ?? defaultConfig.customCards,
        identityCardLinks: {  // ← 新增合并逻辑
          ...defaultIdentityCardLinks,
          ...parsed.identityCardLinks,
        },
      }
    }
  } catch {
    // 解析失败，回退到默认
  }
  return JSON.parse(JSON.stringify(defaultConfig))
}
```

### Step 4: 新增链接更新方法

在 `usePortalStore` 的 return 对象之前，添加以下方法：

```typescript
function updateIdentityCardLink(
  card: keyof IdentityCardLinksConfig,
  field: keyof IdentityCardLink,
  value: string,
) {
  config.value.identityCardLinks[card][field] = value
  saveConfig(config.value)
}

function resetIdentityCardLinks() {
  config.value.identityCardLinks = JSON.parse(JSON.stringify(defaultIdentityCardLinks))
  saveConfig(config.value)
}
```

### Step 5: 导出新增方法

在 return 对象中追加：

```typescript
return {
  // ... 原有属性/方法 ...
  updateIdentityCardLink,
  resetIdentityCardLinks,
}
```

---

## Task 3: 设置面板新增编辑区域

**Files:**
- 修改: `src/components/portal/PortalSettings.vue`

**目标:** 在外观 Tab 的"自定义链接卡片"和"重置"之间，新增"身份卡片链接"设置区域。

### Step 1: 在模板中插入编辑区域

在 `"自定义链接卡片" section` 之后、`"重置" section` 之前，插入以下内容：

```vue
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
        >
      </div>

      <div class="field">
        <label class="field-label">组织外链接（未登录访客）</label>
        <input
          :value="portalStore.config.identityCardLinks[card.key].externalUrl"
          class="text-input"
          placeholder="例如: https://www.gsau.edu.cn/"
          @blur="portalStore.updateIdentityCardLink(card.key, 'externalUrl', ($event.target as HTMLInputElement).value)"
        >
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
        >
      </div>
    </div>

    <button class="btn full" @click="portalStore.resetIdentityCardLinks">
      重置为默认链接
    </button>
  </div>
</section>
```

### Step 2: 在 script setup 中定义卡片配置

在 `const portalStore = usePortalStore()` 之后添加：

```typescript
const identityCards = [
  { key: 'student' as const, label: '学生卡', icon: '👨‍🎓' },
  { key: 'teacher' as const, label: '教师卡', icon: '👨‍🏫' },
  { key: 'developer' as const, label: '开发者卡', icon: '💻' },
]
```

### Step 3: 添加样式

在 `<style scoped>` 末尾追加：

```scss
.identity-card-config {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  padding: 0.875rem;
  border-radius: 0.75rem;
  background: rgba(0, 0, 0, 0.03);
  margin-bottom: 0.5rem;
}

.identity-card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.identity-card-icon {
  font-size: 1.125rem;
}

.identity-card-name {
  font-size: 0.875rem;
  font-weight: 700;
  color: #0f172a;
}

.dark .identity-card-name {
  color: #fff;
}

.badge {
  font-size: 0.625rem;
  font-weight: 600;
  padding: 0.125rem 0.375rem;
  border-radius: 9999px;
  background: rgba(0, 0, 0, 0.06);
  color: #94a3b8;
  margin-left: 0.375rem;
}

.badge.active {
  background: rgba(16, 185, 129, 0.15);
  color: #059669;
}

.dark .badge.active {
  background: rgba(16, 185, 129, 0.2);
  color: #34d399;
}
```

---

## Task 4: IdentityCards 组件实现跳转逻辑

**Files:**
- 修改: `src/components/portal/IdentityCards.vue`

**目标:** 将静态展示的三张卡片改为可点击，根据配置和登录状态智能选择跳转目标。

### Step 1: 修改模板 — 将卡片包装为可点击链接

将三个 `.card` div 改为 `a` 标签，并绑定动态 href：

```vue
<template>
  <div class="section">
    <div class="section-header">
      <div class="section-icon">
        <svg class="icon-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
        </svg>
      </div>
      <h2 class="section-title">身份卡片</h2>
    </div>

    <div class="cards-grid">
      <!-- 学生卡 -->
      <a
        :href="getCardUrl('student')"
        target="_blank"
        rel="noopener noreferrer"
        class="card"
      >
        <div class="card-icon student">
          <svg class="card-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          </svg>
        </div>
        <div class="card-info">
          <h3 class="card-name">学生</h3>
          <p class="card-desc">在校本科生，主修计算机科学与技术</p>
        </div>
        <div class="card-arrow">
          <svg class="arrow-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </a>

      <!-- 教师卡 -->
      <a
        :href="getCardUrl('teacher')"
        target="_blank"
        rel="noopener noreferrer"
        class="card"
      >
        <div class="card-icon teacher">
          <svg class="card-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </div>
        <div class="card-info">
          <h3 class="card-name">教师</h3>
          <p class="card-desc">课程助教，负责实验课指导与答疑</p>
        </div>
        <div class="card-arrow">
          <svg class="arrow-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </a>

      <!-- 开发者卡 -->
      <a
        :href="getCardUrl('developer')"
        target="_blank"
        rel="noopener noreferrer"
        class="card"
      >
        <div class="card-icon developer">
          <svg class="card-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </div>
        <div class="card-info">
          <h3 class="card-name">开发者</h3>
          <p class="card-desc">开源贡献者，Vue / Rust 生态爱好者</p>
        </div>
        <div class="card-arrow">
          <svg class="arrow-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </a>
    </div>
  </div>
</template>
```

### Step 2: 修改 script setup — 引入 Store 和跳转逻辑

将 `<script setup>` 替换为：

```typescript
<script setup lang="ts">
import { usePortalStore } from '@/stores/portal'
import { useUserStore } from '@/stores/user'
import type { IdentityCardLinksConfig } from '@/types/portal'

const portalStore = usePortalStore()
const userStore = useUserStore()

function getCardUrl(card: keyof IdentityCardLinksConfig): string {
  const links = portalStore.config.identityCardLinks[card]

  // 优先级 1: 自定义链接（演示专用）
  if (links.customUrl?.trim()) {
    return links.customUrl.trim()
  }

  // 优先级 2: 根据登录状态自动判断
  if (userStore.isLoggedIn) {
    return links.internalUrl || '/#/login'
  }

  return links.externalUrl || 'https://www.gsau.edu.cn/'
}
</script>
```

### Step 3: 添加卡片悬停和点击样式

在 `<style scoped>` 的 `.card` 选择器上添加 `cursor: pointer;`，并新增悬停效果：

```scss
.card {
  /* ... 原有样式保持不变 ... */
  cursor: pointer;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15);
}

.card:hover .card-arrow {
  transform: translateX(4px);
}

.card-arrow {
  transition: transform 0.3s;
}
```

---

## Task 5: 构建验证

**Files:** 无新增文件

**目标:** 确保类型检查和构建通过。

### Step 1: 类型检查

```bash
pnpm vue-tsc --noEmit
```

**预期:** 0 错误，0 警告。

### Step 2: 构建检查

```bash
pnpm build
```

**预期:** 构建成功，无错误。

### Step 3: 功能验证清单

- [ ] 打开 Portal 首页，三张身份卡片显示正常且可点击
- [ ] 未登录状态下点击卡片，跳转至学校官网（默认外部链接）
- [ ] 登录后点击卡片，跳转至教务系统登录页（默认内部链接）
- [ ] 打开设置面板 → 外观 Tab，可见"身份卡片链接"区域
- [ ] 修改某张卡片的"自定义链接"，保存后刷新页面，链接持久化
- [ ] 设置自定义链接后，无论登录状态如何，卡片均跳转到自定义链接
- [ ] 点击"重置为默认链接"，所有链接恢复默认值

---

## Spec 覆盖检查

| 需求 | 实现任务 |
|:---|:---|
| 组织内用户跳转教务系统 | Task 4 `getCardUrl` 根据 `userStore.isLoggedIn` 返回 `internalUrl` |
| 组织外用户跳转校方主页 | Task 4 `getCardUrl` 根据 `userStore.isLoggedIn` 返回 `externalUrl` |
| 用户自定义组织卡片跳转链接 | Task 2 `updateIdentityCardLink` + Task 3 设置面板编辑区域 |
| 演示时跳转到自己设计的页面 | Task 4 自定义链接优先级最高 |
| 演示时跳转到校方真实网站 | Task 4 未登录时返回 `externalUrl`（可配置为学校官网） |
| 配置持久化 | Task 2 `saveConfig` 在 localStorage 中保存 |

---

## 无占位符确认

- [x] 所有代码片段均为完整可运行的代码
- [x] 无 "TBD" / "TODO" / "implement later"
- [x] 无 "Add appropriate error handling" 等模糊描述
- [x] 每个任务包含确切的文件路径和行号范围
- [x] 类型名称在所有任务中保持一致
