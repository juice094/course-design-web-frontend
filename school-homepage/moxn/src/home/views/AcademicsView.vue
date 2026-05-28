<template>
  <div class="academics-page">
    <!-- 使用公共头部 -->
    <TopHeader />
    
    <!-- 顶部横幅 -->
    <AcademicsHeroSection />
    
    <!-- 专业介绍 -->
    <AcademicsProgramsSection />
    
    <!-- 师资力量 -->
    <AcademicsFacultySection />
    
    <!-- 教学资源 -->
    <AcademicsResourcesSection />
    
    <!-- 使用公共尾部 -->
    <PageFooter />
    
    <!-- 悬浮登录按钮 -->
    <FloatLoginBtn />
  </div>
</template>

<script setup>
import TopHeader from '../components/common/TopHeader.vue'
import PageFooter from '../components/common/PageFooter.vue'
import FloatLoginBtn from '../components/common/FloatLoginBtn.vue'
import AcademicsHeroSection from '../components/academics/AcademicsHeroSection.vue'
import AcademicsProgramsSection from '../components/academics/AcademicsProgramsSection.vue'
import AcademicsFacultySection from '../components/academics/AcademicsFacultySection.vue'
import AcademicsResourcesSection from '../components/academics/AcademicsResourcesSection.vue'
</script>

<style scoped>
.academics-page {
  min-height: 100vh;
}
</style>
