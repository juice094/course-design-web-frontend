<template>
  <div class="banner-slider" @mouseenter="stopAutoPlay" @mouseleave="startAutoPlay">
    <div class="banner-wrapper">
      <div
          v-for="(item, index) in banners"
          :key="index"
          class="banner-item"
          :class="{ active: currentIndex === index }"
      >
        <img :src="item.image" :alt="item.title">
      </div>
    </div>

    <div class="banner-overlay">
      <div class="banner-content">
        <h1 class="banner-title">{{ currentBanner.title }}</h1>
        <p class="banner-description">{{ currentBanner.description }}</p>
        <p class="banner-subtitle">{{ currentBanner.subtitle }}</p>
      </div>
    </div>

    <div class="banner-dots">
      <span
          v-for="(item, index) in banners"
          :key="index"
          :class="{ active: currentIndex === index }"
          @click="goTo(index)"
      ></span>
    </div>

    <div class="banner-arrow prev" @click="prev">
      <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor">
        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
      </svg>
    </div>
    <div class="banner-arrow next" @click="next">
      <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor">
        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const banners = ref([
  {
    image: '/images/web-1.jpg',
    title: 'BENNETTUNIVERSITY',
    description: 'Web技术大学提供令人兴奋的协作空间，助力未来企业家成长',
    subtitle: '在这里，你将获得世界一流的教育资源和无限的发展机遇'
  },
  {
    image: '/images/web-2.jpg',
    title: '探索无限可能',
    description: '世界级的教育，全球化的学术合作',
    subtitle: '与来自世界各地的优秀学子共同学习，开拓国际视野'
  },
  {
    image: '/images/web-3.jpg',
    title: '创新引领未来',
    description: '培养具有创新精神和实践能力的优秀人才',
    subtitle: '通过前沿课程和实践项目，激发你的创新潜能和领导力'
  },
  {
    image: '/images/web-4.jpg',
    title: '卓越学术研究',
    description: '前沿科研平台，推动学术创新发展',
    subtitle: '参与顶尖科研项目，与知名学者一起探索科技前沿'
  },
  {
    image: '/images/web-5.jpg',
    title: '国际化校园',
    description: '多元文化融合，开阔国际视野',
    subtitle: '体验多元文化碰撞，培养全球化思维和跨文化交流能力'
  }
])

const currentIndex = ref(0)
const currentBanner = computed(() => banners.value[currentIndex.value])

let timer = null

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % banners.value.length
}

const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + banners.value.length) % banners.value.length
}

const goTo = (index) => {
  currentIndex.value = index
}

const startAutoPlay = () => {
  timer = setInterval(next, 5000)
}

const stopAutoPlay = () => {
  clearInterval(timer)
}

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<style scoped>
.banner-slider {
  position: relative;
  width: 100%;
  height: 450px;
  overflow: hidden;
}

.banner-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.banner-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 1s ease;
}

.banner-item.active {
  opacity: 1;
}

.banner-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-overlay {
  position: absolute;
  top: 0;
  right: 110px;
  width: 20%;
  height: 100%;
  background: linear-gradient(135deg, rgba(0, 71, 171, 0.75) 0%, rgba(0, 71, 171, 0.80) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 40px;
  transition: all 0.3s ease;
}

.banner-overlay:hover {
  background: linear-gradient(135deg, rgba(0, 71, 171, 0.85) 0%, rgba(0, 71, 171, 0.90) 100%);
}

.banner-content {
  max-width: 320px;
  color: #fff;
  text-align: center;
}

.banner-content h1.banner-title {
  font-size: 28px;
  margin-bottom: 25px;
  line-height: 1.3;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 
    2px 2px 4px rgba(0, 0, 0, 0.5),
    0 0 10px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(0, 0, 0, 0.2);
  letter-spacing: 2px;
  animation: titleGlow 2s ease-in-out infinite alternate;
}

@keyframes titleGlow {
  from {
    text-shadow: 
      2px 2px 4px rgba(0, 0, 0, 0.5),
      0 0 10px rgba(0, 0, 0, 0.3),
      0 0 20px rgba(0, 0, 0, 0.2);
  }
  to {
    text-shadow: 
      2px 2px 8px rgba(0, 0, 0, 0.6),
      0 0 15px rgba(0, 0, 0, 0.4),
      0 0 30px rgba(0, 0, 0, 0.3),
      0 0 40px rgba(255, 255, 255, 0.1);
  }
}

.banner-content p.banner-description {
  font-size: 15px;
  line-height: 1.8;
  margin-bottom: 15px;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 
    1px 1px 2px rgba(0, 0, 0, 0.4),
    0 0 8px rgba(0, 0, 0, 0.2);
  font-weight: 500;
}

.banner-content p.banner-subtitle {
  font-size: 13px;
  line-height: 1.7;
  margin-bottom: 0;
  color: rgba(255, 255, 255, 0.8);
  text-shadow: 
    1px 1px 2px rgba(0, 0, 0, 0.3),
    0 0 6px rgba(0, 0, 0, 0.15);
  font-weight: 400;
}

.banner-dots {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 100;
}

.banner-dots span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
}

.banner-dots span.active {
  background: #fff;
  transform: scale(1.2);
}

.banner-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 100;
  transition: all 0.3s ease;
  color: #fff;
}

.banner-arrow:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-50%) scale(1.1);
}

.banner-arrow.prev {
  left: 30px;
}

.banner-arrow.next {
  right: 30px;
}
</style>
