<template>
  <div class="iot-content">
    <!-- Banner区域 -->
    <div class="course-banner" style="background: linear-gradient(135deg, #96e6a1 0%, #d4fc79 100%);">
      <div class="banner-content">
        <div class="banner-icon">
          <img src="/images/icon_10.jpg" alt="物联网工程">
        </div>
        <h1>物联网工程</h1>
        <p class="subtitle">连接万物的智能世界</p>
      </div>
    </div>

    <!-- 课程简介 -->
    <div class="content-wrapper">
      <div class="intro-section">
        <h2>课程简介</h2>
        <p>物联网工程课程涵盖传感器技术、嵌入式系统、无线通信、物联网平台等核心领域。通过理论与实践相结合，培养学生设计和实现物联网解决方案的能力，推动智能化发展。</p>
        
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">📡</div>
            <h3>传感器技术</h3>
            <p>掌握各类传感器原理和应用</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon"></div>
            <h3>嵌入式系统</h3>
            <p>学习ARM和嵌入式开发</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon"></div>
            <h3>无线通信</h3>
            <p>掌握WiFi、蓝牙、ZigBee等协议</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">️</div>
            <h3>物联网平台</h3>
            <p>学习IoT平台架构和开发</p>
          </div>
        </div>
      </div>

      <!-- 课程大纲 -->
      <div class="syllabus-section">
        <h2>课程大纲</h2>
        <div class="syllabus-list">
          <div class="syllabus-item">
            <div class="module-number">01</div>
            <div class="module-content">
              <h3>物联网导论</h3>
              <p>了解物联网发展历程和应用场景</p>
            </div>
          </div>
          <div class="syllabus-item">
            <div class="module-number">02</div>
            <div class="module-content">
              <h3>传感器与数据采集</h3>
              <p>学习传感器原理和数据采集技术</p>
            </div>
          </div>
          <div class="syllabus-item">
            <div class="module-number">03</div>
            <div class="module-content">
              <h3>嵌入式系统设计</h3>
              <p>掌握ARM架构和嵌入式编程</p>
            </div>
          </div>
          <div class="syllabus-item">
            <div class="module-number">04</div>
            <div class="module-content">
              <h3>物联网通信协议</h3>
              <p>学习MQTT、CoAP等物联网协议</p>
            </div>
          </div>
          <div class="syllabus-item">
            <div class="module-number">05</div>
            <div class="module-content">
              <h3>物联网应用开发</h3>
              <p>掌握智能家居、工业物联网等项目开发</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 教师信息 -->
      <div class="teacher-section">
        <h2>授课教师</h2>
        <div class="teacher-card">
          <div class="teacher-avatar">👨‍</div>
          <div class="teacher-info">
            <h3>郑教授</h3>
            <p class="title">物联网工程中心主任</p>
            <p class="bio">在物联网和嵌入式系统领域有15年经验，主持多项国家级物联网项目，专注于智能家居和工业物联网研究。</p>
          </div>
        </div>
      </div>

      <!-- 学习资源 -->
      <div class="resources-section">
        <h2>学习资源</h2>
        <div class="resource-links">
          <a href="#" class="resource-link">
            <span class="link-icon"></span>
            <span>课程课件下载</span>
          </a>
          <a href="#" class="resource-link">
            <span class="link-icon">🔧</span>
            <span>硬件实验平台</span>
          </a>
          <a href="#" class="resource-link">
            <span class="link-icon">📹</span>
            <span>教学视频</span>
          </a>
          <a href="#" class="resource-link">
            <span class="link-icon"></span>
            <span>课程讨论区</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.iot-content {
  background: #f8f9fa;
}

.course-banner {
  padding: 80px 40px;
  text-align: center;
  color: #fff;
}

.banner-content {
  max-width: 800px;
  margin: 0 auto;
}

.banner-icon {
  width: 100px;
  height: 100px;
  margin: 0 auto 20px;
  border-radius: 50%;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.2);
  padding: 10px;
}

.banner-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.course-banner h1 {
  font-size: 48px;
  margin-bottom: 15px;
  font-weight: 700;
}

.subtitle {
  font-size: 20px;
  opacity: 0.9;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 40px;
}

.intro-section {
  background: #fff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 40px;
}

.intro-section h2 {
  font-size: 32px;
  color: #333;
  margin-bottom: 20px;
  position: relative;
  padding-bottom: 15px;
}

.intro-section h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 4px;
  background: linear-gradient(135deg, #96e6a1 0%, #d4fc79 100%);
  border-radius: 2px;
}

.intro-section > p {
  font-size: 16px;
  line-height: 1.8;
  color: #666;
  margin-bottom: 30px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.feature-card {
  text-align: center;
  padding: 25px 15px;
  background: #f8f9fa;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 36px;
  margin-bottom: 10px;
}

.feature-card h3 {
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
}

.feature-card p {
  font-size: 14px;
  color: #666;
}

.syllabus-section {
  background: #fff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 40px;
}

.syllabus-section h2 {
  font-size: 32px;
  color: #333;
  margin-bottom: 30px;
  position: relative;
  padding-bottom: 15px;
}

.syllabus-section h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 4px;
  background: linear-gradient(135deg, #96e6a1 0%, #d4fc79 100%);
  border-radius: 2px;
}

.syllabus-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.syllabus-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.syllabus-item:hover {
  background: #e8f5e9;
  transform: translateX(5px);
}

.module-number {
  font-size: 36px;
  font-weight: 700;
  color: #96e6a1;
  min-width: 60px;
  text-align: center;
}

.module-content h3 {
  font-size: 18px;
  color: #333;
  margin-bottom: 5px;
}

.module-content p {
  font-size: 14px;
  color: #666;
}

.teacher-section {
  background: #fff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 40px;
}

.teacher-section h2 {
  font-size: 32px;
  color: #333;
  margin-bottom: 30px;
  position: relative;
  padding-bottom: 15px;
}

.teacher-section h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 4px;
  background: linear-gradient(135deg, #96e6a1 0%, #d4fc79 100%);
  border-radius: 2px;
}

.teacher-card {
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 20px;
}

.teacher-avatar {
  font-size: 80px;
  min-width: 100px;
  text-align: center;
}

.teacher-info h3 {
  font-size: 24px;
  color: #333;
  margin-bottom: 8px;
}

.teacher-info .title {
  font-size: 16px;
  color: #96e6a1;
  margin-bottom: 10px;
}

.teacher-info .bio {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}

.resources-section {
  background: #fff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.resources-section h2 {
  font-size: 32px;
  color: #333;
  margin-bottom: 30px;
  position: relative;
  padding-bottom: 15px;
}

.resources-section h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 4px;
  background: linear-gradient(135deg, #96e6a1 0%, #d4fc79 100%);
  border-radius: 2px;
}

.resource-links {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.resource-link {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  text-decoration: none;
  color: #333;
  transition: all 0.3s ease;
}

.resource-link:hover {
  background: #e8f5e9;
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.link-icon {
  font-size: 28px;
}

.resource-link span:last-child {
  font-size: 16px;
  font-weight: 500;
}
</style>
