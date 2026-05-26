<template>
  <div class="portal-page">
    <PortalBackground />
    <PortalNavbar />

    <main class="portal-main">
      <div class="portal-content">
        <!-- 上半部分：学校门户区 -->
        <section class="school-section">
          <ProfileCard />
          <div class="two-col-equal">
            <SchoolStats />
            <SchoolQuickLinks />
          </div>
        </section>

        <!-- 下半部分：个人展示区 -->
        <section class="personal-section">
          <IdentityCards />
          <ProjectShowcase />

          <div class="two-col">
            <SteamHub />
            <SkillsRadar />
          </div>
        </section>

        <SiteDashboard />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import PortalBackground from '@/components/portal/PortalBackground.vue'
import PortalNavbar from '@/components/portal/PortalNavbar.vue'
import ProfileCard from '@/components/portal/ProfileCard.vue'
import SchoolStats from '@/components/portal/SchoolStats.vue'
import SchoolQuickLinks from '@/components/portal/SchoolQuickLinks.vue'
import IdentityCards from '@/components/portal/IdentityCards.vue'
import ProjectShowcase from '@/components/portal/ProjectShowcase.vue'
import SteamHub from '@/components/portal/SteamHub.vue'
import SkillsRadar from '@/components/portal/SkillsRadar.vue'
import SiteDashboard from '@/components/portal/SiteDashboard.vue'
</script>

<style>
/* Portal 页面全局样式（仅在 PortalView 加载时注入） */
.portal-page {
  min-height: 100vh;
  position: relative;
  padding-bottom: 2.5rem;
  font-family: 'Noto Serif SC', 'Source Han Serif SC', 'SimSun', serif;
}

.portal-main {
  width: 100%;
  max-width: 72rem;
  margin: 0 auto;
  padding: 6rem 1rem 0;
  position: relative;
  z-index: 10;
}

@media (min-width: 640px) {
  .portal-main {
    padding: 7rem 1.5rem 0;
  }
}

@media (min-width: 1024px) {
  .portal-main {
    padding: 7rem 2.5rem 0;
  }
}

.portal-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  margin-top: 1.5rem;
}

/* 学校门户区：紧凑间距 */
.school-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* 个人展示区：标准间距 */
.personal-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.two-col {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  width: 100%;
}

@media (min-width: 1024px) {
  .two-col {
    grid-template-columns: repeat(2, 1fr);
  }
}

.two-col-equal {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  width: 100%;
}

@media (min-width: 768px) {
  .two-col-equal {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 滚动条美化（仅 Portal 页面） */
.portal-page ::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.portal-page ::-webkit-scrollbar-track {
  background: transparent;
}
.portal-page ::-webkit-scrollbar-thumb {
  background: rgba(99, 102, 241, 0.3);
  border-radius: 10px;
}
.portal-page ::-webkit-scrollbar-thumb:hover {
  background: rgba(99, 102, 241, 0.8);
}
</style>
