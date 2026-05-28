<template>
  <div class="cyber-security-content">
    <!-- Banner区域 -->
    <div class="course-banner" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
      <div class="banner-content">
        <div class="banner-icon">
          <img src="/images/icon_08.jpg" alt="网络安全">
        </div>
        <h1>网络安全</h1>
        <p class="subtitle">守护数字世界的安全</p>
      </div>
    </div>

    <!-- 课程简介 -->
    <div class="content-wrapper">
      <div class="intro-section">
        <h2>课程简介</h2>
        <p>网络安全课程全面讲授网络安全的基础理论和实战技术，包括密码学、网络攻防、安全协议、入侵检测等。培养学生识别和防御网络安全威胁的能力，成为网络安全领域的专业人才。</p>
        
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon"></div>
            <h3>密码学</h3>
            <p>掌握加密算法和密钥管理</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon"></div>
            <h3>网络攻防</h3>
            <p>学习渗透测试和防御技术</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🔐</div>
            <h3>安全协议</h3>
            <p>理解SSL/TLS等安全协议</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🛡️</div>
            <h3>入侵检测</h3>
            <p>掌握IDS/IPS系统部署</p>
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
              <h3>网络安全基础</h3>
              <p>学习网络安全概念和威胁模型</p>
            </div>
          </div>
          <div class="syllabus-item">
            <div class="module-number">02</div>
            <div class="module-content">
              <h3>密码学原理与应用</h3>
              <p>掌握对称加密、非对称加密和哈希函数</p>
            </div>
          </div>
          <div class="syllabus-item">
            <div class="module-number">03</div>
            <div class="module-content">
              <h3>Web安全</h3>
              <p>学习XSS、SQL注入等Web漏洞防护</p>
            </div>
          </div>
          <div class="syllabus-item">
            <div class="module-number">04</div>
            <div class="module-content">
              <h3>系统安全</h3>
              <p>掌握操作系统和数据库安全配置</p>
            </div>
          </div>
          <div class="syllabus-item">
            <div class="module-number">05</div>
            <div class="module-content">
              <h3>安全审计与应急响应</h3>
              <p>学习日志分析和事件处置流程</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 教师信息 -->
      <div class="teacher-section">
        <h2>授课教师</h2>
        <div class="teacher-card">
          <div class="teacher-avatar">👨‍💻</div>
          <div class="teacher-info">
            <h3>周教授</h3>
            <p class="title">网络安全实验室主任</p>
            <p class="bio">在网络安全领域有15年经验，曾参与多项国家级安全项目，专注于网络攻防技术和安全评估研究。</p>
          </div>
        </div>
      </div>

      <!-- 学习资源 -->
      <div class="resources-section">
        <h2>学习资源</h2>
        <div class="resource-links">
          <a href="#" class="resource-link">
            <span class="link-icon">📚</span>
            <span>课程课件下载</span>
          </a>
          <a href="#" class="resource-link">
            <span class="link-icon">🔧</span>
            <span>安全实验平台</span>
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
.cyber-security-content {
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
  background: #e8eaf6;
  transform: translateX(5px);
}

.module-number {
  font-size: 36px;
  font-weight: 700;
  color: #667eea;
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
  color: #667eea;
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
  background: #e8eaf6;
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
