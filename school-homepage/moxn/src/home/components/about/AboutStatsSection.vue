<template>
  <div class="about-stats">
    <div class="stats-container">
      <div class="section-header">
        <h2 class="section-title">数据见证实力</h2>
        <div class="title-underline"></div>
        <p class="section-desc">用数字展示我们的成就与影响</p>
      </div>

      <div class="stats-grid">
        <div class="stat-card" v-for="(stat, index) in stats" :key="index">
          <div class="stat-icon">
            <component :is="stat.icon" />
          </div>
          <div class="stat-number">{{ stat.number }}+</div>
          <div class="stat-label">{{ stat.label }}</div>
          <div class="stat-desc">{{ stat.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const stats = ref([
  {
    number: '15000',
    label: '在校学生',
    description: '来自全国各地的优秀学子',
    icon: 'UserIcon'
  },
  {
    number: '800',
    label: '专业教师',
    description: '高水平师资队伍',
    icon: 'TeacherIcon'
  },
  {
    number: '50',
    label: '专业课程',
    description: '涵盖信息技术各个领域',
    icon: 'CourseIcon'
  },
  {
    number: '95',
    label: '就业率 %',
    description: '毕业生就业率持续领先',
    icon: 'JobIcon'
  }
])
</script>

<style scoped>
.about-stats {
  padding: 80px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

.about-stats::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('/images/contact_map.jpg') center/cover;
  opacity: 0.05;
}

.stats-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  position: relative;
  z-index: 1;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-title {
  font-size: 42px;
  color: #fff;
  margin-bottom: 15px;
  font-weight: 700;
}

.title-underline {
  width: 80px;
  height: 4px;
  background: rgba(255, 255, 255, 0.8);
  margin: 0 auto 15px;
  border-radius: 2px;
}

.section-desc {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 300;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 40px 30px;
  text-align: center;
  transition: all 0.4s ease;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  animation: fadeInUp 0.8s ease both;
}

.stat-card:nth-child(1) { animation-delay: 0.1s; }
.stat-card:nth-child(2) { animation-delay: 0.2s; }
.stat-card:nth-child(3) { animation-delay: 0.3s; }
.stat-card:nth-child(4) { animation-delay: 0.4s; }

.stat-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
  background: rgba(255, 255, 255, 1);
}

.stat-icon {
  width: 70px;
  height: 70px;
  margin: 0 auto 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 32px;
}

.stat-number {
  font-size: 48px;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 10px;
  line-height: 1;
}

.stat-label {
  font-size: 20px;
  color: #1a1a2e;
  font-weight: 600;
  margin-bottom: 10px;
}

.stat-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .about-stats {
    padding: 50px 0;
  }

  .section-title {
    font-size: 32px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .stat-card {
    padding: 30px 20px;
  }

  .stat-number {
    font-size: 40px;
  }
}
</style>
