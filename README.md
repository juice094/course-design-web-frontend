# Big Data Visualization — 教务可视化系统（课程设计版）

> **2026 Spring 课程设计 — 网页组开发基础**
> 
> 原项目：大数据可视化课程设计（Vue 3 + ECharts 教务管理前端系统）
> 现作为《Web前端开发技术》课程设计网页组的开发基础代码。

---

## 课程设计适配说明

### 原项目来源
- `student-era/projects/bigdata-visualization` → 已迁移为本仓库基础代码
- 技术栈：Vue 3.5 + Vite 6 + TypeScript 5.7 + Pinia 3 + Vue Router 4 + Element Plus 2.13 + ECharts 5.6

### Workspace 依赖处理
原项目使用了 `student-era` monorepo 的 workspace 包（`@student-era/echarts-config`、`@student-era/vue-utils`）。

**已 vendor 到 `src/vendor/`**：
- `src/vendor/echarts-config/` — ECharts 5 渲染器/组件显式注册
- `src/vendor/vue-utils/` — 工具函数（Excel 导入导出、持久化、图表组件、DataCard）

所有 import 路径已从 `@student-era/xxx` 改为 `@/vendor/xxx`，团队成员 clone 后可直接 `pnpm install` + `pnpm dev` 运行，无需 student-era workspace。

---

## 功能特性（原项目保留）

- **数据可视化大屏**：柱状图（院系人数）、饼图（性别比例 / 课程类型）、折线图（招生趋势）
- **完整 CRUD**：学生管理、教师管理、课程管理、成绩管理、选课管理
- **权限控制**：基于角色的菜单与按钮级权限（admin / teacher / student）
- **工程化实践**：Pinia 状态管理、Vue Router 导航守卫、组合式函数封装、TypeScript 全栈类型安全
- **Excel 导入导出**：学生/课程/成绩数据批量处理

---

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue | 3.5.13 | 渐进式前端框架，Composition API |
| Vite | 6.3.2 | 构建工具，ESM 原生支持 |
| TypeScript | 5.7.3 | 静态类型检查 |
| Pinia | 3.0.1 | 状态管理 |
| Vue Router | 4.5.0 | 单页路由，Hash 模式 |
| Element Plus | 2.9.7 | UI 组件库 |
| ECharts | 5.6.0 | 数据可视化图表 |
| vue-echarts | 7.0.3 | ECharts Vue 声明式封装 |
| xlsx | 0.18.5 | Excel 文件读写 |

---

## 快速启动

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
# → http://localhost:5173

# 登录账号（原项目内置）
# 管理员：admin / admin123
# 教师：teacher / teacher123
# 学生：student / student123
```

## 构建部署

```bash
pnpm build
```

构建产物输出至 `dist/` 目录。

---

## 课程设计改造方向（待组员补充）

- [ ] 根据课程设计任务 A/B/C 之一，改造页面主题（高校/企业/协会）
- [ ] 调整配色和 Logo
- [ ] 简化或扩展功能模块以满足代码量要求（人均 2000+ 行）
- [ ] 添加必要的注释和代码规范
- [ ] 补充表单验证逻辑
- [ ] 响应式布局适配（移动端）

---

## 组员

（待补充）

---

_原项目 README 见 `PROJECT_INTRO.md`（更详细的技术文档）_