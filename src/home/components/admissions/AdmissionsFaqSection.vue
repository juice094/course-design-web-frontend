<template>
  <div class="admissions-faq">
    <div class="faq-container">
      <div class="section-header">
        <h2 class="section-title">常见问题</h2>
        <div class="title-underline"></div>
        <p class="section-desc">解答你最关心的招生问题</p>
      </div>

      <div class="faq-list">
        <div 
          class="faq-item" 
          v-for="(item, index) in faqs" 
          :key="index"
          :class="{ active: activeIndex === index }"
          @click="toggleFaq(index)"
        >
          <div class="faq-question">
            <h3>{{ item.question }}</h3>
            <div class="faq-toggle">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
              </svg>
            </div>
          </div>
          <div class="faq-answer">
            <p>{{ item.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeIndex = ref(null)

const faqs = ref([
  {
    question: '招生时间和报名截止日期是什么时候？',
    answer: '我们的招生时间为每年3月至8月，报名截止日期为8月31日。建议提前准备申请材料，以免错过最佳报名时间。'
  },
  {
    question: '是否提供奖学金和助学金？',
    answer: '是的，我们为优秀学生提供多种奖学金，包括全额奖学金、半额奖学金和专业奖学金。同时设有助学金帮助有需要的学生。'
  },
  {
    question: '校园住宿条件如何？',
    answer: '学校提供现代化的学生公寓，配备空调、独立卫浴、网络等设施。学生可根据个人需求选择单人间、双人间或四人间。'
  },
  {
    question: '毕业后的就业前景如何？',
    answer: '我们的毕业生就业率连续多年保持在95%以上，与众多知名企业建立了长期合作关系，为学生提供丰富的实习和就业机会。'
  },
  {
    question: '是否支持转专业？',
    answer: '学生入学后第一学年结束可申请转专业，需满足目标专业的基本要求并通过相关考核。具体政策可咨询教务处。'
  }
])

const toggleFaq = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index
}
</script>

<style scoped>
.admissions-faq {
  padding: 80px 0;
  background: #fff;
}

.faq-container {
  max-width: 1000px;
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

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.faq-item {
  background: #f8f9fa;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  animation: fadeInUp 0.8s ease both;
}

.faq-item:nth-child(1) { animation-delay: 0.1s; }
.faq-item:nth-child(2) { animation-delay: 0.2s; }
.faq-item:nth-child(3) { animation-delay: 0.3s; }
.faq-item:nth-child(4) { animation-delay: 0.4s; }
.faq-item:nth-child(5) { animation-delay: 0.5s; }

.faq-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.faq-item.active {
  background: #fff;
  box-shadow: 0 8px 20px rgba(240, 147, 251, 0.2);
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 30px;
  gap: 20px;
}

.faq-question h3 {
  font-size: 18px;
  color: #1a1a2e;
  font-weight: 600;
  margin: 0;
  flex: 1;
}

.faq-toggle {
  width: 36px;
  height: 36px;
  background: rgba(240, 147, 251, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f093fb;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.faq-item.active .faq-toggle {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: #fff;
  transform: rotate(180deg);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease, padding 0.4s ease;
}

.faq-item.active .faq-answer {
  max-height: 200px;
  padding: 0 30px 25px;
}

.faq-answer p {
  font-size: 15px;
  color: #666;
  line-height: 1.8;
  margin: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .admissions-faq {
    padding: 50px 0;
  }

  .section-title {
    font-size: 32px;
  }

  .faq-question {
    padding: 20px;
  }

  .faq-question h3 {
    font-size: 16px;
  }

  .faq-item.active .faq-answer {
    padding: 0 20px 20px;
  }
}
</style>
