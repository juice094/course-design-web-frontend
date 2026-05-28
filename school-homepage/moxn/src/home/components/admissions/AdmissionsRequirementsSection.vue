<template>
  <div class="admissions-requirements">
    <div class="requirements-container">
      <div class="section-header">
        <h2 class="section-title">招生要求</h2>
        <div class="title-underline"></div>
        <p class="section-desc">了解我们的入学标准和要求</p>
      </div>

      <div class="requirements-grid">
        <div class="requirement-card" v-for="(item, index) in requirements" :key="index">
          <div class="card-icon">
            <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor">
              <path :d="item.iconPath"/>
            </svg>
          </div>
          <h3 class="card-title">{{ item.title }}</h3>
          <ul class="card-list">
            <li v-for="(detail, idx) in item.details" :key="idx">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              <span>{{ detail }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const requirements = ref([
  {
    title: '学历要求',
    iconPath: 'M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z',
    details: [
      '高中毕业或同等学历',
      '提供完整的学业成绩单',
      '高考成绩达到本省一本线以上'
    ]
  },
  {
    title: '语言能力',
    iconPath: 'M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0014.07 6H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z',
    details: [
      '英语 CET-4 425分以上',
      '或 IELTS 5.5分以上',
      '或 TOEFL 70分以上'
    ]
  },
  {
    title: '专业要求',
    iconPath: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z',
    details: [
      '数学成绩良好',
      '对信息技术有浓厚兴趣',
      '具备一定的逻辑思维能力'
    ]
  },
  {
    title: '其他材料',
    iconPath: 'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z',
    details: [
      '个人陈述或自荐信',
      '推荐信（可选）',
      '获奖证书和荣誉证明'
    ]
  }
])
</script>

<style scoped>
.admissions-requirements {
  padding: 80px 0;
  background: #f8f9fa;
}

.requirements-container {
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
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  margin: 0 auto 15px;
  border-radius: 2px;
}

.section-desc {
  font-size: 18px;
  color: #666;
  font-weight: 300;
}

.requirements-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

.requirement-card {
  background: #fff;
  padding: 35px 25px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease;
  animation: fadeInUp 0.8s ease both;
}

.requirement-card:nth-child(1) { animation-delay: 0.1s; }
.requirement-card:nth-child(2) { animation-delay: 0.2s; }
.requirement-card:nth-child(3) { animation-delay: 0.3s; }
.requirement-card:nth-child(4) { animation-delay: 0.4s; }

.requirement-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}

.card-icon {
  width: 70px;
  height: 70px;
  margin: 0 auto 20px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.card-title {
  font-size: 22px;
  color: #1a1a2e;
  margin-bottom: 20px;
  font-weight: 600;
  text-align: center;
}

.card-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.card-list li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 12px;
  font-size: 14px;
  color: #555;
  line-height: 1.5;
}

.card-list svg {
  color: #f093fb;
  flex-shrink: 0;
  margin-top: 2px;
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
  .requirements-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .admissions-requirements {
    padding: 50px 0;
  }

  .section-title {
    font-size: 32px;
  }

  .requirements-grid {
    grid-template-columns: 1fr;
  }
}
</style>
