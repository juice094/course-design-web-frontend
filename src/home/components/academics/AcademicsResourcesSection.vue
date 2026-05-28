<template>
  <div class="academics-resources">
    <div class="resources-container">
      <div class="section-header">
        <h2 class="section-title">教学资源</h2>
        <div class="title-underline"></div>
        <p class="section-desc">先进的教学设施和丰富的学习资源</p>
      </div>

      <div class="resources-grid">
        <div class="resource-card" v-for="(resource, index) in resources" :key="index">
          <div class="resource-image">
            <img :src="resource.image" :alt="resource.title">
            <div class="resource-overlay">
              <div class="resource-icon">
                <component :is="resource.icon" />
              </div>
            </div>
          </div>
          <div class="resource-content">
            <h3 class="resource-title">{{ resource.title }}</h3>
            <p class="resource-desc">{{ resource.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const resources = ref([
  {
    title: '现代化实验室',
    icon: 'LabIcon',
    image: '/images/resource_lab.jpg',
    description: '配备最新硬件和软件设备的计算机实验室，支持各种实验和开发项目。'
  },
  {
    title: '数字图书馆',
    icon: 'LibraryIcon',
    image: '/images/resource_library.jpg',
    description: '海量电子资源，包括学术期刊、电子书、数据库等，随时随地访问。'
  },
  {
    title: '在线学习平台',
    icon: 'PlatformIcon',
    image: '/images/resource_online.jpg',
    description: '提供丰富的在线课程和学习资源，支持自主学习和互动交流。'
  },
  {
    title: '创客空间',
    icon: 'MakerIcon',
    image: '/images/resource_maker.jpg',
    description: '创新的实践空间，配备3D打印机、开发板等设备，激发创新思维。'
  }
])
</script>

<style scoped>
.academics-resources {
  padding: 80px 0;
  background: #f8f9fa;
}

.resources-container {
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
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  margin: 0 auto 15px;
  border-radius: 2px;
}

.section-desc {
  font-size: 18px;
  color: #666;
  font-weight: 300;
}

.resources-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

.resource-card {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease;
  animation: fadeInUp 0.8s ease both;
}

.resource-card:nth-child(1) { animation-delay: 0.1s; }
.resource-card:nth-child(2) { animation-delay: 0.2s; }
.resource-card:nth-child(3) { animation-delay: 0.3s; }
.resource-card:nth-child(4) { animation-delay: 0.4s; }

.resource-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}

.resource-image {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.resource-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.resource-card:hover .resource-image img {
  transform: scale(1.1);
}

.resource-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(79, 172, 254, 0.8), rgba(0, 242, 254, 0.8));
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.resource-card:hover .resource-overlay {
  opacity: 1;
}

.resource-icon {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4facfe;
}

.resource-content {
  padding: 25px 20px;
}

.resource-title {
  font-size: 20px;
  color: #1a1a2e;
  margin-bottom: 12px;
  font-weight: 600;
}

.resource-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
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
  .resources-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .academics-resources {
    padding: 50px 0;
  }

  .section-title {
    font-size: 32px;
  }

  .resources-grid {
    grid-template-columns: 1fr;
  }
}
</style>
