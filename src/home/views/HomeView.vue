<template>
  <div id="app">
    <TopHeader />
    <div id="banner-section">
      <BannerSlider />
    </div>
    <div id="courses-section">
      <CourseCards />
    </div>
    <div id="info-section">
      <UniversityIntro />
    </div>

    <div class="news-section" id="news-section">
      <div class="section-divider"></div>
      <div class="news-container">
        <div class="news-left">
          <FocusNews />
        </div>
        <div class="news-right">
          <NewsTabs />
        </div>
      </div>
    </div>

    <div id="scenery-section">
      <CampusScenery />
    </div>

    <div id="service-section">
      <ServiceIcons />
    </div>
    <PageFooter />
    <FloatLoginBtn />
  </div>
</template>

<script setup>
import TopHeader from '../components/common/TopHeader.vue'
import PageFooter from '../components/common/PageFooter.vue'
import FloatLoginBtn from '../components/common/FloatLoginBtn.vue'
import BannerSlider from '../components/main/BannerSlider.vue'
import FocusNews from '../components/main/FocusNews.vue'
import NewsTabs from '../components/main/NewsTabs.vue'
import ServiceIcons from '../components/main/ServiceIcons.vue'
import CourseCards from '../components/main/CourseCards.vue'
import UniversityIntro from '../components/main/UniversityIntro.vue'
import CampusScenery from '../components/main/CampusScenery.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "微软雅黑", "Microsoft YaHei", sans-serif;
  font-size: 14px;
  color: #333;
  background: #fff;
  overflow-x: hidden;
}

a {
  text-decoration: none;
  color: inherit;
}

ul, ol {
  list-style: none;
}

#app {
  min-height: 100vh;
}

.news-section {
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 60px 60px;
}

.section-divider {
  width: 100%;
  height: 1px;
  background: linear-gradient(to right, transparent, #e0e0e0, transparent);
  margin-bottom: 50px;
}

.news-container {
  display: grid;
  grid-template-columns: 1.8fr 1fr 1fr;
  gap: 30px;
  align-items: start;
}

.news-left {
  grid-column: 1 / 3;
}

.news-right {
  grid-column: 3 / 4;
}
</style>
