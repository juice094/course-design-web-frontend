<template>
  <div class="academic-view">
    <CourseSchedule />
    <ArticlesSection />
    <AchievementsTimeline />
  </div>
</template>

<script setup lang="ts">
import CourseSchedule from '@/components/portal/CourseSchedule.vue'
import ArticlesSection from '@/components/portal/ArticlesSection.vue'
import AchievementsTimeline from '@/components/portal/AchievementsTimeline.vue'
</script>

<style scoped>
.academic-view {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
</style>
