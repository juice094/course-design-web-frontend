<template>
  <div class="about-view">
    <!-- 扩展版个人简介 -->
    <div class="about-card">
      <div class="about-header">
        <img
          :src="avatarUrl"
          alt="avatar"
          class="about-avatar"
          @error="onAvatarError"
        >
        <div class="about-meta">
          <h2 class="about-name">星辉</h2>
          <p class="about-tag">甘肃农业大学 · 计算机科学与技术 · 2022 级</p>
        </div>
      </div>
      <div class="about-body">
        <section class="about-section">
          <h3 class="section-title">关于我</h3>
          <p class="section-text">
            在代码、学术与泰拉大陆间穿梭的普通人。主攻 Rust 系统编程与 Vue 前端工程化，
            对分布式系统协议设计和开发者工具链有浓厚兴趣。课余时间沉迷 Steam 库中的各类独立游戏，
            偶尔也写点技术随笔和生活记录。
          </p>
        </section>
        <section class="about-section">
          <h3 class="section-title">教育经历</h3>
          <div class="timeline-simple">
            <div class="timeline-row">
              <span class="timeline-date">2022 — 2026</span>
              <span class="timeline-content">甘肃农业大学 · 计算机科学与技术 · 本科</span>
            </div>
          </div>
        </section>
        <section class="about-section">
          <h3 class="section-title">联系方式</h3>
          <div class="contact-grid">
            <a :href="profile.socialLinks.github.url" target="_blank" rel="noopener" class="contact-item">
              <span class="contact-label">GitHub</span>
              <span class="contact-value">@juice094</span>
            </a>
            <a :href="profile.socialLinks.steam.url" target="_blank" rel="noopener" class="contact-item">
              <span class="contact-label">Steam</span>
              <span class="contact-value">{{ profile.socialLinks.steam.nickname }}</span>
            </a>
            <div class="contact-item">
              <span class="contact-label">Email</span>
              <span class="contact-value">{{ profile.socialLinks.email }}</span>
            </div>
            <div class="contact-item">
              <span class="contact-label">QQ</span>
              <span class="contact-value">{{ profile.socialLinks.qq }}</span>
            </div>
          </div>
        </section>
      </div>
    </div>

    <SchoolQuickLinks />
    <SiteDashboard />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { socialLinks } from '@/data/profile'
import SchoolQuickLinks from '@/components/portal/SchoolQuickLinks.vue'
import SiteDashboard from '@/components/portal/SiteDashboard.vue'

const profile = { socialLinks }

const DEFAULT_AVATAR = 'https://api.dicebear.com/7.x/avataaars/svg?seed=XingHui'
const avatarUrl = ref(profile.socialLinks.github.avatar || DEFAULT_AVATAR)

function onAvatarError() {
  avatarUrl.value = DEFAULT_AVATAR
}
</script>

<style scoped>
.about-view {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.about-card {
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: all 0.5s;
}

.dark .about-card {
  background: rgba(30, 41, 59, 0.5);
  border-color: rgba(255, 255, 255, 0.1);
}

.about-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.about-avatar {
  width: 64px;
  height: 64px;
  border-radius: 1rem;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.about-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
  font-family: 'Noto Serif SC', serif;
  transition: color 1s;
}

.dark .about-name { color: #fff; }

.about-tag {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0.25rem 0 0;
  transition: color 1s;
}

.dark .about-tag { color: #94a3b8; }

.about-body {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.about-section {}

.section-title {
  font-size: 1rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 0.75rem;
  font-family: 'Noto Serif SC', serif;
  transition: color 1s;
}

.dark .section-title { color: #fff; }

.section-text {
  font-size: 0.9375rem;
  line-height: 1.8;
  color: #475569;
  margin: 0;
  transition: color 1s;
}

.dark .section-text { color: #cbd5e1; }

.timeline-simple { display: flex; flex-direction: column; gap: 0.75rem; }
.timeline-row { display: flex; gap: 1rem; align-items: baseline; }
.timeline-date { font-size: 0.875rem; font-weight: 700; color: #6366f1; min-width: 6rem; }
.timeline-content { font-size: 0.9375rem; color: #475569; }
.dark .timeline-content { color: #cbd5e1; }

.contact-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.contact-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.75rem;
  border-radius: 0.75rem;
  background: rgba(0, 0, 0, 0.03);
  text-decoration: none;
  transition: all 0.3s;
}

.contact-item:hover {
  background: rgba(99, 102, 241, 0.1);
}

.contact-label {
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 600;
}

.contact-value {
  font-size: 0.875rem;
  color: #0f172a;
  font-weight: 600;
  transition: color 1s;
}

.dark .contact-value { color: #e2e8f0; }
</style>
