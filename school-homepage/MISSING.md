# 教学案例缺失内容清单

> 对比基准：《Web前端开发技术》课程设计内容（任务A — 高校网站）
> 对比对象：甘肃农业大学官网当前工程（school-homepage/）
> 日期：2026-05-28

---

## ✅ 已满足的要求

| 要求项 | 当前状态 | 位置 |
|:---|:---:|:---|
| HTML5 + CSS3 | ✅ | `index.html` + `css/style.css` |
| DIV+CSS 布局 | ✅ | 全面采用 flex/grid |
| 二级下拉菜单 | ✅ | `components/header.html` — 5个下拉 |
| 搜索框 | ✅ | `components/header.html` — 顶部搜索 |
| 响应式设计 | ✅ | `@media (max-width: 768px)` |
| 注释规范 | ✅ | CSS 和 JS 均含注释 |
| 锯齿缩进 | ✅ | 4空格缩进 |

---

## ❌ 缺失的功能（教学案例明确要求）

### 🔴 P0 — 必须补齐（缺项会被扣分）

| 缺失功能 | 教学案例要求 | 当前状态 | 建议实现方案 |
|:---|:---|:---:|:---|
| **表单 + 表单验证** | 所有表单需有输入有效性验证 | ❌ 无表单 | 新增"联系我们"或"在线报名"页面，含 `<input required pattern="...">` + JS 验证 |
| **Tab 标签切换** | 案例含 `tab3.js` | ❌ 无Tab | 新增学术科研/通知公告的 Tab 切换组件 |
| **文字滚动** | 案例含 `wzgd.js`（文字滚动） | ❌ 无滚动 | 在顶部栏或页脚添加公告文字滚动条 |
| **jQuery 插件使用** | 明确要求使用 jQuery 及第三方插件 | ❌ 纯原生JS | 引入 jQuery + 1~2 个插件（轮播/表单验证/日期选择器） |
| **Banner 焦点图轮播** | 案例含 `focus.js` + `banner.js` | ⚠️ 静态Hero | 将 Hero 区域升级为自动轮播的多图Banner |

### 🟡 P1 — 建议补齐（增加代码量+加分项）

| 缺失功能 | 教学案例要求 | 当前状态 | 建议实现方案 |
|:---|:---|:---:|:---|
| **代码量不足** | 人均 2000+ 行，组总 10000+ 行 | ⚠️ 约 800行 | 增加子页面（about.html / contact.html / news-list.html），每个页面含完整 HTML+结构 |
| **独立的子页面内容** | 当前子页面（academic.html等）内容极薄 | ⚠️ 6-7KB/页 | 填充子页面实际内容，或合并为统一模板 |
| **外部 CSS 框架引用** | BootStrap / CSS MENU 等第三方 | ❌ 未使用 | 可局部引入 BootStrap Grid 或自己写的类框架 |

---

## 📊 代码量统计（当前）

| 文件 | 行数 | 说明 |
|:---|:---:|:---|
| `index.html` | ~200 行 | 结构层 |
| `css/style.css` | ~600 行 | 表现层 |
| `js/main.js` | ~50 行 | 行为层 |
| `components/*.html` | ~150 行 | 组件层（复制自index） |
| 其他子页面（academic等） | ~50 行×10 | 约 500 行（内容稀薄） |
| **总计** | **~1500 行** | **需再补 8500+ 行** |

---

## 💡 快速补齐路径（按优先级排序）

### 第1步：引入 jQuery + 补齐核心插件（+300行）

```html
<!-- 在 index.html <head> 中引入 -->
<script src="js/jquery-3.7.1.min.js"></script>
<script src="js/banner.js"></script>    <!-- 从教学案例复制 -->
<script src="js/tab3.js"></script>      <!-- 从教学案例复制 -->
<script src="js/wzgd.js"></script>      <!-- 从教学案例复制 -->
```

### 第2步：升级 Hero → Banner 轮播（+100行）

- 将当前静态 `.hero-section` 改为多图自动轮播
- 案例 `banner.js` 可直接适配

### 第3步：新增表单页面（+400行）

创建 `pages/contact.html`：
- 表单字段：姓名、邮箱、电话、留言内容、验证码
- HTML5 验证：`required`、`type="email"`、`pattern="[0-9]{11}"`
- JS 验证：提交前二次校验

### 第4步：新增 Tab 切换组件（+100行）

在"通知公告"区域增加分类 Tab：
- 全部公告 / 学术讲座 / 行政通知 / 招标信息

### 第5步：填充子页面（+1000行/页）

将 `academic.html`、`info.html`、`jobs.html` 等扩展为完整内容页，每页：
- 完整的 header + footer 结构
- 独立的页面 CSS（可复用主样式）
- 独立的页面 JS

---

## 📦 可用资源（从教学案例复制）

案例 `任务A.zip` 中已提供可直接复用的文件：

| 文件 | 功能 | 复制到 |
|:---|:---|:---|
| `css/style_web.css` | 案例主样式 | 参考或部分复用 |
| `js/banner.js` | Banner 轮播 | `js/banner.js` |
| `js/focus.js` | 焦点图切换 | `js/focus.js` |
| `js/tab3.js` | Tab 切换 | `js/tab3.js` |
| `js/wzgd.js` | 文字滚动 | `js/wzgd.js` |
| `js/menuli.js` | 菜单效果 | `js/menuli.js` |
| `images/*` | 示例图片 | `images/demo/*` |

---

*本清单由格雷生成，供宿和组员参考。如需格雷直接实现某项功能，请告知。*
