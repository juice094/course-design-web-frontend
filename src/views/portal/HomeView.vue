<template>
  <div class="home-view">
    <ProfileCard />
    <SchoolStats />
    <SchoolQuickLinks />
    <IdentityCards />
    <SkillsRadar />
    <SiteDashboard />
  </div>
</template>

<script setup lang="ts">
import ProfileCard from '@/components/portal/ProfileCard.vue'
import SchoolStats from '@/components/portal/SchoolStats.vue'
import SchoolQuickLinks from '@/components/portal/SchoolQuickLinks.vue'
import IdentityCards from '@/components/portal/IdentityCards.vue'
import SkillsRadar from '@/components/portal/SkillsRadar.vue'
import SiteDashboard from '@/components/portal/SiteDashboard.vue'
</script>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
</style>
