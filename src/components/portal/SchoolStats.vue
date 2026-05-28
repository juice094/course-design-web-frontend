<template>
  <div class="school-section">
    <!-- 校园名片横幅 -->
    <a
      :href="schoolInfo.website"
      target="_blank"
      rel="noopener noreferrer"
      class="school-banner"
    >
      <div
        class="banner-bg"
        :style="{ backgroundImage: `url(${schoolBg})` }"
      />
      <div class="banner-overlay" />
      <div class="banner-content">
        <img
          :src="schoolLogo"
          alt="校徽"
          class="school-logo"
        >
        <div class="school-meta">
          <h3 class="school-name">
            {{ schoolInfo.name }}
          </h3>
          <p class="school-en">
            {{ schoolInfo.enName }}
          </p>
          <p class="school-motto">
            {{ schoolInfo.motto }}
          </p>
        </div>
      </div>
    </a>

    <!-- 统计数据 -->
    <div class="stats-bar">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="stat-item"
      >
        <div
          class="stat-icon"
          :class="stat.color"
        >
          <component
            :is="stat.icon"
            class="stat-svg"
            :size="20"
          />
        </div>
        <div class="stat-body">
          <div class="stat-value">
            {{ stat.value }}
          </div>
          <div class="stat-label">
            {{ stat.label }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Users, BookOpen, Briefcase, FlaskConical } from 'lucide-vue-next'
import { schoolInfo } from '@/data/profile'
import schoolBg from '@/assets/portal-bg-school.png'
import schoolLogo from '@/assets/school-logo.png'

const stats = [
  { value: '12,486', label: '在校学生', color: 'blue', icon: Users },
  { value: '342', label: '开设课程', color: 'emerald', icon: BookOpen },
  { value: '1,247', label: '专任教师', color: 'amber', icon: Briefcase },
  { value: '156', label: '科研成果', color: 'rose', icon: FlaskConical },
]
</script>

<style scoped>
.school-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* 校园名片横幅 */
.school-banner {
  position: relative;
  display: block;
  border-radius: 1rem;
  overflow: hidden;
  text-decoration: none;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: all 0.5s;
  min-height: 160px;
}

.school-banner:hover {
  transform: scale(1.01);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15);
}

.banner-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transition: transform 0.7s;
}

.school-banner:hover .banner-bg {
  transform: scale(1.05);
}

.banner-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(15, 23, 42, 0.55) 0%,
    rgba(15, 23, 42, 0.25) 50%,
    rgba(15, 23, 42, 0.45) 100%
  );
  backdrop-filter: blur(2px);
}

.banner-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  height: 100%;
}

.school-logo {
  width: 100px;
  height: 40px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.95);
  padding: 6px 10px;
  object-fit: contain;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.school-meta {
  color: #fff;
}

.school-name {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
  font-family: 'Noto Serif SC', serif;
  letter-spacing: 0.05em;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.school-en {
  font-size: 0.75rem;
  opacity: 0.8;
  margin: 0.25rem 0 0;
  letter-spacing: 0.02em;
}

.school-motto {
  font-size: 0.8125rem;
  opacity: 0.7;
  margin: 0.375rem 0 0;
  font-style: italic;
}

/* 统计数据 */
.stats-bar {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

@media (min-width: 640px) {
  .stats-bar {
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }
}

.stat-item {
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
  transition: all 0.5s;
}

.dark .stat-item {
  background: rgba(30, 41, 59, 0.5);
  border-color: rgba(255, 255, 255, 0.1);
}

.stat-item:hover {
  transform: translateY(-2px);
}

.stat-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.blue { background: rgba(59, 130, 246, 0.2); color: #2563eb; }
.dark .blue { color: #60a5fa; }

.emerald { background: rgba(16, 185, 129, 0.2); color: #059669; }
.dark .emerald { color: #34d399; }

.amber { background: rgba(245, 158, 11, 0.2); color: #d97706; }
.dark .amber { color: #fbbf24; }

.rose { background: rgba(244, 63, 94, 0.2); color: #e11d48; }
.dark .rose { color: #fb7185; }

.stat-svg { width: 1.25rem; height: 1.25rem; }

.stat-body { flex: 1; }

.stat-value {
  font-size: 1.125rem;
  font-weight: 900;
  color: #0f172a;
  line-height: 1.2;
  transition: color 1s;
}

.dark .stat-value { color: #fff; }

.stat-label {
  font-size: 0.6875rem;
  color: #64748b;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 0.125rem;
  transition: color 1s;
}

.dark .stat-label { color: #94a3b8; }
</style>
