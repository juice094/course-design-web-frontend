# 🎓 教务数据可视化管理系统

> **2026 Spring · 《Web前端开发技术》课程设计 — 网页组**
>
> 基于 Vue 3 + TypeScript + Vite 的现代化前端项目，原身「大数据可视化课程设计」，现作为课程设计网页组开发基础。

---

<p align="center">
  <img src="https://img.shields.io/badge/Vue-3.5.13-4FC08D?style=flat-square&logo=vue.js" alt="Vue">
  <img src="https://img.shields.io/badge/TypeScript-5.7.3-3178C6?style=flat-square&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-6.3.2-646CFF?style=flat-square&logo=vite" alt="Vite">
  <img src="https://img.shields.io/badge/Element%20Plus-2.9.7-409EFF?style=flat-square" alt="Element Plus">
  <img src="https://img.shields.io/badge/ECharts-5.6.0-AA344D?style=flat-square" alt="ECharts">
  <img src="https://img.shields.io/badge/license-Private-red?style=flat-square" alt="License">
</p>

---

## 📋 项目简介

本项目是一个面向高校的**教务数据可视化管理系统**，采用 Vue 3 全家桶构建，覆盖教务管理的核心业务流程，包括学生/教师/课程/成绩的基础 CRUD、学生选课、课程排课、教学评价、操作审计以及数据可视化大屏展示。

相较于传统基于 Vue 2 + Vue CLI + Vuex 的教务系统，本项目在构建速度、类型安全、代码组织、图表性能等方面进行了全面升级。

---

## 🏗️ 技术架构

### 核心依赖

| 技术 | 版本 | 用途 |
|------|------|------|
| **Vue** | 3.5.13 | 渐进式前端框架，Composition API |
| **Vite** | 6.3.2 | 下一代前端构建工具，ESM 原生支持 |
| **TypeScript** | 5.7.3 | 静态类型检查，全链路类型安全 |
| **Pinia** | 3.0.1 | 状态管理，直接修改、DevTools 友好 |
| **Vue Router** | 4.5.0 | 单页路由，Hash 模式，路由守卫 |
| **Element Plus** | 2.9.7 | UI 组件库，企业级后台界面 |
| **ECharts** | 5.6.0 | 数据可视化图表库 |
| **vue-echarts** | 7.0.3 | ECharts 的 Vue 声明式封装 |
| **xlsx** | 0.18.5 | Excel 文件读写（导入/导出） |

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
│  OperationLog │ About                          │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│          组件层 (Component Layer)            │
│  AppLayout │ ChartPanel │ DataCard           │
│  Breadcrumb │ StudentFormDialog              │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│          状态层 (Pinia Store Layer)          │
│  user │ student │ teacher │ course │ score   │
│  courseSelect │ log │ dict                   │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│           工具层 (Utility Layer)             │
│  auth │ permission │ export │ format         │
│  request (Axios + interceptors)              │
└─────────────────────────────────────────────┘
```

---

## 🚀 快速开始

### 环境要求

- Node.js ≥ 18
- pnpm ≥ 8（推荐）或 npm/yarn

### 安装依赖

```bash
# 克隆仓库
git clone https://github.com/juice094/course-design-web-frontend.git
cd course-design-web-frontend

# 安装依赖
pnpm install
```

### 开发模式

```bash
pnpm dev
# → http://localhost:5173
```

### 登录账号（内置）

| 角色 | 账号 | 密码 |
|------|------|------|
| 管理员 | `admin` | `admin123` |
| 教师 | `teacher` | `teacher123` |
| 学生 | `student` | `student123` |

### 生产构建

```bash
pnpm build
```

构建产物位于 `dist/` 目录，可直接部署到 Nginx / Vercel / GitHub Pages。

---

## ✨ 功能特性

### 基础功能

- **登录认证**：JWT Token + LocalStorage 持久化，支持 3 种角色登录
- **RBAC 权限**：菜单级过滤 + 按钮级指令（`v-permission`）
- **动态菜单**：侧边栏根据角色自动渲染，支持折叠/展开
- **字典管理**：学院、专业、年级、性别、课程类型、学期等基础数据
- **布局框架**：侧边栏 + 顶部 Header（面包屑 + 用户下拉）+ 内容区

### 核心业务

- **学生管理**：新增/编辑/删除，删除后 8 秒内可撤销，成绩/专业分布图表
- **教师管理**：教师信息 CRUD，与课程系统关联
- **课程管理**：课程信息维护，绑定授课教师和开课学院
- **成绩管理**：成绩录入（平时/期中/期末），权重动态配置，自动计算总评与 GPA，成绩分布 + 绩点饼图

### 高级业务

- **学生选课**：可选课程列表展示（容量进度条），学分上限 30 分控制，一键选课/退课
- **排课管理**：教室/时间段/周次安排，自动检测教室冲突和教师冲突
- **学生评教**：五维评分（教学态度/内容/方法/互动/效果），参评率统计，学生留言精选

### 运维运营

- **审计日志**：记录用户操作时间/人/模块/动作/状态/IP，支持多维度筛选
- **Excel 导出**：学生/课程/成绩数据一键导出 `.xlsx`
- **Excel 导入**：学生/课程数据通过 Excel 批量导入
- **数据大屏**：首页 Dashboard：KPI 卡片 + 院系分布 + 性别比例 + 成绩分布 + 课程类型占比 + 招生趋势

---

## 📁 项目结构

```
course-design-web-frontend/
├── .github/workflows/           # CI/CD 配置
├── .vscode/                    # VS Code 配置
├── public/                     # 静态资源
├── src/
│   ├── api/                    # API 接口层
│   │   ├── modules/            # 按模块组织的 API
│   │   └── request.ts          # Axios 封装 + 拦截器
│   ├── components/             # 公共组件
│   │   ├── AppHeader.vue       # 顶部导航
│   │   ├── AppLayout.vue       # 布局框架
│   │   ├── Breadcrumb.vue      # 面包屑
│   │   ├── ChartPanel.vue      # 图表面板（来自 vendor）
│   │   ├── DataCard.vue        # 数据卡片（来自 vendor）
│   │   └── StudentFormDialog.vue # 学生表单弹窗
│   ├── directives/             # 自定义指令
│   │   └── permission.ts       # v-permission 权限指令
│   ├── router/                 # 路由配置
│   │   └── index.ts            # 路由表 + 路由守卫
│   ├── stores/                 # Pinia 状态管理
│   │   ├── course.ts
│   │   ├── courseSelect.ts
│   │   ├── dict.ts
│   │   ├── index.ts            # Store 入口
│   │   ├── log.ts
│   │   ├── score.ts
│   │   ├── student.ts
│   │   ├── teacher.ts
│   │   └── user.ts
│   ├── styles/                 # 全局样式
│   │   ├── index.scss
│   │   └── variables.scss      # SCSS 变量
│   ├── types/                  # TypeScript 类型定义
│   │   ├── course.ts
│   │   ├── index.ts
│   │   ├── score.ts
│   │   ├── teacher.ts
│   │   └── user.ts
│   ├── utils/                  # 工具函数
│   │   ├── auth.ts             # 认证相关
│   │   └── permission.ts       # 权限校验
│   ├── vendor/                 # Vendor 依赖（原 workspace 包）
│   │   ├── echarts-config/     # ECharts 5 渲染器/组件注册
│   │   └── vue-utils/          # 可复用组件/工具/组合式函数
│   ├── views/                  # 页面视图
│   │   ├── AboutView.vue
│   │   ├── CourseSelectView.vue
│   │   ├── CourseView.vue
│   │   ├── EvaluationView.vue
│   │   ├── HomeView.vue          # 首页数据大屏
│   │   ├── LoginView.vue
│   │   ├── OperationLogView.vue
│   │   ├── ScheduleView.vue
│   │   ├── ScoreView.vue
│   │   ├── StudentView.vue
│   │   └── TeacherView.vue
│   ├── App.vue                 # 根组件
│   └── main.ts                 # 应用入口
├── docs/                       # 文档
│   └── 《大数据可视化》课程设计报告.doc  # 原项目报告
├── index.html                  # HTML 模板
├── package.json                # 依赖管理
├── vite.config.ts              # Vite 配置
├── tsconfig.json               # TypeScript 配置
└── README.md                   # 本文件
```

---

## 🎓 课程设计改造计划

### 背景

本项目原身为「大数据可视化课程设计」项目，现作为《Web前端开发技术》课程设计网页组的开发基础。课程设计要求：

- 每组代码量 ≥ **10000 行**，人均 ≥ **2000 行**
- 使用 **HTML5 / CSS3 / JavaScript**，代码加必要注释
- 涉及表单必须做**有效性验证**
- 使用关键技术：CSS3、DIV 布局、CSS MENU、jQuery、BootStrap 等

### 改造方向

| 优先级 | 任务 | 说明 |
|:---:|:---|:---|
| P0 | **添加代码注释** | 现有代码注释不足，需补充以符合课程要求 |
| P0 | **手写 CSS 展示** | 课程要求展示 CSS3/DIV 布局能力，需补充传统 CSS 版本或详细说明 |
| P1 | **主题改造** | 从教务系统主题 → 课程设计任务 A/B/C（高校/企业/协会）主题 |
| P1 | **配色与 Logo** | 调整 Element Plus 主题色，替换 Logo |
| P1 | **表单验证增强** | 补充更多表单的前端验证逻辑 |
| P2 | **响应式适配** | 当前为桌面端优先，补充移动端断点适配 |
| P2 | **功能扩展** | 根据组员人数扩展模块，确保代码量达标 |

### 技术说明

> **Q: 课程设计只要求 HTML/CSS/JS，我们用 Vue 算不算违规？**
>
> **A: 不算。** Vue 最终编译输出就是 HTML/CSS/JS。但报告里需要解释技术选型，展示你"懂"底层原理。本项目包含大量手写 CSS（SCSS）、原生 JavaScript 逻辑（TypeScript 编译后）、以及标准 HTML 模板（Vue SFC 中的 template）。

---

## 👥 组员分工建议

| 方向 | 工作内容 | 预估代码量 | 适合技能 |
|:---|:---|:---:|:---|
| **UI/主题改造** | 配色方案、Logo、布局调整、移动端适配 | 500-1000 行 CSS | CSS/HTML 基础 |
| **表单验证** | 所有表单的 rules 校验、错误提示、交互优化 | 300-500 行 JS | JavaScript 基础 |
| **数据可视化** | ECharts 图表扩展、新指标、交互优化 | 400-800 行 JS/Vue | 数据可视化兴趣 |
| **功能模块扩展** | 新增页面/功能（如论坛、通知、日历） | 800-1500 行 Vue/TS | Vue/TypeScript |
| **代码注释与文档** | 为所有组件/函数补充 JSDoc/注释 | 300-500 行注释 | 细心、文档能力 |
| **测试与构建** | 补充测试用例、优化构建配置 | 200-400 行 | DevOps 兴趣 |

> 💡 **zhangfu246800**（素材与视觉效果组）：可负责 UI/主题改造方向，同时兼顾游戏组素材需求。

---

## 📚 相关文档

| 文档 | 路径 | 说明 |
|:---|:---|:---|
| **原项目详细说明** | `PROJECT_INTRO.md` | 完整的技术架构、ECharts 集成方案、权限设计、构建产物分析 |
| **原项目执行路线图** | `执行路线图.md` | 开发阶段规划与里程碑 |
| **原项目课程设计报告** | `docs/《大数据可视化》课程设计报告.doc` | 可作为课程设计报告参考模板 |

---

## 🔧 开发规范

### 代码风格

- **缩进**：2 空格（已由 Prettier 配置）
- **引号**：单引号（`'string'`）
- **分号**：不使用（ASI 自动插入）
- **注释**：使用 JSDoc 风格注释所有公共 API 和复杂逻辑

### Git 工作流

```bash
# 1. 创建功能分支
git checkout -b feature/你的名字-功能名

# 2. 开发并提交
git add .
git commit -m "feat: 添加了xxx功能"

# 3. 推送分支
git push origin feature/你的名字-功能名

# 4. 在 GitHub 发起 Pull Request，等待 review 后合并
```

### 提交规范（Commit Message）

| 类型 | 说明 | 示例 |
|:---|:---|:---|
| `feat:` | 新功能 | `feat: 添加学生成绩导入功能` |
| `fix:` | Bug 修复 | `fix: 修复表单验证不触发的问题` |
| `docs:` | 文档更新 | `docs: 更新 README 开发规范` |
| `style:` | 代码格式（不影响逻辑） | `style: 格式化 StudentView.vue` |
| `refactor:` | 重构 | `refactor: 优化 Pinia Store 结构` |
| `chore:` | 构建/工具 | `chore: 更新 vite 配置` |

---

## ⚠️ 已知问题

| 问题 | 状态 | 解决方案 |
|:---|:---:|:---|
| 依赖 `@student-era/*` 已移除 | ✅ 已解决 | 已 vendor 到 `src/vendor/` |
| 生产构建 `ui-vendor` chunk 体积大 (~1MB) | 🟡 可优化 | 使用 `unplugin-element-plus` 按需引入 |
| 移动端适配不完善 | 🟡 待改造 | 补充响应式断点 |
| 部分表单验证缺失 | 🟡 待补充 | 添加 Element Plus `rules` |

---

## 📄 License

Private — 仅限 2026 Spring 《Web前端开发技术》课程设计小组内部使用。

---

<p align="center">
  <sub>Built with ❤️ by 2026 Spring Web前端开发技术课程设计小组</sub>
</p>
