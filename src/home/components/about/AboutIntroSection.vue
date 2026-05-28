<template>
  <div class="about-intro">
    <div class="intro-container">
      <div class="section-header">
        <h2 class="section-title">学校简介</h2>
        <div class="title-underline"></div>
        <p class="section-desc">致力于培养未来的技术领袖</p>
      </div>

      <div class="intro-content">
        <div class="intro-text">
          <h3 class="intro-heading">Web 技术大学</h3>
          <p class="intro-paragraph">
            Web 技术大学成立于 2010 年，是一所专注于信息技术和互联网领域的高等学府。
            我们致力于为学生提供前沿的技术教育和实践机会，培养具有创新精神和国际视野的专业人才。
          </p>
          <p class="intro-paragraph">
            学校坐落于苏州希望小区通南大街88号，校园环境优美，教学设施先进。
            我们拥有一支高水平的师资队伍，其中包括多位国内外知名学者和行业专家。
          </p>
          <p class="intro-paragraph">
            多年来，Web 技术大学始终秉持"创新、实践、卓越"的办学理念，
            为社会培养了大批优秀的信息技术人才，毕业生深受用人单位好评。
          </p>
          
          <div class="intro-features">
            <div class="feature-item">
              <div class="feature-icon">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
                  <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
                </svg>
              </div>
              <h4>优质教育</h4>
              <p>提供前沿的技术课程和实践项目</p>
            </div>
            
            <div class="feature-item">
              <div class="feature-icon">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                </svg>
              </div>
              <h4>强大师资</h4>
              <p>汇聚国内外知名学者和行业专家</p>
            </div>
            
            <div class="feature-item">
              <div class="feature-icon">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h4>就业保障</h4>
              <p>与知名企业建立长期合作关系</p>
            </div>
          </div>
        </div>
        
        <div class="intro-image">
          <img src="/images/about_intro.jpg" alt="学校介绍">
          <div class="image-overlay">
            <div class="overlay-text">
              <span class="year">2010</span>
              <span class="label">建校年份</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.about-intro {
  padding: 80px 0;
  background: #f8f9fa;
}

.intro-container {
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

.intro-content {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 60px;
  align-items: center;
}

.intro-text {
  animation: fadeInLeft 0.8s ease;
}

.intro-heading {
  font-size: 32px;
  color: #1a1a2e;
  margin-bottom: 20px;
  font-weight: 600;
}

.intro-paragraph {
  font-size: 16px;
  line-height: 1.8;
  color: #555;
  margin-bottom: 15px;
  text-align: justify;
}

.intro-features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 40px;
}

.feature-item {
  text-align: center;
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.feature-icon {
  color: #667eea;
  margin-bottom: 12px;
}

.feature-item h4 {
  font-size: 16px;
  color: #1a1a2e;
  margin-bottom: 8px;
  font-weight: 600;
}

.feature-item p {
  font-size: 13px;
  color: #888;
  line-height: 1.5;
}

.intro-image {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  animation: fadeInRight 0.8s ease;
}

.intro-image img {
  width: 100%;
  height: 450px;
  object-fit: cover;
  display: block;
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  padding: 40px 30px 30px;
}

.overlay-text {
  display: flex;
  align-items: baseline;
  gap: 10px;
  color: #fff;
}

.year {
  font-size: 48px;
  font-weight: 700;
}

.label {
  font-size: 16px;
  opacity: 0.9;
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

@media (max-width: 1024px) {
  .intro-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .intro-image {
    order: -1;
  }

  .intro-features {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .about-intro {
    padding: 50px 0;
  }

  .section-title {
    font-size: 32px;
  }

  .intro-heading {
    font-size: 26px;
  }

  .intro-paragraph {
    font-size: 15px;
  }
}
</style>
