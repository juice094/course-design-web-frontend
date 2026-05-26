<template>
  <div class="profile-card">
    <div class="profile-header">
      <div class="avatar-wrap">
        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=gsau-dev"
          alt="avatar"
          class="avatar"
        >
      </div>
      <div class="profile-info">
        <div class="profile-meta">
          <h1 class="name">
            星辉
          </h1>
          <span class="school-tag">
            <svg
              class="tag-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 14l9-5-9-5-9 5 9 5z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
              />
            </svg>
            甘肃农业大学 · 计算机科学与技术
          </span>
        </div>
        <p class="bio">
          在代码、学术与泰拉大陆间穿梭的普通人。Vue 生态爱好者，Steam 库深不见底。
        </p>
      </div>
    </div>

    <div class="profile-footer">
      <div class="stats">
        <div class="stat">
          <div class="stat-num indigo">
            12
          </div>
          <div class="stat-label">
            项目
          </div>
        </div>
        <div class="stat-divider" />
        <div class="stat">
          <div class="stat-num purple">
            36
          </div>
          <div class="stat-label">
            课程
          </div>
        </div>
        <div class="stat-divider" />
        <div class="stat">
          <div class="stat-num pink">
            128
          </div>
          <div class="stat-label">
            游戏
          </div>
        </div>
      </div>

      <div class="socials">
        <SocialButton
          type="github"
          url="https://github.com"
        />
        <SocialButton
          type="steam"
          url="https://steamcommunity.com"
        />
        <SocialButton
          type="email"
          @click="copyEmail"
        />
        <SocialButton
          type="qq"
          @click="copyQQ"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SocialButton from './SocialButton.vue'

function copyEmail() { navigator.clipboard.writeText('dev@gsau.edu.cn') }
function copyQQ() { navigator.clipboard.writeText('1124533793') }
</script>

<style scoped>
.profile-card {
  width: 100%;
  border-radius: 1.5rem;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.7s;
  min-height: 220px;
}

.dark .profile-card {
  background: rgba(30, 41, 59, 0.5);
  border-color: rgba(255, 255, 255, 0.1);
}

.profile-card:hover { transform: scale(1.01); }

@media (min-width: 768px) {
  .profile-card { padding: 2rem; min-height: 280px; }
}

.profile-header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

@media (min-width: 768px) {
  .profile-header { gap: 1.5rem; }
}

.avatar-wrap {
  width: 4rem;
  height: 4rem;
  border-radius: 0.75rem;
  background: linear-gradient(to top right, #6366f1, #a855f7);
  padding: 0.25rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
  transition: transform 0.5s;
}

.profile-card:hover .avatar-wrap { transform: rotate(3deg); }

@media (min-width: 640px) {
  .avatar-wrap { width: 5rem; height: 5rem; border-radius: 1rem; }
}

@media (min-width: 768px) {
  .avatar-wrap { width: 6rem; height: 6rem; }
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  object-fit: cover;
  background: #fff;
}

@media (min-width: 640px) {
  .avatar { border-radius: 0.75rem; }
}

.profile-info { flex: 1; min-width: 0; }

.profile-meta {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  margin-bottom: 0.5rem;
}

@media (min-width: 640px) {
  .profile-meta {
    flex-direction: row;
    align-items: center;
    gap: 0.75rem;
  }
}

.name {
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
  font-family: 'Noto Serif SC', serif;
  letter-spacing: 0.05em;
  margin: 0;
  line-height: 1.25;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 1s;
}

.dark .name { color: #fff; }

@media (min-width: 640px) {
  .name { font-size: 1.5rem; }
}

@media (min-width: 768px) {
  .name { font-size: 1.875rem; }
}

.school-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.625rem;
  border-radius: 9999px;
  background: rgba(99, 102, 241, 0.15);
  color: #4f46e5;
  font-size: 0.6875rem;
  font-weight: 600;
  white-space: nowrap;
}

.dark .school-tag {
  background: rgba(99, 102, 241, 0.25);
  color: #818cf8;
}

@media (min-width: 640px) {
  .school-tag { font-size: 0.75rem; }
}

.tag-icon {
  width: 0.875rem;
  height: 0.875rem;
}

.bio {
  font-size: 0.75rem;
  color: #334155;
  font-weight: 500;
  line-height: 1.625;
  max-width: 28rem;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 1s;
}

.dark .bio { color: #cbd5e1; }

@media (min-width: 640px) {
  .bio { font-size: 0.875rem; }
}

@media (min-width: 768px) {
  .bio { font-size: 1rem; -webkit-line-clamp: unset; }
}

.profile-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.5rem;
  gap: 1.25rem;
}

@media (min-width: 768px) {
  .profile-footer {
    flex-direction: row;
    justify-content: space-between;
    margin-top: 2rem;
    gap: 1.5rem;
  }
}

.stats {
  display: flex;
  gap: 0.5rem;
  width: 100%;
  justify-content: space-between;
}

@media (min-width: 640px) {
  .stats { gap: 1.5rem; justify-content: space-around; }
}

@media (min-width: 768px) {
  .stats { width: auto; justify-content: flex-start; }
}

.stat { text-align: center; padding: 0 0.5rem; }

.stat-num {
  font-size: 1.25rem;
  font-weight: 900;
  transition: transform 0.3s;
}

.stat:hover .stat-num { transform: scale(1.1); }

@media (min-width: 768px) {
  .stat-num { font-size: 1.5rem; }
}

.indigo { color: #4f46e5; }
.dark .indigo { color: #818cf8; }

.purple { color: #7c3aed; }
.dark .purple { color: #a78bfa; }

.pink { color: #db2777; }
.dark .pink { color: #f472b6; }

.stat-label {
  font-size: 0.5625rem;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-top: 0.125rem;
}

.dark .stat-label { color: #94a3b8; }

@media (min-width: 768px) {
  .stat-label { font-size: 0.625rem; }
}

.stat-divider {
  width: 1px;
  height: 2rem;
  background: rgba(203, 213, 225, 0.5);
  display: none;
}

@media (min-width: 768px) {
  .stat-divider { display: block; height: 2.5rem; }
}

.socials {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}

@media (min-width: 768px) {
  .socials { width: auto; justify-content: flex-end; }
}
</style>
