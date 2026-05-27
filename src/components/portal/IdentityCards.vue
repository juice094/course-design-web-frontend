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

<style scoped>
.section { width: 100%; }

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

.icon-svg { width: 1rem; height: 1rem; color: #4f46e5; }
.dark .icon-svg { color: #818cf8; }

.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
  font-family: 'Noto Serif SC', serif;
  margin: 0;
  transition: color 1s;
}
.dark .section-title { color: #fff; }

.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

@media (min-width: 768px) {
  .cards-grid { gap: 1rem; }
}

.card {
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  transition: all 0.5s;
  cursor: pointer;
}

.dark .card {
  background: rgba(30, 41, 59, 0.5);
  border-color: rgba(255, 255, 255, 0.1);
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15);
}

.card-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.card-icon.student { background: rgba(59, 130, 246, 0.2); color: #2563eb; }
.dark .card-icon.student { color: #60a5fa; }

.card-icon.teacher { background: rgba(16, 185, 129, 0.2); color: #059669; }
.dark .card-icon.teacher { color: #34d399; }

.card-icon.developer { background: rgba(139, 92, 246, 0.2); color: #7c3aed; }
.dark .card-icon.developer { color: #a78bfa; }

.card-svg { width: 1.25rem; height: 1.25rem; }

.card-info { flex: 1; min-width: 0; }

.card-name {
  font-size: 0.875rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
  transition: color 1s;
}
.dark .card-name { color: #fff; }

.card-desc {
  font-size: 0.6875rem;
  color: #64748b;
  margin: 0.125rem 0 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 1s;
}
.dark .card-desc { color: #94a3b8; }

.card-arrow {
  transition: transform 0.3s;
}

.card:hover .card-arrow {
  transform: translateX(4px);
}

.arrow-svg {
  width: 1rem;
  height: 1rem;
  color: #94a3b8;
  transition: color 0.3s;
}

.card:hover .arrow-svg { color: #6366f1; }
</style>
