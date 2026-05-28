<template>
  <div class="software-engineering-content">
    <!-- Banner区域 -->
    <div class="course-banner" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
      <div class="banner-content">
        <div class="banner-icon">
          <img src="/images/icon_04.jpg" alt="软件工程">
        </div>
        <h1>软件工程</h1>
        <p class="subtitle">构建高质量软件系统的艺术</p>
      </div>
    </div>

    <!-- 课程简介 -->
    <div class="content-wrapper">
      <div class="intro-section">
        <h2>课程简介</h2>
        <p>软件工程课程全面讲授软件开发的生命周期，包括需求分析、系统设计、编码实现、测试和维护。通过项目驱动的教学方式，培养学生掌握现代软件工程方法和团队协作能力。</p>
        
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">📋</div>
            <h3>需求工程</h3>
            <p>掌握需求获取和分析方法</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon"></div>
            <h3>软件设计</h3>
            <p>学习架构设计和设计模式</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon"></div>
            <h3>软件测试</h3>
            <p>掌握自动化测试技术</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🔄</div>
            <h3>敏捷开发</h3>
            <p>理解Scrum和极限编程</p>
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
              <h3>软件工程导论</h3>
              <p>了解软件工程基本概念和发展历程</p>
            </div>
          </div>
          <div class="syllabus-item">
            <div class="module-number">02</div>
            <div class="module-content">
              <h3>需求分析与建模</h3>
              <p>学习UML建模和需求规格说明</p>
            </div>
          </div>
          <div class="syllabus-item">
            <div class="module-number">03</div>
            <div class="module-content">
              <h3>软件架构设计</h3>
              <p>掌握设计模式和架构风格</p>
            </div>
          </div>
          <div class="syllabus-item">
            <div class="module-number">04</div>
            <div class="module-content">
              <h3>软件测试与质量保证</h3>
              <p>学习单元测试、集成测试和系统测试</p>
            </div>
          </div>
          <div class="syllabus-item">
            <div class="module-number">05</div>
            <div class="module-content">
              <h3>项目管理与配置管理</h3>
              <p>掌握项目计划和版本控制</p>
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
            <h3>赵教授</h3>
            <p class="title">软件工程教研室主任</p>
            <p class="bio">拥有20年软件开发经验，曾主导多个大型软件项目，专注于软件架构设计和DevOps实践研究。</p>
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
            <span>开发工具集</span>
          </a>
          <a href="#" class="resource-link">
            <span class="link-icon"></span>
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
.software-engineering-content {
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
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
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
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
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
  background: #e3f2fd;
  transform: translateX(5px);
}

.module-number {
  font-size: 36px;
  font-weight: 700;
  color: #4facfe;
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
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
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
  color: #4facfe;
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
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
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
  background: #e3f2fd;
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
