# 🎓 教务数据可视化管理系统

> **2026 Spring · 《Web前端开发技术》课程设计 — 网页组**
>
> 基于 Vue 3 + TypeScript + Vite 的现代化前端项目，融合个人主页展示、学校门户入口与教务管理后台三大板块。

---

<p align="center">
  <img src="https://img.shields.io/badge/Vue-3.5.34-4FC08D?style=flat-square&logo=vue.js" alt="Vue">
  <img src="https://img.shields.io/badge/TypeScript-5.7.3-3178C6?style=flat-square&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-8.0.14-646CFF?style=flat-square&logo=vite" alt="Vite">
  <img src="https://img.shields.io/badge/Element%20Plus-2.14.0-409EFF?style=flat-square" alt="Element Plus">
  <img src="https://img.shields.io/badge/ECharts-6.1.0-AA344D?style=flat-square" alt="ECharts">
  <img src="https://img.shields.io/badge/license-Private-red?style=flat-square" alt="License">
</p>

---

## 📋 项目总览

本项目由三大板块构成，覆盖"展示 → 入口 → 管理"的完整用户体验链路：

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

---

## 🏠 一、个人主页 (Portal Landing Page)

### 设计定位

面向访客的公开展示页，融合"在校学生 + GitHub 开发者 + Steam 游戏玩家"三重身份。采用 **Glassmorphism（毛玻璃拟态）** 设计语言，纯 SCSS 实现，零 Tailwind 依赖。

### 访问路径

```
/portal          → 首页（个人名片 + 学校数据 + 技能雷达）
/portal/academic → 学业中心（课程表 + 文章 + 成就）
/portal/works    → 作品集（项目展示 + 照片墙 + Steam 游戏）
/portal/space    → 个人空间（动态说说 + 自定义卡片）
/portal/about    → 关于（扩展简历 + 联系方式）
/                → 未登录用户自动重定向到 /portal
/login           → 从 Portal 页点击"进入系统"跳转
```

所有 `/portal/*` 路由均为**公开访问**，无需登录。顶部导航栏提供子页面切换。

### 页面模块

| 模块 | 说明 | 数据来源 |
|:---|:---|:---|
| **个人名片** | 真实 GitHub 头像、学校标签、社交按钮 | `src/data/profile.ts` |
| **学校统计** | 在校学生 / 开设课程 / 专任教师 / 科研成果 | 静态配置 |
| **快速链接** | 选课规划 · 成绩分析 · 课表编排 · 教务入口 | 静态配置 |
| **课程表** | 周视图课程网格，支持可见性控制（公开/私密/白名单） | localStorage 持久化 |
| **身份卡片** | 学生 / 开发者 / Steam 玩家 三栏卡片 | 静态配置 |
| **文章展示** | 技术随笔、学术论文，支持 Markdown 详情 | localStorage 持久化 |
| **获奖成就** | 时间线形式的教育/竞赛/证书成就 | localStorage 持久化 |
| **项目展示** | 6 个真实 GitHub 仓库，OpenGraph 封面 | GitHub API 抓取 |
| **游戏时光** | Steam 最近在玩 + 游戏档案统计 | Steam 公开页面抓取 |
| **照片墙** | 网格布局图片展示，支持预览 | localStorage 持久化 |
| **动态说说** | 类朋友圈短图文动态流 | localStorage 持久化 |
| **技能雷达** | ECharts 雷达图，6 维度能力值 | 静态配置 |
| **自定义卡片** | 用户可自由添加的链接卡片 | localStorage 持久化 |
| **底部状态栏** | 翻页时钟 + 运行时间 + 技术栈徽章 | 静态配置 |

### 可定制化

点击导航栏齿轮图标打开**页面设置面板**：

- **背景**：渐变（双色调色器 + 10 种方向 + 流动动画开关）/ 纯色 / 图片 URL
- **模块管理**：14 个模块独立开关 + 拖拽排序
- **自定义卡片**：自由添加标题/描述/URL/颜色/图标的链接卡片
- **主题切换**：深色/浅色模式，localStorage 持久化

### 真实账号接入

| 平台 | 账号 | 数据 |
|:---|:---|:---|
| GitHub | [juice094](https://github.com/juice094) | 18 仓库，4 followers |
| Steam | [76561199284361018](https://steamcommunity.com/profiles/76561199284361018/) | Lv.109，513 游戏，230 完美通关 |

---

## 🏫 二、学校页面 (School Portal)

### 设计定位

与个人主页融为一体的学校门户区域，位于 Portal 页上半部分，提供校园数据概览和常用功能快速入口。

### 模块构成

| 模块 | 说明 |
|:---|:---|
| **学校统计栏** | 在校学生(12,486) / 开设课程(342) / 专任教师(1,247) / 科研成果(156) |
| **快速链接** | 选课规划 · 成绩分析 · 课表编排 · 教务入口，点击跳转对应后台路由 |
| **品牌标识** | 导航栏显示"GSAU · 教务数据可视化系统" |

### 样式特征

- 与下方个人展示区共用 Glassmorphism 风格
- 玻璃卡片：`backdrop-filter: blur(12px)` + `rgba(255,255,255,0.4)`
- 暗色模式自动适配
- 响应式：手机 1-2 列，平板/桌面 4 列

---

## ⚙️ 三、教务系统 (Admin Dashboard)

### 设计定位

登录后的后台管理系统，基于 Element Plus 的企业级 UI，覆盖教务管理全业务流程。

### 技术栈

| 技术 | 版本 | 用途 |
|:---|:---|:---|
| Vue | 3.5.34 | Composition API + `<script setup>` |
| Vite | 8.0.14 | Rolldown 构建引擎 |
| TypeScript | 5.7.3 | 严格模式，全链路类型安全 |
| Pinia | 3.0.4 | 状态管理 |
| Vue Router | 5.0.7 | Hash 模式，路由守卫 |
| Element Plus | 2.13.7 | UI 组件库 |
| ECharts | 6.1.0 | 数据可视化 |

### 功能模块

#### 基础功能
- **登录认证**：JWT Token + LocalStorage，支持管理员/教师/学生三角色
- **RBAC 权限**：菜单级过滤 + 按钮级 `v-permission` 指令
- **动态菜单**：侧边栏根据角色自动渲染
- **字典管理**：学院、专业、年级、课程类型等基础数据

#### 核心业务
- **学生管理**：CRUD + 删除撤销 + 成绩/专业分布图表
- **教师管理**：教师信息维护，与课程系统关联
- **课程管理**：课程信息维护，绑定授课教师
- **成绩管理**：权重动态配置，自动计算总评与 GPA

#### 高级业务
- **学生选课**：容量进度条，学分上限 30 分控制
- **排课管理**：教室/时间/周次安排，冲突自动检测
- **教学评教**：五维评分 + 参评率统计

#### 运维运营
- **审计日志**：操作时间/人/模块/动作/状态/IP
- **Excel 导入导出**：学生/课程/成绩批量处理
- **数据大屏**：首页 Dashboard 多维度图表

---

## ✨ Glass → Portal 特效与交互迁移（v2.1.0）

本阶段将 [Personal-Blog-Glass](https://github.com/juice094/Personal-Blog-Glass) 的视觉特效层与交互系统迁移至 Portal，以 Vue 3 原生能力重写，核心约束为**渲染性能**与**布局稳定性**。

### 新增特效系统

| 特效 | 技术方案 | 性能策略 |
|:---|:---|:---|
| **粒子背景** | 统一 Canvas 渲染层（1 Canvas 替代 295 DOM 节点） | `contain: layout paint` · `IntersectionObserver` · DPR 上限 2x · 后台降频 |
| **点击波纹** | Canvas 2D + `requestAnimationFrame` | 涟漪上限 20 个 · `prefers-reduced-motion` 检测 |
| **页面过渡** | Vue 3 `<Transition name="page">` | `transform` + `opacity` 仅 GPU 属性动画 |
| **Toast 通知** | `<Teleport to="body">` + CSS transition | 最多 3 个堆叠 · 3s 自动消失 |

### 粒子主题类型

- 萤火虫（深色模式默认）
- 樱花（浅色模式默认）
- 风动草地
- 全局飘雪
- 弹幕背景

### 布局稳定性优化

| 优化项 | 修复前 | 修复后 |
|:---|:---|:---|
| HomeView 卡片高度不均 | `align-items: start` 导致高低错位 | `align-items: stretch` + flex wrapper 等高分发 |
| ProfileCard 半宽不触发宽版 | `@container 768px` 半宽容器(~668px)永不触发 | 断点降至 `560px`，半宽/全宽均正常响应 |
| ProfileCard 右边界溢出 | `content-box` + `width: 100%` + padding 撑出 42px | `box-sizing: border-box` 严格约束 |
| 窄容器内卡片挤压 | viewport `@media` 在嵌套容器中失效 | `auto-fit` + `minmax()` 容器自适应网格 |
| 空数据页面空白 | 无内容时组件完全消失 | 各模块添加空状态占位提示 |
| Avatar 加载失败 | 外部图片 404 时显示裂图 | `@error` 回退到 `DEFAULT_AVATAR` |

### 性能对比

| 指标 | Glass (DOM 方案) | Portal (Canvas 方案) |
|:---|:---|:---|
| 粒子节点数 | 295 DOM 元素 | 1 `<canvas>` |
| 内存占用 | ~300 DOM + 计算样式 | 1 Canvas + JS 数组 |
| 渲染方式 | CSS `transform` × 295 | 单 draw call / 帧 |
| 后台标签页 | 持续运行 | `visibilityState` 检测自动降频/暂停 |
| 无障碍 | 无 | `prefers-reduced-motion` 完全禁用 |

---

## 🚀 快速开始

### 环境要求

- Node.js ≥ 18
- pnpm ≥ 8（推荐）

### 安装与启动

```bash
# 克隆仓库
git clone https://github.com/juice094/course-design-web-frontend.git
cd course-design-web-frontend

# 安装依赖
pnpm install

# 开发模式
pnpm dev
# → http://localhost:5173/edu-admin-pro/#/portal
```

### 访问路径

| 路径 | 说明 | 登录要求 |
|:---|:---|:---:|
| `/#/portal` | 个人主页首页 | 否 |
| `/#/portal/academic` | 学业中心（课程表/文章/成就） | 否 |
| `/#/portal/works` | 作品集（项目/照片墙/Steam） | 否 |
| `/#/portal/space` | 个人空间（动态/自定义卡片） | 否 |
| `/#/portal/about` | 关于页 | 否 |
| `/#/login` | 登录页 | 否 |
| `/#/` | 后台首页（数据大屏） | 是 |
| `/#/panel/users` | 用户数据 | 是 |
| `/#/panel/staff` | 人员档案 | 是 |
| `/#/panel/courses` | 课程资源 | 是 |
| `/#/panel/grades` | 成绩分析 | 是 |
| `/#/panel/enrollment` | 选课规划 | 是 |
| `/#/panel/timetable` | 课表编排 | 是 |
| `/#/panel/reviews` | 教学评价 | 是 |
| `/#/panel/logs` | 操作记录 | 是 |
| `/#/system` | 系统信息 | 是 |

### 测试账号

| 角色 | 账号 | 密码 |
|:---|:---|:---|
| 管理员 | `admin` | `admin123` |
| 教师 | `teacher` | `teacher123` |
| 学生 | `student` | `student123` |

### 构建

```bash
pnpm build
```

---

## 📁 项目结构

```
course-design-web-frontend/
├── src/
│   ├── components/
│   │   ├── effects/                # 特效系统（Glass 迁移）
│   │   │   ├── ParticleCanvas.vue      # 统一 Canvas 粒子背景
│   │   │   ├── ClickRipple.vue         # 点击波纹特效
│   │   │   ├── PageTransition.vue      # 页面过渡动画
│   │   │   └── ToastContainer.vue      # Toast 通知容器
│   │   ├── portal/                 # Portal 页面组件（17+ 个）
│   │   │   ├── PortalBackground.vue    # 渐变流动背景
│   │   │   ├── PortalNavbar.vue        # 顶部玻璃导航（含子页面菜单）
│   │   │   ├── PortalSettings.vue      # 页面设置面板
│   │   │   ├── ProfileCard.vue         # 个人名片（容器查询响应式）
│   │   │   ├── SchoolStats.vue         # 学校数据概览
│   │   │   ├── SchoolQuickLinks.vue    # 快速功能入口
│   │   │   ├── IdentityCards.vue       # 三重身份卡片
│   │   │   ├── CourseSchedule.vue      # 课程表周视图
│   │   │   ├── ArticlesSection.vue     # 文章展示（含 Markdown 详情）
│   │   │   ├── AchievementsTimeline.vue # 成就时间线
│   │   │   ├── ProjectShowcase.vue     # GitHub 项目展示
│   │   │   ├── SteamHub.vue            # Steam 游戏展示
│   │   │   ├── PhotoWall.vue           # 照片墙
│   │   │   ├── MomentsFeed.vue         # 动态说说
│   │   │   ├── SkillsRadar.vue         # 技能雷达图
│   │   │   ├── SiteDashboard.vue       # 底部状态栏
│   │   │   ├── CustomCards.vue         # 用户自定义卡片
│   │   │   ├── SocialButton.vue        # 社交图标按钮
│   │   │   ├── SettingsScheduleEditor.vue    # 课程设置编辑器
│   │   │   ├── SettingsArticleEditor.vue     # 文章设置编辑器
│   │   │   ├── SettingsPhotoEditor.vue       # 照片设置编辑器
│   │   │   ├── SettingsMomentEditor.vue      # 动态设置编辑器
│   │   │   └── SettingsAchievementEditor.vue # 成就设置编辑器
│   │   ├── AppHeader.vue           # 后台顶部导航
│   │   ├── AppLayout.vue           # 后台布局框架
│   │   └── ...
│   ├── layouts/
│   │   └── PortalLayout.vue        # Portal 共享布局（背景 + 导航 + 设置面板 + 特效挂载）
│   ├── views/
│   │   ├── portal/
│   │   │   ├── HomeView.vue        # 首页（12 列网格 + 编辑模式）
│   │   │   ├── AcademicView.vue    # 学业中心（课程表 + 文章 + 成就）
│   │   │   ├── WorksView.vue       # 作品集（项目 + 照片墙 + Steam）
│   │   │   ├── SpaceView.vue       # 个人空间（动态 + 自定义卡片）
│   │   │   └── AboutView.vue       # 关于页（扩展简历 + 联系方式）
│   │   ├── LoginView.vue           # 登录页
│   │   ├── HomeView.vue            # 后台首页（数据大屏）
│   │   ├── StudentView.vue         # 学生管理
│   │   ├── CourseView.vue          # 课程管理
│   │   ├── ScoreView.vue           # 成绩管理
│   │   └── ...
│   ├── stores/
│   │   ├── portal.ts               # Portal 配置状态（背景/模块/卡片/布局）
│   │   ├── effects.ts              # 粒子特效配置（开关/类型/密度/省电模式）
│   │   ├── toast.ts                # Toast 通知队列
│   │   ├── theme.ts                # 暗色模式状态
│   │   ├── schedule.ts             # 课程表数据 + 可见性控制
│   │   ├── articles.ts             # 文章数据
│   │   ├── photos.ts               # 照片墙数据
│   │   ├── moments.ts              # 动态说说数据
│   │   ├── achievements.ts         # 成就时间线数据
│   │   ├── user.ts                 # 用户认证状态
│   │   └── ...
│   ├── data/
│   │   └── profile.ts              # 个人资料静态配置
│   ├── router/
│   │   └── index.ts                # 路由 + 未登录重定向
│   ├── App.vue                     # 根组件（Portal/Login 跳过 Layout）
│   └── main.ts                     # 应用入口
├── docs/
│   └── 《大数据可视化》课程设计报告.doc
├── index.html                      # 引入 Noto Serif SC 字体
├── package.json
├── vite.config.ts
└── README.md
```

---

## 🎨 设计规范

### Portal 页面（Glassmorphism）

```css
/* 玻璃卡片核心样式 */
background: rgba(255, 255, 255, 0.4);
backdrop-filter: blur(12px);
-webkit-backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.4);
box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
border-radius: 1.5rem;  /* 24px 大圆角 */

/* 暗色模式 */
.dark .card {
  background: rgba(30, 41, 59, 0.5);
  border-color: rgba(255, 255, 255, 0.1);
}
```

### 响应式策略

Portal 采用**容器查询（Container Queries）**替代传统视口媒体查询，确保组件在任意嵌套宽度下都能正确响应：

```css
/* ProfileCard 基于自身容器宽度响应 */
@container profile (min-width: 560px) {
  .profile-footer { flex-direction: row; }
}
```

Grid 布局使用 `auto-fit` + `minmax()` 实现容器自适应列数：

```css
/* 自动适配列数，无需 breakpoint */
grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
```

### 性能优化清单

| 技术 | 应用位置 | 目的 |
|:---|:---|:---|
| `contain: layout paint` | 特效层 Canvas / 浮动组件 | 隔离渲染，避免触发全局重排 |
| `will-change: transform, opacity` | 动画元素（仅在动画时添加） | 提前提升为合成层，GPU 加速 |
| `box-sizing: border-box` | 所有卡片组件 | 消除 padding 导致的宽度溢出 |
| `content-visibility: auto` | 离屏模块 / 长列表卡片 | 延迟渲染不可见内容 |
| `IntersectionObserver` | Canvas 粒子系统 | 视口外暂停动画 |
| `document.visibilityState` | 所有 `requestAnimationFrame` | 后台标签页降频/暂停 |
| `prefers-reduced-motion` | 所有动画 CSS / JS | 尊重用户无障碍偏好 |
| `Math.min(devicePixelRatio, 2)` | Canvas 初始化 | 限制高 DPR 填充压力 |

---

## 🔧 开发规范

### Git 工作流

```bash
# 功能分支开发
git checkout -b feature/portal-landing
git add .
git commit -m "feat: 添加 Portal 首页"
git push origin feature/portal-landing

# 合并到 main（通过 Pull Request）
```

### 提交规范

| 类型 | 说明 | 示例 |
|:---|:---|:---|
| `feat:` | 新功能 | `feat(portal): 添加玻璃拟态背景` |
| `fix:` | Bug 修复 | `fix(router): 修复未登录重定向逻辑` |
| `style:` | 格式/样式 | `style(portal): 修复 ESLint 警告` |
| `docs:` | 文档更新 | `docs: 更新 README 三板块说明` |
| `perf:` | 性能优化 | `perf(effects): Canvas 替代 DOM 粒子渲染` |

---

## ⚠️ 已知问题

| 问题 | 状态 | 备注 |
|:---|:---:|:---|
| 依赖 `@student-era/*` 已移除 | ✅ 已解决 | vendor 到 `src/vendor/` |
| `ui-vendor` chunk 体积大 (~650KB gzip) | 🟡 可优化 | 考虑按需引入 Element Plus |
| Steam 数据为静态配置 | 🟡 可扩展 | 需后端代理 Steam Web API |
| GitHub API rate limit (60/h) | 🟡 可扩展 | 生产环境建议后端缓存 |
| Glass → Portal 迁移 v2.1.0 | ✅ 已完成 | 粒子特效/Toast/波纹/过渡动画 |
| 后台路由课堂友好重命名 | ✅ 已完成 | `/panel/*` 替代管理语义路径 |
| SchoolStats 计数动画 + 渐变数字 | ✅ 已完成 | 1.5s easeOutCubic 滚动 |
| 编辑模式尺寸按钮 Lucide 图标 | ✅ 已完成 | Maximize2 / Columns2~4 |

---

## 📄 License

Private — 仅限 2026 Spring 《Web前端开发技术》课程设计小组内部使用。

---

<p align="center">
  <sub>Built with ❤️ by 2026 Spring Web前端开发技术课程设计小组</sub>
</p>
