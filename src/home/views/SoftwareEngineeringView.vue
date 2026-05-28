<template>
  <div class="course-page">
    <TopHeader />
    <SoftwareEngineeringContent />
    <PageFooter />
    <FloatLoginBtn />
  </div>
</template>

<script setup>
import TopHeader from '../../home/components/common/TopHeader.vue'
import PageFooter from '../../home/components/common/PageFooter.vue'
import FloatLoginBtn from '../../home/components/common/FloatLoginBtn.vue'
import SoftwareEngineeringContent from '../components/courses/SoftwareEngineeringContent.vue'
</script>

<style scoped>
.course-page {
  min-height: 100vh;
}
</style>
