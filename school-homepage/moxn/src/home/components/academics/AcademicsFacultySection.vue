<template>
  <div class="academics-faculty">
    <div class="faculty-container">
      <div class="section-header">
        <h2 class="section-title">师资力量</h2>
        <div class="title-underline"></div>
        <p class="section-desc">汇聚国内外顶尖学者和行业专家</p>
      </div>

      <div class="faculty-stats">
        <div class="stat-item" v-for="(stat, index) in stats" :key="index">
          <div class="stat-number">{{ stat.number }}+</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>

      <div class="faculty-grid">
        <div class="faculty-card" v-for="(professor, index) in professors" :key="index">
          <div class="professor-avatar">
            <img :src="professor.avatar" :alt="professor.name">
          </div>
          <div class="professor-info">
            <h3 class="professor-name">{{ professor.name }}</h3>
            <p class="professor-title">{{ professor.title }}</p>
            <p class="professor-field">专业领域：{{ professor.field }}</p>
            <p class="professor-desc">{{ professor.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const stats = ref([
  { number: '200', label: '教授专家' },
  { number: '50', label: '博士生导师' },
  { number: '100', label: '海归学者' },
  { number: '30', label: '国际学者' }
])

const professors = ref([
  {
    name: '李明教授',
    title: '计算机学院 院长',
    field: '人工智能、机器学习',
    avatar: '/images/professor_1.jpg',
    description: '清华大学博士，发表SCI论文80余篇，主持国家级项目5项。'
  },
  {
    name: '王芳教授',
    title: '信息工程学院 副院长',
    field: '网络安全、密码学',
    avatar: '/images/professor_2.jpg',
    description: '麻省理工学院博士后，在顶级期刊发表论文60余篇。'
  },
  {
    name: '张伟教授',
    title: '数据科学系 主任',
    field: '大数据分析、数据挖掘',
    avatar: '/images/professor_3.jpg',
    description: '斯坦福大学访问学者，荣获国家科技进步奖。'
  },
  {
    name: '陈静教授',
    title: '软件工程系 教授',
    field: '软件工程、系统设计',
    avatar: '/images/professor_4.jpg',
    description: '拥有20年行业经验，曾任知名企业技术总监。'
  }
])
</script>

<style scoped>
.academics-faculty {
  padding: 80px 0;
  background: #fff;
}

.faculty-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-title {
  font-size: 42px;
  color: #1a1a2e;
  margin-bottom: 15px;
  font-weight: 700;
}

.title-underline {
  width: 80px;
  height: 4px;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  margin: 0 auto 15px;
  border-radius: 2px;
}

.section-desc {
  font-size: 18px;
  color: #666;
  font-weight: 300;
}

.faculty-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  margin-bottom: 60px;
}

.stat-item {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  padding: 35px 20px;
  border-radius: 16px;
  text-align: center;
  color: #fff;
  box-shadow: 0 8px 20px rgba(79, 172, 254, 0.3);
  transition: all 0.3s ease;
  animation: fadeInUp 0.8s ease both;
}

.stat-item:nth-child(1) { animation-delay: 0.1s; }
.stat-item:nth-child(2) { animation-delay: 0.2s; }
.stat-item:nth-child(3) { animation-delay: 0.3s; }
.stat-item:nth-child(4) { animation-delay: 0.4s; }

.stat-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(79, 172, 254, 0.4);
}

.stat-number {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 16px;
  opacity: 0.95;
}

.faculty-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

.faculty-card {
  background: #f8f9fa;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.4s ease;
  animation: fadeInUp 0.8s ease both;
}

.faculty-card:nth-child(1) { animation-delay: 0.1s; }
.faculty-card:nth-child(2) { animation-delay: 0.2s; }
.faculty-card:nth-child(3) { animation-delay: 0.3s; }
.faculty-card:nth-child(4) { animation-delay: 0.4s; }

.faculty-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  background: #fff;
}

.professor-avatar {
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.professor-avatar img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid rgba(255, 255, 255, 0.3);
}

.professor-info {
  padding: 25px 20px;
}

.professor-name {
  font-size: 20px;
  color: #1a1a2e;
  margin-bottom: 8px;
  font-weight: 600;
}

.professor-title {
  font-size: 14px;
  color: #4facfe;
  margin-bottom: 10px;
  font-weight: 500;
}

.professor-field {
  font-size: 13px;
  color: #666;
  margin-bottom: 12px;
  font-weight: 500;
}

.professor-desc {
  font-size: 13px;
  color: #888;
  line-height: 1.6;
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
  .faculty-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .faculty-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .academics-faculty {
    padding: 50px 0;
  }

  .section-title {
    font-size: 32px;
  }

  .faculty-stats {
    grid-template-columns: 1fr;
  }

  .faculty-grid {
    grid-template-columns: 1fr;
  }
}
</style>
