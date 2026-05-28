<template>
  <div class="section">
    <div class="section-header">
      <div class="section-icon">
        <IdCard class="icon-svg" :size="16" />
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
          <GraduationCap class="card-svg" :size="20" />
        </div>
        <div class="card-info">
          <h3 class="card-name">学生</h3>
          <p class="card-desc">在校本科生，主修计算机科学与技术</p>
        </div>
        <div class="card-arrow">
          <ChevronRight class="arrow-svg" :size="16" />
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
          <FlaskConical class="card-svg" :size="20" />
        </div>
        <div class="card-info">
          <h3 class="card-name">教师</h3>
          <p class="card-desc">课程助教，负责实验课指导与答疑</p>
        </div>
        <div class="card-arrow">
          <ChevronRight class="arrow-svg" :size="16" />
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
          <Code2 class="card-svg" :size="20" />
        </div>
        <div class="card-info">
          <h3 class="card-name">开发者</h3>
          <p class="card-desc">开源贡献者，Vue / Rust 生态爱好者</p>
        </div>
        <div class="card-arrow">
          <ChevronRight class="arrow-svg" :size="16" />
        </div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IdCard, GraduationCap, FlaskConical, Code2, ChevronRight } from 'lucide-vue-next'
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
