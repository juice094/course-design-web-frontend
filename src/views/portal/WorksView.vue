<template>
  <div class="works-view">
    <ProjectShowcase />
    <PhotoWall />
    <SteamHub />
  </div>
</template>

<script setup lang="ts">
import ProjectShowcase from '@/components/portal/ProjectShowcase.vue'
import PhotoWall from '@/components/portal/PhotoWall.vue'
import SteamHub from '@/components/portal/SteamHub.vue'
</script>

<style scoped>
.works-view {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
</style>
