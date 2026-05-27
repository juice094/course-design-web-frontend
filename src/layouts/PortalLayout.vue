<template>
  <div class="portal-layout">
    <PortalBackground />
    <PortalNavbar />
    <PortalSettings />

    <main class="portal-main">
      <div class="portal-content">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import PortalBackground from '@/components/portal/PortalBackground.vue'
import PortalNavbar from '@/components/portal/PortalNavbar.vue'
import PortalSettings from '@/components/portal/PortalSettings.vue'
</script>

<style>
.portal-layout {
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

.portal-layout ::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.portal-layout ::-webkit-scrollbar-track {
  background: transparent;
}
.portal-layout ::-webkit-scrollbar-thumb {
  background: rgba(99, 102, 241, 0.3);
  border-radius: 10px;
}
.portal-layout ::-webkit-scrollbar-thumb:hover {
  background: rgba(99, 102, 241, 0.8);
}
</style>
