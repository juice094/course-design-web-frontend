<template>
  <div class="portal-page">
    <PortalBackground />
    <PortalNavbar />
    <PortalSettings />

    <main class="portal-main">
      <div class="portal-content">
        <component
          :is="componentMap[section.id]"
          v-for="section in enabledSections"
          :key="section.id"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePortalStore } from '@/stores/portal'

import PortalBackground from '@/components/portal/PortalBackground.vue'
import PortalNavbar from '@/components/portal/PortalNavbar.vue'
import PortalSettings from '@/components/portal/PortalSettings.vue'
import ProfileCard from '@/components/portal/ProfileCard.vue'
import SchoolStats from '@/components/portal/SchoolStats.vue'
import SchoolQuickLinks from '@/components/portal/SchoolQuickLinks.vue'
import IdentityCards from '@/components/portal/IdentityCards.vue'
import ProjectShowcase from '@/components/portal/ProjectShowcase.vue'
import SteamHub from '@/components/portal/SteamHub.vue'
import SkillsRadar from '@/components/portal/SkillsRadar.vue'
import SiteDashboard from '@/components/portal/SiteDashboard.vue'
import CustomCards from '@/components/portal/CustomCards.vue'

const portalStore = usePortalStore()

const componentMap: Record<string, any> = {
  profileCard: ProfileCard,
  schoolStats: SchoolStats,
  schoolLinks: SchoolQuickLinks,
  identityCards: IdentityCards,
  projectShowcase: ProjectShowcase,
  steamHub: SteamHub,
  skillsRadar: SkillsRadar,
  customCards: CustomCards,
  siteDashboard: SiteDashboard,
}

const enabledSections = computed(() => portalStore.enabledSections)
</script>

<style>
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
  gap: 1.5rem;
  width: 100%;
  margin-top: 1.5rem;
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
