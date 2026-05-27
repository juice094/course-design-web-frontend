<template>
  <div class="space-view">
    <MomentsFeed />
    <CustomCards />
  </div>
</template>

<script setup lang="ts">
import MomentsFeed from '@/components/portal/MomentsFeed.vue'
import CustomCards from '@/components/portal/CustomCards.vue'
</script>

<style scoped>
.space-view {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
</style>
