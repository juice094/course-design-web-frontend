<template>
  <div class="section">
    <div class="section-header">
      <div class="section-icon">
        <svg class="icon-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>
      <h2 class="section-title">项目展示</h2>
    </div>

    <div class="project-grid">
      <a
        v-for="project in projects"
        :key="project.name"
        :href="project.url"
        target="_blank"
        rel="noopener noreferrer"
        class="project-card"
      >
        <div class="project-cover">
          <img :src="project.cover" :alt="project.name" class="cover-img" />
          <div class="cover-overlay" />
        </div>
        <div class="project-body">
          <h3 class="project-name">{{ project.name }}</h3>
          <p class="project-desc">{{ project.description }}</p>
          <div class="project-tags">
            <span v-for="tag in project.tags" :key="tag" class="project-tag">{{ tag }}</span>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
const projects = [
  {
    name: '教务数据可视化系统',
    description: '基于 Vue 3 + Vite + Element Plus 的现代化教务管理平台，支持成绩分析、选课排课、数据大屏等功能。',
    url: 'https://github.com',
    cover: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop',
    tags: ['Vue 3', 'TypeScript', 'ECharts'],
  },
  {
    name: '个人博客系统 XHBlogs',
    description: 'Next.js 构建的毛玻璃风格博客，支持 Markdown 写作、AI 助理、网易云音乐挂件。',
    url: 'https://github.com',
    cover: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&auto=format&fit=crop',
    tags: ['Next.js', 'Tailwind', 'Glassmorphism'],
  },
  {
    name: 'GROMACS 模拟可视化',
    description: '分子动力学模拟数据的前端可视化工具，支持轨迹回放、能量曲线、径向分布函数。',
    url: 'https://github.com',
    cover: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop',
    tags: ['Three.js', 'WebGL', 'Python'],
  },
  {
    name: 'Steam 游戏时长追踪',
    description: '基于 Steam Web API 的游戏数据统计面板，自动同步库数据并生成可视化报告。',
    url: 'https://github.com',
    cover: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop',
    tags: ['Node.js', 'Vue 3', 'Chart.js'],
  },
  {
    name: '校园二手交易平台',
    description: '为高校学生打造的闲置物品交易平台，支持商品发布、即时聊天、信用评价。',
    url: 'https://github.com',
    cover: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop',
    tags: ['React', 'Express', 'MongoDB'],
  },
  {
    name: '算法可视化实验室',
    description: '交互式算法教学平台，支持排序、图论、动态规划等算法的逐步可视化演示。',
    url: 'https://github.com',
    cover: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&auto=format&fit=crop',
    tags: ['Vue 3', 'Canvas', 'D3.js'],
  },
]
</script>

<style scoped>
.section {
  width: 100%;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.section-icon {
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  background: rgba(99, 102, 241, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-svg {
  width: 1rem;
  height: 1rem;
  color: #4f46e5;
}

.dark .icon-svg {
  color: #818cf8;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
  font-family: 'Noto Serif SC', serif;
  margin: 0;
  transition: color 1s;
}

.dark .section-title {
  color: #fff;
}

.project-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

@media (min-width: 640px) {
  .project-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .project-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.project-card {
  border-radius: 1.5rem;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.7s;
  display: flex;
  flex-direction: column;
  text-decoration: none;
}

.dark .project-card {
  background: rgba(30, 41, 59, 0.5);
  border-color: rgba(255, 255, 255, 0.1);
}

.project-card:hover {
  transform: scale(1.02);
}

.project-cover {
  height: 9rem;
  overflow: hidden;
  position: relative;
}

.cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s;
}

.project-card:hover .cover-img {
  transform: scale(1.05);
}

.cover-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.4), transparent);
}

.project-body {
  padding: 1.25rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.project-name {
  font-size: 1rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 0.25rem;
  transition: color 0.3s;
}

.project-card:hover .project-name {
  color: #4f46e5;
}

.dark .project-name {
  color: #fff;
}

.dark .project-card:hover .project-name {
  color: #818cf8;
}

.project-desc {
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.5;
  margin: 0 0 0.75rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
  transition: color 1s;
}

.dark .project-desc {
  color: #94a3b8;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
}

.project-tag {
  padding: 0.125rem 0.5rem;
  border-radius: 0.375rem;
  background: rgba(99, 102, 241, 0.1);
  color: #4f46e5;
  font-size: 0.75rem;
  font-weight: 500;
}

.dark .project-tag {
  background: rgba(99, 102, 241, 0.2);
  color: #818cf8;
}
</style>