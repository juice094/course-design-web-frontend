<template>
  <div class="admissions-process">
    <div class="process-container">
      <div class="section-header">
        <h2 class="section-title">招生流程</h2>
        <div class="title-underline"></div>
        <p class="section-desc">简单四步，开启你的求学之旅</p>
      </div>

      <div class="process-timeline">
        <div class="process-step" v-for="(step, index) in steps" :key="index">
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-content">
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-desc">{{ step.description }}</p>
            <div class="step-icon">
              <component :is="step.icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const steps = ref([
  {
    title: '在线申请',
    description: '填写在线申请表，提交个人信息和学术背景资料。',
    icon: 'FormIcon'
  },
  {
    title: '材料审核',
    description: '招生委员会审核申请材料，评估学术能力和综合素质。',
    icon: 'ReviewIcon'
  },
  {
    title: '面试评估',
    description: '通过初审的考生将参加面试，展示个人能力和潜力。',
    icon: 'InterviewIcon'
  },
  {
    title: '录取通知',
    description: '发放录取通知书，恭喜成为我们大家庭的一员！',
    icon: 'AcceptIcon'
  }
])
</script>

<style scoped>
.admissions-process {
  padding: 80px 0;
  background: #fff;
}

.process-container {
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

.process-timeline {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  position: relative;
}

.process-timeline::before {
  content: '';
  position: absolute;
  top: 50px;
  left: 10%;
  right: 10%;
  height: 3px;
  background: linear-gradient(to right, #f093fb, #f5576c);
  z-index: 0;
}

.process-step {
  position: relative;
  z-index: 1;
  text-align: center;
  animation: fadeInUp 0.8s ease both;
}

.process-step:nth-child(1) { animation-delay: 0.1s; }
.process-step:nth-child(2) { animation-delay: 0.2s; }
.process-step:nth-child(3) { animation-delay: 0.3s; }
.process-step:nth-child(4) { animation-delay: 0.4s; }

.step-number {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  font-weight: 700;
  color: #fff;
  margin: 0 auto 25px;
  box-shadow: 0 8px 20px rgba(240, 147, 251, 0.4);
  transition: all 0.3s ease;
}

.process-step:hover .step-number {
  transform: scale(1.1);
  box-shadow: 0 12px 30px rgba(240, 147, 251, 0.5);
}

.step-content {
  background: #f8f9fa;
  padding: 25px 20px;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.process-step:hover .step-content {
  background: #fff;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transform: translateY(-5px);
}

.step-title {
  font-size: 20px;
  color: #1a1a2e;
  margin-bottom: 12px;
  font-weight: 600;
}

.step-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
}

.step-icon {
  width: 50px;
  height: 50px;
  margin: 0 auto;
  background: rgba(240, 147, 251, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f093fb;
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
  .process-timeline {
    grid-template-columns: repeat(2, 1fr);
  }

  .process-timeline::before {
    display: none;
  }
}

@media (max-width: 768px) {
  .admissions-process {
    padding: 50px 0;
  }

  .section-title {
    font-size: 32px;
  }

  .process-timeline {
    grid-template-columns: 1fr;
  }
}
</style>
