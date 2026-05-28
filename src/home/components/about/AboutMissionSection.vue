<template>
  <div class="about-mission">
    <div class="mission-container">
      <div class="section-header">
        <h2 class="section-title">使命与愿景</h2>
        <div class="title-underline"></div>
        <p class="section-desc">我们的核心价值观与发展目标</p>
      </div>

      <div class="mission-content">
        <div class="mission-card">
          <div class="card-icon">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
              <path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16h2v2h-2zm0-6h2v4h-2z"/>
            </svg>
          </div>
          <h3 class="card-title">我们的使命</h3>
          <p class="card-text">
            致力于提供优质的信息技术教育，培养具有创新精神和实践能力的专业人才。
            我们通过前沿的课程体系、先进的教学方法和丰富的实践机会，
            帮助学生在快速变化的技术世界中保持竞争力。
          </p>
          <ul class="card-list">
            <li>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              <span>提供前沿的技术教育</span>
            </li>
            <li>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              <span>培养创新思维能力</span>
            </li>
            <li>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              <span>促进产学研深度融合</span>
            </li>
          </ul>
        </div>

        <div class="mission-card highlight">
          <div class="card-icon">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <h3 class="card-title">我们的愿景</h3>
          <p class="card-text">
            成为国内领先、国际知名的信息技术高等学府，
            在 Web 技术、人工智能、云计算等领域处于领先地位。
            我们期望通过持续创新和卓越教育，
            为社会培养更多优秀的技术人才，推动科技进步和社会发展。
          </p>
          <ul class="card-list">
            <li>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              <span>建设一流的教学团队</span>
            </li>
            <li>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              <span>打造国际化的教育平台</span>
            </li>
            <li>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              <span>推动技术创新与应用</span>
            </li>
          </ul>
        </div>

        <div class="mission-card">
          <div class="card-icon">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
            </svg>
          </div>
          <h3 class="card-title">核心价值观</h3>
          <p class="card-text">
            我们秉持"创新、实践、卓越"的核心价值观，
            注重学生的全面发展和个性培养。
            通过营造开放、包容、创新的学术氛围，
            激发每一位学生的潜能，助力他们实现人生理想。
          </p>
          <ul class="card-list">
            <li>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              <span>创新驱动发展</span>
            </li>
            <li>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              <span>实践铸就品质</span>
            </li>
            <li>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              <span>卓越成就未来</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.about-mission {
  padding: 80px 0;
  background: #fff;
}

.mission-container {
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

.mission-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.mission-card {
  background: #f8f9fa;
  padding: 40px 30px;
  border-radius: 16px;
  transition: all 0.4s ease;
  animation: fadeInUp 0.8s ease both;
  border: 2px solid transparent;
}

.mission-card:nth-child(1) { animation-delay: 0.1s; }
.mission-card:nth-child(2) { animation-delay: 0.2s; }
.mission-card:nth-child(3) { animation-delay: 0.3s; }

.mission-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
  border-color: #667eea;
  background: #fff;
}

.mission-card.highlight {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
}

.mission-card.highlight .card-title,
.mission-card.highlight .card-text,
.mission-card.highlight .card-list span {
  color: #fff;
}

.mission-card.highlight .card-list svg {
  color: #fff;
}

.card-icon {
  margin-bottom: 20px;
  color: #667eea;
}

.mission-card.highlight .card-icon {
  color: #fff;
}

.card-title {
  font-size: 24px;
  color: #1a1a2e;
  margin-bottom: 15px;
  font-weight: 600;
}

.card-text {
  font-size: 15px;
  color: #666;
  line-height: 1.8;
  margin-bottom: 20px;
  text-align: justify;
}

.card-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.card-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  font-size: 15px;
  color: #555;
}

.card-list svg {
  color: #667eea;
  flex-shrink: 0;
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
  .mission-content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .about-mission {
    padding: 50px 0;
  }

  .section-title {
    font-size: 32px;
  }

  .mission-card {
    padding: 30px 20px;
  }

  .card-title {
    font-size: 20px;
  }
}
</style>
