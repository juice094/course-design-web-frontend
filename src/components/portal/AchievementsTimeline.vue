<template>
  <div class="achievements-section">
    <div v-if="achievementStore.sortedAchievements.length === 0" class="empty-state">
      <span class="empty-icon">🏆</span>
      <p class="empty-text">暂无成就记录</p>
      <p class="empty-hint">在页面设置中添加竞赛获奖或证书</p>
    </div>
    <div v-else class="timeline">
      <div
        v-for="(item, index) in achievementStore.sortedAchievements"
        :key="item.id"
        class="timeline-item"
        :class="{ last: index === achievementStore.sortedAchievements.length - 1 }"
      >
        <div class="timeline-node" :style="{ borderColor: achievementStore.levelColors[item.level] }">
          <span class="node-dot" :style="{ background: achievementStore.levelColors[item.level] }" />
        </div>
        <div class="timeline-card">
          <div class="achievement-header">
            <span
              class="level-badge"
              :style="{ background: achievementStore.levelColors[item.level] + '20', color: achievementStore.levelColors[item.level] }"
            >
              {{ achievementStore.levelLabels[item.level] }}
            </span>
            <span class="achievement-date">{{ item.date }}</span>
          </div>
          <h4 class="achievement-title">{{ item.title }}</h4>
          <p v-if="item.description" class="achievement-desc">{{ item.description }}</p>
          <a
            v-if="item.certificateUrl"
            :href="item.certificateUrl"
            target="_blank"
            rel="noopener"
            class="certificate-link"
          >
            查看证书 &rarr;
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAchievementStore } from '@/stores/achievements'

const achievementStore = useAchievementStore()
</script>

<style scoped>
.achievements-section { width: 100%; }

.timeline {
  position: relative;
  padding-left: 1.5rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0.4375rem;
  top: 0.5rem;
  bottom: 0.5rem;
  width: 2px;
  background: linear-gradient(to bottom, rgba(245, 158, 11, 0.4), rgba(59, 130, 246, 0.4));
  border-radius: 1px;
}

.timeline-item {
  position: relative;
  padding-bottom: 1.25rem;
  display: flex;
  gap: 0.875rem;
}

.timeline-item.last {
  padding-bottom: 0;
}

.timeline-node {
  position: absolute;
  left: -1.5rem;
  top: 0.375rem;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
  border: 2px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.dark .timeline-node {
  background: rgba(30, 41, 59, 0.8);
}

.node-dot {
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 50%;
}

.timeline-card {
  flex: 1;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  transition: all 0.5s;
}

.dark .timeline-card {
  background: rgba(30, 41, 59, 0.5);
  border-color: rgba(255, 255, 255, 0.1);
}

.timeline-card:hover {
  transform: translateX(4px);
}

.achievement-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.level-badge {
  font-size: 0.6875rem;
  font-weight: 700;
  padding: 0.125rem 0.5rem;
  border-radius: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.achievement-date {
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 600;
}

.achievement-title {
  font-size: 1rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 0.375rem;
  line-height: 1.4;
  transition: color 1s;
}

.dark .achievement-title { color: #fff; }

.achievement-desc {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0 0 0.5rem;
  line-height: 1.6;
  transition: color 1s;
}

.dark .achievement-desc { color: #94a3b8; }

.certificate-link {
  font-size: 0.8125rem;
  color: #6366f1;
  font-weight: 600;
  text-decoration: none;
}

.certificate-link:hover {
  text-decoration: underline;
}

/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
  text-align: center;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px dashed rgba(255, 255, 255, 0.4);
  transition: all 0.5s;
}
.dark .empty-state {
  background: rgba(30, 41, 59, 0.3);
  border-color: rgba(255, 255, 255, 0.1);
}
.empty-icon {
  font-size: 2rem;
  line-height: 1;
  margin-bottom: 0.75rem;
  opacity: 0.6;
}
.empty-text {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 0.25rem;
  transition: color 1s;
}
.dark .empty-text { color: #e2e8f0; }
.empty-hint {
  font-size: 0.8125rem;
  color: #94a3b8;
  margin: 0;
  transition: color 1s;
}
</style>
