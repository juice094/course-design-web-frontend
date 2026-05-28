<template>
  <div class="academics-hero">
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <h1 class="hero-title">学术项目</h1>
      <p class="hero-subtitle">探索多元化的学术课程和专业方向</p>
      <div class="hero-breadcrumb">
        <router-link to="/">首页</router-link>
        <span class="separator">/</span>
        <span class="current">学术项目</span>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.academics-hero {
  position: relative;
  height: 400px;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('/images/resource_lab.jpg') center/cover;
  opacity: 0.1;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: #fff;
  padding: 0 20px;
}

.hero-title {
  font-size: 56px;
  font-weight: 700;
  margin-bottom: 16px;
  letter-spacing: 2px;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
  animation: fadeInUp 0.8s ease;
}

.hero-subtitle {
  font-size: 20px;
  margin-bottom: 30px;
  opacity: 0.95;
  font-weight: 300;
  animation: fadeInUp 0.8s ease 0.2s both;
}

.hero-breadcrumb {
  font-size: 14px;
  opacity: 0.9;
  animation: fadeInUp 0.8s ease 0.4s both;
}

.hero-breadcrumb a {
  color: #fff;
  text-decoration: none;
  transition: opacity 0.3s ease;
}

.hero-breadcrumb a:hover {
  opacity: 0.8;
  text-decoration: underline;
}

.separator {
  margin: 0 10px;
}

.current {
  font-weight: 500;
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

@media (max-width: 768px) {
  .academics-hero {
    height: 300px;
  }

  .hero-title {
    font-size: 40px;
  }

  .hero-subtitle {
    font-size: 16px;
  }
}
</style>
