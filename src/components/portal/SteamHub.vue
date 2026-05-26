<template>
  <div class="section">
    <div class="section-header">
      <div class="section-icon pink-bg">
        <svg
          class="icon-svg pink"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M11.979 0C5.346 0 0 5.346 0 11.979c0 2.789.96 5.623 2.674 7.962L.81 22.96l3.519-.998c1.74 1.145 3.81 1.813 5.963 1.813 6.633 0 11.979-5.346 11.979-11.979C22.271 5.346 16.925 0 11.979 0zM6.69 14.323l3.887 1.592c1.254-.674 2.236-1.788 2.74-3.147l-4.47-1.829a4.002 4.002 0 01-2.157 3.384zm7.082-4.516a4 4 0 113.228 3.228 4 4 0 01-3.228-3.228z" />
        </svg>
      </div>
      <h2 class="section-title">
        游戏时光
      </h2>
    </div>

    <div class="steam-grid">
      <!-- 最近在玩 -->
      <div class="steam-card">
        <h3 class="card-subtitle">
          最近在玩
        </h3>
        <div class="game-list">
          <div
            v-for="game in recentGames"
            :key="game.name"
            class="game-item"
          >
            <img
              :src="game.cover"
              :alt="game.name"
              class="game-cover"
            >
            <div class="game-info">
              <h4 class="game-name">
                {{ game.name }}
              </h4>
              <p class="game-hours">
                {{ game.hours }} 小时
              </p>
              <div class="progress-bar">
                <div
                  class="progress-fill"
                  :style="{ width: game.progress + '%' }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 游戏档案 -->
      <div class="steam-card">
        <h3 class="card-subtitle">
          游戏档案
        </h3>
        <div class="stats-grid">
          <div class="stat-box">
            <div class="stat-num pink">
              {{ steamStats.totalGames }}
            </div>
            <div class="stat-label">
              游戏总数
            </div>
          </div>
          <div class="stat-box">
            <div class="stat-num pink">
              {{ steamStats.perfectGames }}
            </div>
            <div class="stat-label">
              完美通关
            </div>
          </div>
          <div class="stat-box">
            <div class="stat-num pink">
              {{ steamStats.totalAchievements.toLocaleString() }}
            </div>
            <div class="stat-label">
              成就数
            </div>
          </div>
          <div class="stat-box">
            <div class="stat-num pink">
              {{ steamStats.avgCompletion }}%
            </div>
            <div class="stat-label">
              平均完成度
            </div>
          </div>
        </div>
        <div class="game-tags">
          <span
            v-for="tag in gameTags"
            :key="tag"
            class="g-tag"
          >{{ tag }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { recentGames, steamStats, gameTags } from '@/data/profile'
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
  display: flex;
  align-items: center;
  justify-content: center;
}

.pink-bg {
  background: rgba(219, 39, 119, 0.2);
}

.icon-svg {
  width: 1rem;
  height: 1rem;
}

.pink {
  color: #db2777;
}

.dark .pink {
  color: #f472b6;
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

.steam-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

@media (min-width: 1024px) {
  .steam-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.steam-card {
  border-radius: 1.5rem;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  padding: 1.25rem;
}

.dark .steam-card {
  background: rgba(30, 41, 59, 0.5);
  border-color: rgba(255, 255, 255, 0.1);
}

.card-subtitle {
  font-size: 0.75rem;
  font-weight: 600;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 1rem;
}

.dark .card-subtitle {
  color: #64748b;
}

.game-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.game-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.game-cover {
  width: 4rem;
  height: 4rem;
  border-radius: 0.75rem;
  object-fit: cover;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  flex-shrink: 0;
}

.game-item:hover .game-cover {
  transform: scale(1.05);
}

.game-info {
  flex: 1;
  min-width: 0;
}

.game-name {
  font-size: 0.875rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 1s;
}

.dark .game-name {
  color: #fff;
}

.game-hours {
  font-size: 0.75rem;
  color: #64748b;
  margin: 0.125rem 0 0;
  transition: color 1s;
}

.dark .game-hours {
  color: #94a3b8;
}

.progress-bar {
  width: 100%;
  height: 0.375rem;
  background: #e2e8f0;
  border-radius: 9999px;
  margin-top: 0.5rem;
  overflow: hidden;
}

.dark .progress-bar {
  background: #334155;
}

.progress-fill {
  height: 100%;
  border-radius: 9999px;
  background: #db2777;
  transition: width 1s;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.stat-box {
  text-align: center;
  padding: 0.75rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.5);
}

.dark .stat-box {
  background: rgba(51, 65, 85, 0.3);
}

.stat-num {
  font-size: 1.5rem;
  font-weight: 900;
}

.stat-box .stat-label {
  font-size: 0.625rem;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 0.25rem;
}

.dark .stat-box .stat-label {
  color: #94a3b8;
}

.game-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.g-tag {
  padding: 0.375rem 0.75rem;
  border-radius: 0.75rem;
  background: rgba(219, 39, 119, 0.1);
  color: #db2777;
  font-size: 0.75rem;
  font-weight: 700;
}

.dark .g-tag {
  background: rgba(219, 39, 119, 0.2);
  color: #f472b6;
}
</style>
