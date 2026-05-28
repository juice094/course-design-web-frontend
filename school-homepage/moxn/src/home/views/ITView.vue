<template>
  <div class="course-page">
    <TopHeader />
    <ITContent />
    <PageFooter />
    <FloatLoginBtn />
  </div>
</template>

<script setup>
import TopHeader from '../../home/components/common/TopHeader.vue'
import PageFooter from '../../home/components/common/PageFooter.vue'
import FloatLoginBtn from '../../home/components/common/FloatLoginBtn.vue'
import ITContent from '../components/courses/ITContent.vue'
</script>

<style scoped>
.course-page {
  min-height: 100vh;
}
</style>
