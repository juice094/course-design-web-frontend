<template>
  <div class="about-page">
    <!-- 使用公共头部 -->
    <TopHeader />
    
    <!-- 顶部横幅 -->
    <AboutHeroSection />
    
    <!-- 学校简介 -->
    <AboutIntroSection />
    
    <!-- 数据统计 -->
    <AboutStatsSection />
    
    <!-- 使命与愿景 -->
    <AboutMissionSection />
    
    <!-- 领导团队 -->
    <AboutTeamSection />
    
    <!-- 联系我们 -->
    <AboutContactSection />
    
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
import AboutHeroSection from '../components/about/AboutHeroSection.vue'
import AboutIntroSection from '../components/about/AboutIntroSection.vue'
import AboutStatsSection from '../components/about/AboutStatsSection.vue'
import AboutMissionSection from '../components/about/AboutMissionSection.vue'
import AboutTeamSection from '../components/about/AboutTeamSection.vue'
import AboutContactSection from '../components/about/AboutContactSection.vue'
</script>

<style scoped>
.about-page {
  min-height: 100vh;
}
</style>
