<template>
  <div class="it-content">
    <!-- Banner区域 -->
    <div class="course-banner" style="background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);">
      <div class="banner-content">
        <div class="banner-icon">
          <img src="/images/icon_06.jpg" alt="信息技术">
        </div>
        <h1>信息技术</h1>
        <p class="subtitle">掌握信息技术前沿</p>
      </div>
    </div>

    <!-- 课程简介 -->
    <div class="content-wrapper">
      <div class="intro-section">
        <h2>课程简介</h2>
        <p>信息技术课程聚焦企业信息化的核心技术和应用，包括信息系统规划、IT项目管理、数据分析与决策支持等。培养学生运用信息技术解决商业问题的能力和全局视野。</p>
        
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon"></div>
            <h3>信息系统</h3>
            <p>掌握企业信息化系统建设</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">📊</div>
            <h3>数据分析</h3>
            <p>学习数据挖掘与商业智能</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon"></div>
            <h3>项目管理</h3>
            <p>掌握IT项目管理方法</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🔧</div>
            <h3>运维管理</h3>
            <p>学习系统运维和服务管理</p>
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
              <h3>信息系统战略与规划</h3>
              <p>学习IT战略规划和企业架构设计</p>
            </div>
          </div>
          <div class="syllabus-item">
            <div class="module-number">02</div>
            <div class="module-content">
              <h3>数据库与数据仓库</h3>
              <p>掌握关系数据库和数据仓库技术</p>
            </div>
          </div>
          <div class="syllabus-item">
            <div class="module-number">03</div>
            <div class="module-content">
              <h3>企业资源计划系统</h3>
              <p>学习ERP系统架构和实施方法</p>
            </div>
          </div>
          <div class="syllabus-item">
            <div class="module-number">04</div>
            <div class="module-content">
              <h3>商业智能与决策支持</h3>
              <p>掌握BI工具和数据可视化技术</p>
            </div>
          </div>
          <div class="syllabus-item">
            <div class="module-number">05</div>
            <div class="module-content">
              <h3>IT服务管理</h3>
              <p>学习ITIL框架和服务管理实践</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 教师信息 -->
      <div class="teacher-section">
        <h2>授课教师</h2>
        <div class="teacher-card">
          <div class="teacher-avatar">👨‍🏫</div>
          <div class="teacher-info">
            <h3>孙教授</h3>
            <p class="title">信息技术研究中心主任</p>
            <p class="bio">在企业信息化建设领域有20年经验，曾担任多家大型企业CIO，专注于数字化转型研究。</p>
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
            <span class="link-icon">💻</span>
            <span>实验环境</span>
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
.it-content {
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
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
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
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
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
  background: #fff3e0;
  transform: translateX(5px);
}

.module-number {
  font-size: 36px;
  font-weight: 700;
  color: #f6d365;
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
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
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
  color: #f6d365;
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
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
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
  background: #fff3e0;
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
