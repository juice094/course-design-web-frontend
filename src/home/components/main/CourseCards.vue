<template>
  <div class="course-cards">
    <div class="cards-container">
      <div class="tabs-header">
        <span
            v-for="(tab, index) in tabs"
            :key="index"
            :class="{ active: activeTab === index }"
            @click="activeTab = index"
        >
          {{ tab }}
        </span>
      </div>

      <div class="cards-wrapper">
        <div v-show="activeTab === 0" class="cards-grid">
          <div v-for="(course, index) in undergraduateCourses" :key="index" class="course-card" @click="navigateToCourse(course.path)">
            <div class="card-icon">
              <img :src="course.icon" :alt="course.title">
            </div>
            <h4>{{ course.title }}</h4>
          </div>
        </div>

        <div v-show="activeTab === 1" class="cards-grid">
          <div v-for="(course, index) in graduateCourses" :key="index" class="course-card" @click="navigateToCourse(course.path)">
            <div class="card-icon">
              <img :src="course.icon" :alt="course.title">
            </div>
            <h4>{{ course.title }}</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeTab = ref(0)

const tabs = ['本科课程', '研究生课程']

const undergraduateCourses = [
  { icon: '/images/icon_01.jpg', title: 'Web技术', path: '/courses/web-tech' },
  { icon: '/images/icon_02.jpg', title: '工商管理', path: '/courses/business-admin' },
  { icon: '/images/icon_03.jpg', title: '计算机科学', path: '/courses/computer-science' },
  { icon: '/images/icon_04.jpg', title: '软件工程', path: '/courses/software-engineering' },
  { icon: '/images/icon_05.jpg', title: '数据分析', path: '/courses/data-analysis' }
]

const graduateCourses = [
  { icon: '/images/icon_06.jpg', title: '信息技术', path: '/courses/it' },
  { icon: '/images/icon_07.jpg', title: '人工智能', path: '/courses/ai' },
  { icon: '/images/icon_08.jpg', title: '网络安全', path: '/courses/cyber-security' },
  { icon: '/images/icon_09.jpg', title: '云计算', path: '/courses/cloud-computing' },
  { icon: '/images/icon_10.jpg', title: '物联网工程', path: '/courses/iot' }
]

const navigateToCourse = (path) => {
  router.push(path)
}
</script>

<style scoped>
.course-cards {
  background: #f8f9fa;
  padding: 40px 0 10px;
}

.cards-container {
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 60px;
}

.tabs-header {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 20px;
  border-bottom: 2px solid #e0e0e0;
}

.tabs-header span {
  padding: 12px 32px;
  font-size: 20px;
  font-weight: 600;
  color: #666;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
}

.tabs-header span::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 3px;
  background: #e63946;
  transition: width 0.3s ease;
}

.tabs-header span.active {
  color: #333;
}

.tabs-header span.active::after {
  width: 100%;
}

.tabs-header span:hover {
  color: #e63946;
}

.cards-wrapper {
  min-height: 280px;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 25px;
}

.course-card {
  background: #fff;
  border-radius: 8px;
  padding: 30px 20px;
  text-align: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
}

.course-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.card-icon {
  width: 70px;
  height: 70px;
  margin: 0 auto 15px;
  border-radius: 50%;
  overflow: hidden;
  background: #f0f0f0;
}

.card-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.course-card h4 {
  font-size: 16px;
  color: #333;
  font-weight: 500;
  margin: 0;
}

.course-card:hover h4 {
  color: #e63946;
}
</style>
