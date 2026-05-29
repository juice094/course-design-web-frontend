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
        v-for="stat in animatedStats"
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
          <div class="stat-value" :class="stat.color">
            {{ stat.displayValue }}
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
import { ref, onMounted } from 'vue'
import { Users, BookOpen, Briefcase, FlaskConical } from 'lucide-vue-next'
import { schoolInfo } from '@/data/profile'
import schoolBg from '@/assets/portal-bg-school.png'
import schoolLogo from '@/assets/school-logo.png'

const rawStats = [
  { value: 12486, label: '在校学生', color: 'blue', icon: Users },
  { value: 342, label: '开设课程', color: 'emerald', icon: BookOpen },
  { value: 1247, label: '专任教师', color: 'amber', icon: Briefcase },
  { value: 156, label: '科研成果', color: 'rose', icon: FlaskConical },
]

const animatedStats = ref(rawStats.map(s => ({ ...s, displayValue: '0', targetValue: s.value })))

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

function formatNumber(n: number): string {
  return n.toLocaleString('zh-CN')
}

onMounted(() => {
  const duration = 1500
  const startTime = performance.now()

  function tick(now: number) {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased = easeOutCubic(progress)

    animatedStats.value = animatedStats.value.map(s => ({
      ...s,
      displayValue: formatNumber(Math.round(s.targetValue * eased)),
    }))

    if (progress < 1) {
      requestAnimationFrame(tick)
    }
  }

  requestAnimationFrame(tick)
})
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
  padding: 1rem 1.5rem 2.5rem;
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
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15);
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

.stat-body { flex: 1; min-width: 0; }

.stat-value {
  font-size: 1.125rem;
  font-weight: 900;
  color: #0f172a;
  line-height: 1.2;
  transition: color 1s;
}

.dark .stat-value { color: #fff; }

/* 数字渐变色增强 */
.stat-value.blue {
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-value.emerald {
  background: linear-gradient(135deg, #059669, #10b981);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-value.amber {
  background: linear-gradient(135deg, #d97706, #f59e0b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-value.rose {
  background: linear-gradient(135deg, #e11d48, #f43f5e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.dark .stat-value.blue { background: linear-gradient(135deg, #60a5fa, #93c5fd); -webkit-background-clip: text; background-clip: text; }
.dark .stat-value.emerald { background: linear-gradient(135deg, #34d399, #6ee7b7); -webkit-background-clip: text; background-clip: text; }
.dark .stat-value.amber { background: linear-gradient(135deg, #fbbf24, #fcd34d); -webkit-background-clip: text; background-clip: text; }
.dark .stat-value.rose { background: linear-gradient(135deg, #fb7185, #fda4af); -webkit-background-clip: text; background-clip: text; }

.stat-label {
  font-size: 0.6875rem;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-top: 0.125rem;
}

.dark .stat-label { color: #94a3b8; }
</style>
