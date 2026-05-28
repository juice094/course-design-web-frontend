<template>
  <div class="admissions-page">
    <!-- 使用公共头部 -->
    <TopHeader />
    
    <!-- 顶部横幅 -->
    <AdmissionsHeroSection />
    
    <!-- 招生流程 -->
    <AdmissionsProcessSection />
    
    <!-- 招生要求 -->
    <AdmissionsRequirementsSection />
    
    <!-- 常见问题 -->
    <AdmissionsFaqSection />
    
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
import AdmissionsHeroSection from '../components/admissions/AdmissionsHeroSection.vue'
import AdmissionsProcessSection from '../components/admissions/AdmissionsProcessSection.vue'
import AdmissionsRequirementsSection from '../components/admissions/AdmissionsRequirementsSection.vue'
import AdmissionsFaqSection from '../components/admissions/AdmissionsFaqSection.vue'
</script>

<style scoped>
.admissions-page {
  min-height: 100vh;
}
</style>
