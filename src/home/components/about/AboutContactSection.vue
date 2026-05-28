<template>
  <div class="about-contact">
    <div class="contact-container">
      <div class="section-header">
        <h2 class="section-title">联系我们</h2>
        <div class="title-underline"></div>
        <p class="section-desc">欢迎随时与我们取得联系</p>
      </div>

      <div class="contact-content">
        <div class="contact-info">
          <div class="info-card" v-for="(item, index) in contactItems" :key="index">
            <div class="info-icon">
              <component :is="item.icon" />
            </div>
            <div class="info-details">
              <h3 class="info-title">{{ item.title }}</h3>
              <p class="info-text">{{ item.text }}</p>
            </div>
          </div>
        </div>

        <div class="contact-form-wrapper">
          <div class="form-header">
            <h3>发送消息</h3>
            <p>有任何问题？请填写以下表单</p>
          </div>
          
          <form class="contact-form" @submit.prevent="handleSubmit">
            <div class="form-group">
              <input 
                type="text" 
                v-model="formData.name" 
                placeholder="您的姓名" 
                required
              >
            </div>
            <div class="form-group">
              <input 
                type="email" 
                v-model="formData.email" 
                placeholder="您的邮箱" 
                required
              >
            </div>
            <div class="form-group">
              <input 
                type="tel" 
                v-model="formData.phone" 
                placeholder="联系电话"
              >
            </div>
            <div class="form-group">
              <textarea 
                v-model="formData.message" 
                placeholder="请输入您的消息..." 
                rows="5"
                required
              ></textarea>
            </div>
            <button type="submit" class="submit-btn">
              <span>发送消息</span>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </form>
        </div>
      </div>

      <div class="map-section">
        <div class="map-placeholder">
          <div class="map-overlay">
            <svg viewBox="0 0 24 24" width="64" height="64" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <h3>学校位置</h3>
            <p>苏州希望小区通南大街88号</p>
            <p class="map-note">地图展示区域（可使用 favicon.ico 作为占位图）</p>
          </div>
          <img src="/images/contact_map.jpg" alt="地图位置" class="map-bg">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const contactItems = ref([
  {
    title: '学校地址',
    text: '苏州希望小区通南大街88号',
    icon: 'LocationIcon'
  },
  {
    title: '联系电话',
    text: '8900 - 444 - 422',
    icon: 'PhoneIcon'
  },
  {
    title: '电子邮箱',
    text: 'info@webtech.edu.cn',
    icon: 'EmailIcon'
  },
  {
    title: '工作时间',
    text: '周一至周五 8:00 - 17:00',
    icon: 'TimeIcon'
  }
])

const formData = reactive({
  name: '',
  email: '',
  phone: '',
  message: ''
})

const handleSubmit = () => {
  alert('消息已发送！我们会尽快与您联系。')
  formData.name = ''
  formData.email = ''
  formData.phone = ''
  formData.message = ''
}
</script>

<style scoped>
.about-contact {
  padding: 80px 0;
  background: #f8f9fa;
}

.contact-container {
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  margin: 0 auto 15px;
  border-radius: 2px;
}

.section-desc {
  font-size: 18px;
  color: #666;
  font-weight: 300;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 40px;
  margin-bottom: 50px;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-card {
  background: #fff;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 20px;
  transition: all 0.3s ease;
  animation: fadeInLeft 0.8s ease both;
}

.info-card:nth-child(1) { animation-delay: 0.1s; }
.info-card:nth-child(2) { animation-delay: 0.2s; }
.info-card:nth-child(3) { animation-delay: 0.3s; }
.info-card:nth-child(4) { animation-delay: 0.4s; }

.info-card:hover {
  transform: translateX(5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.info-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-shrink: 0;
}

.info-details {
  flex: 1;
}

.info-title {
  font-size: 18px;
  color: #1a1a2e;
  margin-bottom: 5px;
  font-weight: 600;
}

.info-text {
  font-size: 15px;
  color: #666;
}

.contact-form-wrapper {
  background: #fff;
  padding: 35px;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  animation: fadeInRight 0.8s ease both;
}

.form-header {
  margin-bottom: 25px;
}

.form-header h3 {
  font-size: 24px;
  color: #1a1a2e;
  margin-bottom: 8px;
  font-weight: 600;
}

.form-header p {
  font-size: 14px;
  color: #888;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 14px 18px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 15px;
  font-family: inherit;
  transition: all 0.3s ease;
  background: #f8f9fa;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.submit-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border: none;
  padding: 16px 32px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
}

.submit-btn:active {
  transform: translateY(0);
}

.map-section {
  animation: fadeInUp 0.8s ease 0.3s both;
}

.map-placeholder {
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.map-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.map-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.9), rgba(118, 75, 162, 0.9));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-align: center;
  padding: 40px;
}

.map-overlay svg {
  margin-bottom: 20px;
  opacity: 0.9;
}

.map-overlay h3 {
  font-size: 28px;
  margin-bottom: 10px;
  font-weight: 600;
}

.map-overlay p {
  font-size: 16px;
  opacity: 0.95;
  margin-bottom: 5px;
}

.map-note {
  font-size: 14px;
  opacity: 0.8;
  margin-top: 15px;
  font-style: italic;
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
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
  .contact-content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .about-contact {
    padding: 50px 0;
  }

  .section-title {
    font-size: 32px;
  }

  .contact-form-wrapper {
    padding: 25px;
  }

  .map-placeholder {
    height: 300px;
  }
}
</style>
