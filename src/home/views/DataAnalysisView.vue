<template>
  <div class="course-page">
    <TopHeader />
    <DataAnalysisContent />
    <PageFooter />
    <FloatLoginBtn />
  </div>
</template>

<script setup>
import TopHeader from '../../home/components/common/TopHeader.vue'
import PageFooter from '../../home/components/common/PageFooter.vue'
import FloatLoginBtn from '../../home/components/common/FloatLoginBtn.vue'
import DataAnalysisContent from '../components/courses/DataAnalysisContent.vue'
</script>

<style scoped>
.course-page {
  min-height: 100vh;
}
</style>
