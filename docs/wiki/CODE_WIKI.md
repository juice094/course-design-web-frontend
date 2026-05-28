# Code Wiki — 教务数据可视化管理系统

> **项目名**: teach-pro-modern  
> **版本**: v2.0.0  
> **技术栈**: Vue 3.5 + TypeScript 6.0 + Vite 8 + Pinia 3 + Vue Router 5 + Element Plus 2.13 + ECharts 6  
> **包管理器**: pnpm 11.3.0  

---

## 目录

1. [项目整体架构](#一项目整体架构)
2. [目录结构](#二目录结构)
3. [核心模块职责](#三核心模块职责)
4. [关键类与函数说明](#四关键类与函数说明)
5. [依赖关系](#五依赖关系)
6. [项目运行方式](#六项目运行方式)
7. [路由体系](#七路由体系)
8. [权限控制](#八权限控制)
9. [状态管理](#九状态管理)
10. [数据可视化](#十数据可视化)
11. [构建与部署](#十一构建与部署)

---

## 一、项目整体架构

本项目是一个面向高校的**教务数据可视化管理系统**，由三大板块构成，覆盖"展示 → 入口 → 管理"的完整用户体验链路：

```
┌─────────────────────────────────────────────────────────────┐
│  ① 个人主页 (Portal)  ← 公开访问，Glassmorphism 风格展示页   │
│     个人名片 · 项目展示 · Steam 游戏 · 技能雷达 · 自定义卡片   │
├─────────────────────────────────────────────────────────────┤
│  ② 学校页面 (School)  ← 公开访问，教务门户入口               │
│     学校数据概览 · 快速功能链接 · 校园信息展示               │
├─────────────────────────────────────────────────────────────┤
│  ③ 教务系统 (Admin)   ← 登录后访问，后台管理系统             │
│     学生/教师/课程/成绩 CRUD · 选课排课 · 数据大屏           │
└─────────────────────────────────────────────────────────────┘
```

### 架构分层

```
┌─────────────────────────────────────────────┐
│              用户层 (User Layer)              │
│   管理员(admin)  教师(teacher)  学生(student)  │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│            视图层 (View Layer)               │
│  Login │ Home │ Student │ Teacher │ Course   │
│  Score │ CourseSelect │ Schedule │ Evaluation│
│  OperationLog │ About │ Portal*                │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│          组件层 (Component Layer)            │
│  AppLayout │ ChartPanel │ DataCard           │
│  Breadcrumb │ StudentFormDialog              │
│  Portal* 组件 (17+ 个)                       │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│          状态层 (Pinia Store Layer)          │
│  user │ student │ teacher │ course │ score   │
│  courseSelect │ log │ dict │ portal | theme   │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│           工具层 (Utility Layer)             │
│  auth │ permission │ export │ format         │
│  request (Axios + interceptors)              │
│  persist (localStorage 封装)                 │
└─────────────────────────────────────────────┘
```

---

## 二、目录结构

```
course-design-web-frontend/
├── .github/
│   ├── workflows/
│   │   ├── codeql.yml          # CodeQL 代码安全扫描
│   │   └── deploy.yml          # GitHub Pages 自动部署
│   └── dependabot.yml          # 依赖自动更新配置
├── .vscode/
│   ├── extensions.json         # 推荐插件配置
│   └── settings.json           # VS Code 工作区设置
├── docs/
│   └── 《大数据可视化》课程设计报告.doc(x)   # 课程设计文档
├── public/
│   └── portal-bg.jpg           # 静态资源：Portal 默认背景图
├── school-homepage/            # 学校官网静态页面（独立 HTML）
│   ├── images/ai_hd/           # AI 高清图片资源
│   ├── index.html              # 学校官网首页
│   ├── academic.html           # 学术科研
│   ├── email.html              # 邮件系统
│   ├── finance.html            # 财务系统
│   ├── gsau-style.html         # 学校风格页
│   ├── info.html               # 信息公开
│   ├── jobs.html               # 人才招聘
│   ├── lab.html                # 实验室
│   ├── library.html            # 图书馆
│   ├── procurement.html        # 招标采购
│   └── 甘肃农业大学官网-优化版.html
│   └── 甘肃农业大学官网跳转.html
├── src/
│   ├── api/
│   │   ├── modules/
│   │   │   └── student.ts      # 学生相关 API 模块（预留）
│   │   └── request.ts          # Axios 请求实例 + 拦截器
│   ├── assets/                 # 静态资源（图片、Logo）
│   │   ├── portal-bg-school.png
│   │   ├── portal-bg.jpg
│   │   └── school-logo.png
│   ├── components/
│   │   ├── portal/             # Portal 页面组件（17+ 个）
│   │   │   ├── AchievementsTimeline.vue    # 成就时间线
│   │   │   ├── ArticlesSection.vue         # 文章展示
│   │   │   ├── CourseSchedule.vue          # 课程表周视图
│   │   │   ├── CustomCards.vue             # 用户自定义卡片
│   │   │   ├── IdentityCards.vue           # 三重身份卡片
│   │   │   ├── MomentsFeed.vue             # 动态说说
│   │   │   ├── PhotoWall.vue               # 照片墙
│   │   │   ├── PortalBackground.vue        # 渐变流动背景
│   │   │   ├── PortalNavbar.vue            # 顶部玻璃导航
│   │   │   ├── PortalSettings.vue          # 页面设置面板
│   │   │   ├── ProfileCard.vue             # 个人名片
│   │   │   ├── ProjectShowcase.vue         # GitHub 项目展示
│   │   │   ├── SchoolQuickLinks.vue        # 快速功能入口
│   │   │   ├── SchoolStats.vue             # 学校数据概览
│   │   │   ├── SettingsAchievementEditor.vue   # 成就设置编辑器
│   │   │   ├── SettingsArticleEditor.vue       # 文章设置编辑器
│   │   │   ├── SettingsMomentEditor.vue        # 动态设置编辑器
│   │   │   ├── SettingsPhotoEditor.vue         # 照片设置编辑器
│   │   │   ├── SettingsScheduleEditor.vue      # 课程设置编辑器
│   │   │   ├── SiteDashboard.vue           # 底部状态栏
│   │   │   ├── SkillsRadar.vue             # 技能雷达图
│   │   │   ├── SocialButton.vue            # 社交图标按钮
│   │   │   └── SteamHub.vue                # Steam 游戏展示
│   │   ├── AppHeader.vue       # 后台顶部导航（旧版，已弃用）
│   │   ├── AppLayout.vue       # 后台布局框架（侧边栏 + Header + 内容区）
│   │   ├── Breadcrumb.vue      # 面包屑导航
│   │   └── StudentFormDialog.vue   # 学生表单对话框（新增/编辑共用）
│   ├── data/
│   │   └── profile.ts          # 个人资料静态配置（GitHub/Steam/项目）
│   ├── directives/
│   │   └── permission.ts       # v-permission 权限指令
│   ├── layouts/
│   │   └── PortalLayout.vue    # Portal 共享布局（背景 + 导航 + 设置面板）
│   ├── router/
│   │   ├── index.ts            # 路由入口 + 全局守卫
│   │   ├── admin.ts            # 后台管理路由配置
│   │   └── portal.ts           # Portal 路由配置
│   ├── shared/
│   │   └── repository/
│   │       └── localStorage.ts # localStorage 仓库封装
│   ├── stores/                 # Pinia 状态管理
│   │   ├── index.ts            # App 全局状态（侧边栏/主题）
│   │   ├── achievements.ts     # 成就时间线数据
│   │   ├── articles.ts         # 文章数据
│   │   ├── course.ts           # 课程数据
│   │   ├── courseSelect.ts     # 选课数据
│   │   ├── dict.ts             # 字典数据（学院/专业/年级等）
│   │   ├── log.ts              # 操作日志
│   │   ├── moments.ts          # 动态说说数据
│   │   ├── photos.ts           # 照片墙数据
│   │   ├── portal.ts           # Portal 配置状态
│   │   ├── schedule.ts         # 课程表数据 + 可见性控制
│   │   ├── score.ts            # 成绩数据
│   │   ├── student.ts          # 学生数据
│   │   ├── teacher.ts          # 教师数据
│   │   ├── theme.ts            # 暗色模式状态
│   │   └── user.ts             # 用户认证状态
│   ├── styles/
│   │   ├── index.scss          # 全局样式入口
│   │   └── variables.scss      # SCSS 主题变量
│   ├── types/                  # TypeScript 类型定义
│   │   ├── content.ts          # 内容相关类型
│   │   ├── course.ts           # 课程相关类型
│   │   ├── index.ts            # 通用类型（Student/ApiResponse等）
│   │   ├── portal.ts           # Portal 配置类型
│   │   ├── score.ts            # 成绩相关类型
│   │   ├── teacher.ts          # 教师相关类型
│   │   └── user.ts             # 用户相关类型
│   ├── utils/
│   │   ├── auth.ts             # Token/UserInfo 本地存储工具
│   │   └── permission.ts       # 权限校验工具（菜单/按钮）
│   ├── vendor/                 # 第三方库封装/配置
│   │   ├── echarts-config/
│   │   │   └── index.ts        # ECharts 显式注册配置
│   │   └── vue-utils/
│   │       ├── components/
│   │       │   ├── ChartPanel.vue      # 图表面板组件
│   │       │   └── DataCard.vue        # 数据卡片组件
│   │       ├── composables/
│   │       │   └── useChart.ts         # ECharts 组合式函数
│   │       ├── utils/
│   │       │   ├── export.ts           # Excel 导入导出
│   │       │   ├── format.ts           # 数值/日期格式化
│   │       │   └── persist.ts          # localStorage 持久化封装
│   │       └── index.ts                # 统一导出入口
│   ├── views/                  # 页面级视图组件
│   │   ├── portal/             # Portal 页面
│   │   │   ├── AboutView.vue       # 关于页
│   │   │   ├── AcademicView.vue    # 学业中心
│   │   │   ├── HomeView.vue        # Portal 首页
│   │   │   ├── SpaceView.vue       # 个人空间
│   │   │   └── WorksView.vue       # 作品集
│   │   ├── AboutView.vue       # 后台关于系统
│   │   ├── CourseSelectView.vue    # 学生选课
│   │   ├── CourseView.vue      # 课程管理
│   │   ├── EvaluationView.vue  # 评教结果
│   │   ├── HomeView.vue        # 后台首页（数据大屏）
│   │   ├── LoginView.vue       # 登录页
│   │   ├── OperationLogView.vue    # 操作日志
│   │   ├── ScheduleView.vue    # 排课管理
│   │   ├── ScoreView.vue       # 成绩管理
│   │   ├── StudentView.vue     # 学生管理
│   │   └── TeacherView.vue     # 教师管理
│   ├── App.vue                 # 根组件（Portal/Login 跳过 Layout）
│   └── main.ts                 # 应用入口
├── .gitignore
├── .prettierignore
├── env.d.ts                    # Vite 环境类型声明
├── eslint.config.mjs           # ESLint 9 Flat Config
├── index.html                  # HTML 入口（引入 Noto Serif SC 字体）
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml         # pnpm 工作区配置
├── prettier.config.mjs         # Prettier 配置
├── PROJECT_INTRO.md            # 项目说明文档
├── README.md                   # 项目 README
├── SECURITY.md                 # 安全策略
├── tsconfig.app.json           # 应用 TS 配置
├── tsconfig.json               # TS 根配置（引用 app + node）
├── tsconfig.node.json          # Node 环境 TS 配置
├── vite.config.ts              # Vite 构建配置
└── 执行路线图.md                # 开发执行路线图
```

---

## 三、核心模块职责

### 3.1 入口模块

| 文件 | 职责 |
|:---|:---|
| [main.ts](src/main.ts) | Vue 应用入口：创建 App 实例、注册 Pinia/Router、注册全局图标和权限指令、导入 ECharts 配置和全局样式 |
| [App.vue](src/App.vue) | 根组件：根据路由判断使用 AppLayout（后台）还是直接渲染 RouterView（Portal/Login） |
| [index.html](index.html) | HTML 入口模板，引入 Google Fonts（Noto Serif SC） |

### 3.2 路由模块

| 文件 | 职责 |
|:---|:---|
| [router/index.ts](src/router/index.ts) | 路由入口：合并 Portal + Admin 路由，配置 Hash 模式，实现全局路由守卫（标题设置、公开页面放行、未登录重定向、菜单权限校验） |
| [router/portal.ts](src/router/portal.ts) | Portal 路由配置：/portal 及其子路由（home/academic/works/space/about），全部标记为 public |
| [router/admin.ts](src/router/admin.ts) | 后台路由配置：10 个管理页面路由，每个带 menu 权限码和 icon |

### 3.3 布局模块

| 文件 | 职责 |
|:---|:---|
| [layouts/PortalLayout.vue](src/layouts/PortalLayout.vue) | Portal 共享布局：包含背景组件、导航栏、设置面板、主内容区，支持暗色模式 |
| [components/AppLayout.vue](src/components/AppLayout.vue) | 后台管理布局：侧边栏（动态菜单过滤 + 折叠）+ 顶部 Header（面包屑 + 用户信息下拉）+ 内容区 |

### 3.4 API 模块

| 文件 | 职责 |
|:---|:---|
| [api/request.ts](src/api/request.ts) | Axios 实例封装：基础 URL、超时、请求拦截器（注入 Token）、响应拦截器（统一错误处理、401 跳转登录） |
| [api/modules/student.ts](src/api/modules/student.ts) | 学生相关 API 接口（预留，当前使用 Mock 数据） |

### 3.5 工具模块

| 文件 | 职责 |
|:---|:---|
| [utils/auth.ts](src/utils/auth.ts) | Token 和 UserInfo 的 localStorage 读写封装 |
| [utils/permission.ts](src/utils/permission.ts) | RBAC 权限配置：角色名称映射、菜单权限表、按钮权限表、校验函数 |
| [vendor/vue-utils/utils/export.ts](src/vendor/vue-utils/utils/export.ts) | Excel 导入导出：基于 xlsx 库，支持 JSON → Excel 和 Excel → JSON |
| [vendor/vue-utils/utils/format.ts](src/vendor/vue-utils/utils/format.ts) | 格式化工具：数值千分位、日期格式化 |
| [vendor/vue-utils/utils/persist.ts](src/vendor/vue-utils/utils/persist.ts) | localStorage 持久化封装：支持命名空间、异常静默处理 |
| [vendor/vue-utils/composables/useChart.ts](src/vendor/vue-utils/composables/useChart.ts) | ECharts 组合式函数：封装 init/resize/dispose 生命周期 |

### 3.6 指令模块

| 文件 | 职责 |
|:---|:---|
| [directives/permission.ts](src/directives/permission.ts) | `v-permission` 全局指令：挂载时检查按钮权限，无权限则移除 DOM 元素 |

---

## 四、关键类与函数说明

### 4.1 类型定义 (Types)

#### [types/user.ts](src/types/user.ts)

```typescript
export type UserRole = 'admin' | 'teacher' | 'student'

export interface UserInfo {
  id: number
  username: string
  realName: string
  role: UserRole
  avatar?: string
  deptId?: number
  deptName?: string
}

export interface LoginForm {
  username: string
  password: string
  code?: string
}
```

#### [types/portal.ts](src/types/portal.ts)

```typescript
export interface PortalConfig {
  background: BackgroundConfig    // 背景配置（渐变/纯色/图片）
  sections: SectionConfig[]       // 模块配置列表（启用状态 + 排序）
  customCards: CustomCard[]       // 用户自定义卡片
}

export interface BackgroundConfig {
  type: 'gradient' | 'solid' | 'image'
  gradientFrom: string
  gradientTo: string
  gradientDirection: GradientDirection
  gradientAnimated: boolean
  solidColor: string
  imageUrl: string
}

export interface CustomCard {
  id: string
  title: string
  description: string
  url: string
  color: CardColor
  iconPath: string
}
```

#### [types/index.ts](src/types/index.ts)

```typescript
export interface ApiResponse<T = unknown> {
  code: number
  message: string
  data: T
}

export interface Student {
  id: number
  name: string
  gender: '男' | '女'
  age: number
  major: string
  grade: string
  enrollmentYear: number
}
```

#### [types/course.ts](src/types/course.ts)

```typescript
export interface Course {
  id: number
  courseNo: string
  name: string
  credit: number
  hours: number
  type: '必修' | '选修' | '通识'
  collegeId: number
  collegeName: string
  teacherId?: number
  teacherName?: string
  semester: string
  maxStudents?: number
  description?: string
}
```

### 4.2 Store (Pinia)

#### [stores/user.ts](src/stores/user.ts) — 用户认证 Store

| 属性/方法 | 类型 | 说明 |
|:---|:---|:---|
| `token` | `Ref<string \| null>` | JWT Token |
| `userInfo` | `Ref<UserInfo \| null>` | 用户信息 |
| `isLoggedIn` | `ComputedRef<boolean>` | 是否已登录 |
| `role` | `ComputedRef<UserRole \| null>` | 当前角色 |
| `isAdmin` / `isTeacher` / `isStudent` | `ComputedRef<boolean>` | 角色判断 |
| `login(form)` | `Promise<boolean>` | Mock 登录（admin/teacher/student） |
| `logout()` | `void` | 清除认证状态 |
| `checkMenu(menuName)` | `boolean` | 检查菜单权限 |
| `checkButton(buttonCode)` | `boolean` | 检查按钮权限 |

#### [stores/portal.ts](src/stores/portal.ts) — Portal 配置 Store

| 属性/方法 | 类型 | 说明 |
|:---|:---|:---|
| `config` | `Ref<PortalConfig>` | 完整配置对象 |
| `settingsOpen` | `Ref<boolean>` | 设置面板开关 |
| `enabledSections` | `ComputedRef<SectionConfig[]>` | 已启用且排序后的模块列表 |
| `bgStyle` | `ComputedRef<CSSProperties>` | 背景样式对象 |
| `updateBackground(updates)` | `void` | 更新背景配置 |
| `toggleSection(id)` | `void` | 切换模块显示/隐藏 |
| `moveSection(id, direction)` | `void` | 模块上移/下移 |
| `addCustomCard(card)` | `void` | 添加自定义卡片 |
| `removeCustomCard(id)` | `void` | 删除自定义卡片 |
| `resetConfig()` | `void` | 重置为默认配置 |

#### [stores/student.ts](src/stores/student.ts) — 学生数据 Store

| 属性/方法 | 类型 | 说明 |
|:---|:---|:---|
| `students` | `Ref<Student[]>` | 学生列表 |
| `loadStudents()` | `void` | 从 localStorage 加载（首次使用 Mock 数据） |
| `addStudent(s)` | `void` | 添加学生并持久化 |
| `updateStudent(s)` | `void` | 更新学生并持久化 |
| `deleteStudent(id)` | `void` | 删除学生并持久化 |

### 4.3 权限工具函数

#### [utils/permission.ts](src/utils/permission.ts)

```typescript
// 角色名称映射
export const ROLE_NAMES: Record<UserRole, string>

// 菜单权限表
export const MENU_PERMISSIONS: Record<UserRole, string[]>

// 按钮权限表
export const BUTTON_PERMISSIONS: Record<string, string[]>

// 检查角色
export function hasRole(role: UserRole, requiredRoles: UserRole[]): boolean

// 检查菜单权限
export function hasMenu(role: UserRole, menuName: string): boolean

// 检查按钮权限
export function hasButton(role: UserRole, buttonCode: string): boolean
```

### 4.4 认证工具函数

#### [utils/auth.ts](src/utils/auth.ts)

```typescript
export function getToken(): string | null
export function setToken(token: string): void
export function removeToken(): void
export function getUserInfo(): UserInfo | null
export function setUserInfo(user: UserInfo): void
export function removeUserInfo(): void
export function clearAuth(): void
```

### 4.5 Excel 工具函数

#### [vendor/vue-utils/utils/export.ts](src/vendor/vue-utils/utils/export.ts)

```typescript
// 导出数据到 Excel
export function exportToExcel(
  data: any[],
  filename: string,
  headers?: Record<string, string>   // { 字段名: 中文表头 }
): void

// 读取 Excel 文件
export function readExcelFile(file: File): Promise<any[]>
```

### 4.6 持久化工具函数

#### [vendor/vue-utils/utils/persist.ts](src/vendor/vue-utils/utils/persist.ts)

```typescript
export interface PersistAPI {
  persist<T>(key: string, data: T): void
  restore<T>(key: string, defaultValue: T): T
  remove(key: string): void
}

// 创建带命名空间的持久化实例
export function createPersist(namespace: string): PersistAPI

// 默认实例（命名空间: student_era）
export const persist: (key: string, data: any) => void
export const restore: <T>(key: string, defaultValue: T) => T
export const removePersist: (key: string) => void
```

---

## 五、依赖关系

### 5.1 生产依赖

| 依赖 | 版本 | 用途 |
|:---|:---|:---|
| `vue` | ^3.5.33 | 渐进式前端框架，Composition API + `<script setup>` |
| `vue-router` | ^5.0.6 | 单页路由，Hash 模式 |
| `pinia` | ^3.0.4 | 状态管理，直接修改、DevTools 友好 |
| `element-plus` | ^2.13.7 | UI 组件库，企业级后台界面 |
| `@element-plus/icons-vue` | ^2.3.2 | Element Plus 图标集 |
| `echarts` | ^6.0.0 | 数据可视化图表库 |
| `vue-echarts` | ^8.0.1 | ECharts 的 Vue 声明式封装 |
| `axios` | ^1.15.2 | HTTP 客户端（预留后端对接） |
| `xlsx` | 0.20.3 (CDN) | Excel 文件读写 |

### 5.2 开发依赖

| 依赖 | 版本 | 用途 |
|:---|:---|:---|
| `vite` | ^8.0.10 | 构建工具，ESM 原生支持 |
| `@vitejs/plugin-vue` | ^6.0.6 | Vite Vue 插件 |
| `typescript` | ~6.0.3 | 静态类型检查 |
| `vue-tsc` | ^3.3.2 | Vue 单文件组件类型检查 |
| `eslint` | ^10.2.1 | 代码规范检查 |
| `typescript-eslint` | ^8.60.0 | TypeScript ESLint 规则 |
| `eslint-plugin-vue` | ^10.9.0 | Vue ESLint 规则 |
| `prettier` | ^3.8.3 | 代码格式化 |
| `sass` | ^1.99.0 | SCSS 预处理器 |
| `unplugin-auto-import` | ^21.0.0 | 自动导入 Element Plus 组件 |
| `unplugin-vue-components` | ^32.0.0 | 自动注册 Element Plus 组件 |

### 5.3 模块依赖图

```
main.ts
├── vue (createApp)
├── pinia (createPinia)
├── vue-router (router)
├── @element-plus/icons-vue (全局注册图标)
├── directives/permission.ts (v-permission)
├── vendor/echarts-config (ECharts 注册)
└── styles/index.scss (全局样式)

App.vue
├── AppLayout.vue (后台布局)
│   ├── Breadcrumb.vue
│   └── RouterView
└── RouterView (Portal/Login 直接渲染)

PortalLayout.vue
├── PortalBackground.vue
├── PortalNavbar.vue
├── PortalSettings.vue
└── RouterView

AppLayout.vue
├── Breadcrumb.vue
└── RouterView

各 View 组件
├── Pinia Stores (数据)
├── vendor/vue-utils (ChartPanel, DataCard, exportToExcel, etc.)
└── Element Plus 组件（自动导入）
```

---

## 六、项目运行方式

### 6.1 环境要求

- Node.js >= 18
- pnpm >= 8（推荐）

### 6.2 安装依赖

```bash
pnpm install
```

### 6.3 开发模式

```bash
pnpm dev
# → http://localhost:5173/edu-admin-pro/#/portal
```

Vite 开发服务器配置：
- 端口：5173
- 自动打开浏览器
- API 代理：`/api` → `http://localhost:8080`

### 6.4 测试账号

| 角色 | 账号 | 密码 |
|:---|:---|:---|
| 管理员 | `admin` | `admin123` |
| 教师 | `teacher` | `teacher123` |
| 学生 | `student` | `student123` |

### 6.5 构建生产环境

```bash
pnpm build
```

构建产物位于 `dist/` 目录，可直接部署到 Nginx / Vercel / GitHub Pages。

### 6.6 代码规范

```bash
# ESLint 检查并自动修复
pnpm lint

# Prettier 格式化
pnpm format
```

---

## 七、路由体系

### 7.1 路由配置总览

| 路径 | 名称 | 组件 | 登录要求 | 菜单权限 |
|:---|:---|:---|:---:|:---|
| `/login` | Login | LoginView.vue | 否 | - |
| `/portal` | PortalHome | portal/HomeView.vue | 否 | - |
| `/portal/academic` | PortalAcademic | portal/AcademicView.vue | 否 | - |
| `/portal/works` | PortalWorks | portal/WorksView.vue | 否 | - |
| `/portal/space` | PortalSpace | portal/SpaceView.vue | 否 | - |
| `/portal/about` | PortalAbout | portal/AboutView.vue | 否 | - |
| `/` | Home | HomeView.vue | 是 | Home |
| `/student` | Student | StudentView.vue | 是 | Student |
| `/teacher` | Teacher | TeacherView.vue | 是 | Teacher |
| `/course` | Course | CourseView.vue | 是 | Course |
| `/score` | Score | ScoreView.vue | 是 | Score |
| `/course-select` | CourseSelect | CourseSelectView.vue | 是 | CourseSelect |
| `/schedule` | Schedule | ScheduleView.vue | 是 | Schedule |
| `/evaluation` | Evaluation | EvaluationView.vue | 是 | Evaluation |
| `/operation-log` | OperationLog | OperationLogView.vue | 是 | OperationLog |
| `/about` | About | AboutView.vue | 是 | About |

### 7.2 路由守卫逻辑

```
router.beforeEach((to) => {
  1. 设置页面标题
  2. 公开页面(meta.public) → 直接放行
  3. 未登录用户:
     - 访问首页(/) → 重定向到 /portal
     - 访问其他后台路由 → 重定向到 /login
  4. 已登录用户检查菜单权限(meta.menu):
     - 无权限 → 重定向到首页(/)
  5. 放行
})
```

---

## 八、权限控制

### 8.1 菜单权限配置

```typescript
// utils/permission.ts
export const MENU_PERMISSIONS: Record<UserRole, string[]> = {
  admin:   ['Home', 'Student', 'Teacher', 'Course', 'Score', 'CourseSelect', 'Schedule', 'Evaluation', 'OperationLog', 'About'],
  teacher: ['Home', 'Student', 'Teacher', 'Course', 'Score', 'Evaluation', 'About'],
  student: ['Home', 'Course', 'Score', 'CourseSelect', 'Evaluation', 'About']
}
```

### 8.2 按钮权限配置

```typescript
export const BUTTON_PERMISSIONS: Record<string, string[]> = {
  'student:add':    ['admin'],
  'student:edit':   ['admin', 'teacher'],
  'student:delete': ['admin'],
  'teacher:add':    ['admin'],
  'teacher:edit':   ['admin'],
  'teacher:delete': ['admin'],
  'course:add':     ['admin'],
  'course:edit':    ['admin'],
  'course:delete':  ['admin'],
  'score:enter':    ['admin', 'teacher'],
  'score:audit':    ['admin'],
  'course:arrange': ['admin'],
  'course:select':  ['student'],
  'dict:manage':    ['admin'],
  'evaluation:view': ['admin', 'teacher'],
  'schedule:manage': ['admin'],
  'log:view':       ['admin']
}
```

### 8.3 权限指令使用

```vue
<!-- 按钮级权限控制 -->
<el-button v-permission="'student:add'">新增学生</el-button>
<el-button v-permission="'student:edit'">编辑</el-button>
<el-button v-permission="'student:delete'">删除</el-button>
```

指令在元素挂载时检查权限，无权限则自动从 DOM 中移除该元素。

---

## 九、状态管理

### 9.1 Store 清单

| Store | 文件 | 职责 |
|:---|:---|:---|
| `useAppStore` | [stores/index.ts](src/stores/index.ts) | 全局 UI 状态：侧边栏折叠、主题切换 |
| `useUserStore` | [stores/user.ts](src/stores/user.ts) | 用户认证：登录/登出/Token/权限校验 |
| `useStudentStore` | [stores/student.ts](src/stores/student.ts) | 学生数据：CRUD + localStorage 持久化 |
| `useTeacherStore` | [stores/teacher.ts](src/stores/teacher.ts) | 教师数据：CRUD + localStorage 持久化 |
| `useCourseStore` | [stores/course.ts](src/stores/course.ts) | 课程数据：CRUD + localStorage 持久化 |
| `useScoreStore` | [stores/score.ts](src/stores/score.ts) | 成绩数据：CRUD + 权重计算 + GPA |
| `useCourseSelectStore` | [stores/courseSelect.ts](src/stores/courseSelect.ts) | 选课数据：选课/退课 + 学分上限控制 |
| `useScheduleStore` | [stores/schedule.ts](src/stores/schedule.ts) | 排课数据：教室/时间/周次 + 冲突检测 |
| `useDictStore` | [stores/dict.ts](src/stores/dict.ts) | 字典数据：学院/专业/年级/性别等基础数据 |
| `useLogStore` | [stores/log.ts](src/stores/log.ts) | 操作日志：记录用户操作时间/人/模块/动作/状态/IP |
| `usePortalStore` | [stores/portal.ts](src/stores/portal.ts) | Portal 配置：背景/模块/自定义卡片 |
| `useThemeStore` | [stores/theme.ts](src/stores/theme.ts) | 主题状态：深色/浅色模式 |
| `useAchievementStore` | [stores/achievements.ts](src/stores/achievements.ts) | 成就数据：时间线形式的教育/竞赛/证书成就 |
| `useArticleStore` | [stores/articles.ts](src/stores/articles.ts) | 文章数据：技术随笔、学术论文 |
| `useMomentStore` | [stores/moments.ts](src/stores/moments.ts) | 动态数据：类朋友圈短图文动态流 |
| `usePhotoStore` | [stores/photos.ts](src/stores/photos.ts) | 照片数据：照片墙图片列表 |

### 9.2 持久化策略

业务数据 Store（student/teacher/course/score 等）使用 `vendor/vue-utils/utils/persist.ts` 中的 `persist`/`restore` 函数将数据保存到 localStorage，实现页面刷新后数据不丢失。

Portal 配置 Store 使用独立的 `STORAGE_KEY = 'portal-config-v1'` 进行持久化。

---

## 十、数据可视化

### 10.1 ECharts 集成方案

ECharts 6 采用**显式注册**模式，必须在 `init()` 前注册渲染器和组件：

```typescript
// src/vendor/echarts-config/index.ts
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, PieChart, LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components'

use([CanvasRenderer, BarChart, PieChart, LineChart, GridComponent, TooltipComponent, LegendComponent, TitleComponent])
```

### 10.2 图表组件封装

使用 `vue-echarts` 替代原生命令式 API：

```vue
<template>
  <v-chart class="chart-panel" :option="option" autoresize />
</template>
```

[ChartPanel.vue](src/vendor/vue-utils/components/ChartPanel.vue) 封装了图表面板，支持自动 resize。

### 10.3 已实现的图表

| 图表 | 类型 | 位置 | 数据源 |
|:---|:---|:---|:---|
| 各院系学生人数分布 | 柱状图 | HomeView | Mock 数据 |
| 学生性别比例 | 饼图 | HomeView | Store 动态计算 |
| 近五年招生趋势 | 折线图（面积） | HomeView | Mock 数据 |
| 成绩分段分布 | 柱状图（多色） | StudentView / ScoreView | Store 动态计算 |
| 专业人数占比 | 饼图 | StudentView | Mock 数据 |
| 绩点分布 | 环形图 | ScoreView | Store 动态计算 |
| 课程类型占比 | 饼图 | HomeView | Store 动态计算 |
| 技能雷达 | 雷达图 | portal/HomeView | 静态配置 |

---

## 十一、构建与部署

### 11.1 Vite 构建配置

[ vite.config.ts](vite.config.ts) 关键配置：

| 配置项 | 值 | 说明 |
|:---|:---|:---|
| `base` | `/edu-admin-pro/` | 部署基础路径 |
| `resolve.alias['@']` | `./src` | 路径别名 |
| `css.preprocessorOptions.scss.additionalData` | `@use "@/styles/variables.scss" as *;` | 全局 SCSS 变量注入 |
| `server.port` | `5173` | 开发服务器端口 |
| `server.proxy['/api']` | `http://localhost:8080` | API 代理 |
| `build.target` | `esnext` | 构建目标 |
| `build.chunkSizeWarningLimit` | `1000` | chunk 体积警告阈值 (KB) |

### 11.2 构建产物分块策略

```
assets/
├── index-xxx.js              (11.5 kB)    业务入口 + Router
├── vue-vendor-xxx.js         (109 kB)     Vue + Router + Pinia
├── ui-vendor-xxx.js          (1,033 kB)   Element Plus
├── echarts-vendor-xxx.js     (526 kB)     ECharts + vue-echarts
├── export-xxx.js             (425 kB)     xlsx 库（按需加载）
├── student-xxx.js            (39 kB)      StudentView 懒加载 chunk
└── [view]-xxx.js             (2~11 kB)    其他视图懒加载 chunk
```

### 11.3 GitHub Actions 部署

[.github/workflows/deploy.yml](.github/workflows/deploy.yml) 配置自动构建并部署到 GitHub Pages。

### 11.4 项目健康状态

| 检查项 | 状态 | 说明 |
|:---|:---:|:---|
| 生产构建 | 通过 | `pnpm build` 完成 |
| 类型检查 | 通过 | `vue-tsc --noEmit` 0 错误 |
| 代码规范 | 通过 | ESLint 9 + Prettier 已配置 |
| 路由导航 | 正常 | Hash 模式 + 手动 `router.push()` + `:key` 强制刷新 |
| ECharts 渲染 | 正常 | CanvasRenderer 显式注册 + vue-echarts 封装 |
| 权限控制 | 正常 | 3 角色菜单过滤 + 按钮指令生效 |
| Excel 导入导出 | 正常 | xlsx 库按需加载 chunk |

---

## 附录：文件索引速查

### 入口与配置
- [main.ts](src/main.ts) — 应用入口
- [App.vue](src/App.vue) — 根组件
- [vite.config.ts](vite.config.ts) — Vite 配置
- [tsconfig.json](tsconfig.json) — TypeScript 配置
- [eslint.config.mjs](eslint.config.mjs) — ESLint 配置
- [prettier.config.mjs](prettier.config.mjs) — Prettier 配置

### 路由
- [router/index.ts](src/router/index.ts) — 路由入口
- [router/portal.ts](src/router/portal.ts) — Portal 路由
- [router/admin.ts](src/router/admin.ts) — 后台路由

### 布局
- [layouts/PortalLayout.vue](src/layouts/PortalLayout.vue) — Portal 布局
- [components/AppLayout.vue](src/components/AppLayout.vue) — 后台布局

### 核心工具
- [utils/auth.ts](src/utils/auth.ts) — 认证工具
- [utils/permission.ts](src/utils/permission.ts) — 权限工具
- [api/request.ts](src/api/request.ts) — HTTP 请求
- [directives/permission.ts](src/directives/permission.ts) — 权限指令

### 核心 Store
- [stores/user.ts](src/stores/user.ts) — 用户认证
- [stores/portal.ts](src/stores/portal.ts) — Portal 配置
- [stores/student.ts](src/stores/student.ts) — 学生数据

### 类型定义
- [types/user.ts](src/types/user.ts) — 用户类型
- [types/portal.ts](src/types/portal.ts) — Portal 类型
- [types/index.ts](src/types/index.ts) — 通用类型
- [types/course.ts](src/types/course.ts) — 课程类型

### Vendor 封装
- [vendor/echarts-config/index.ts](src/vendor/echarts-config/index.ts) — ECharts 注册
- [vendor/vue-utils/index.ts](src/vendor/vue-utils/index.ts) — 工具库导出
- [vendor/vue-utils/utils/export.ts](src/vendor/vue-utils/utils/export.ts) — Excel 工具
- [vendor/vue-utils/utils/persist.ts](src/vendor/vue-utils/utils/persist.ts) — 持久化工具
- [vendor/vue-utils/composables/useChart.ts](src/vendor/vue-utils/composables/useChart.ts) — ECharts Composable
