<template>
  <div class="campus-scenery">
    <div class="scenery-carousel">
      <div class="carousel-bg">
        <img :src="sceneryList[currentIndex].image" :alt="sceneryList[currentIndex].title" class="bg-image" />
      </div>
      
      <div class="circle-container">
        <button class="carousel-btn prev-btn" @click="prevImage">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>
        
        <div class="circle-wrapper">
          <div class="circle-image">
            <img :src="sceneryList[currentIndex].image" :alt="sceneryList[currentIndex].title" />
          </div>
          <div class="circle-text">{{ sceneryList[currentIndex].title }}</div>
        </div>
        
        <button class="carousel-btn next-btn" @click="nextImage">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
            <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentIndex = ref(0)

const sceneryList = ref([
  {
    image: '/images/scenery_1.jpg',
    title: '大学校园建筑'
  },
  {
    image: '/images/scenery_2.jpg',
    title: '校园春色'
  },
  {
    image: '/images/scenery_3.jpg',
    title: '学术殿堂'
  },
  {
    image: '/images/scenery_4.jpg',
    title: '校园运动场'
  },
  {
    image: '/images/scenery_5.jpg',
    title: '校园广场'
  },
  {
    image: '/images/scenery_6.jpg',
    title: '学生活动中心'
  }
])

const prevImage = () => {
  currentIndex.value = (currentIndex.value - 1 + sceneryList.value.length) % sceneryList.value.length
}

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % sceneryList.value.length
}
</script>

<style scoped>
.campus-scenery {
  width: 90%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 60px 0;
}

.scenery-carousel {
  position: relative;
  width: 100%;
  height: 500px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.carousel-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.5s ease;
}

.carousel-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(30, 60, 120, 0.8);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  flex-shrink: 0;
}

.carousel-btn:hover {
  background: rgba(30, 60, 120, 1);
  transform: scale(1.1);
}

.circle-container {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
}

.circle-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.circle-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  border: 6px solid white;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  position: relative;
}

.circle-image::before {
  content: '';
  position: absolute;
  top: -12px;
  left: -12px;
  right: -12px;
  bottom: -12px;
  border: 2px solid rgba(255, 215, 0, 0.5);
  border-radius: 50%;
  animation: rotate 10s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.circle-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.circle-image:hover img {
  transform: scale(1.1);
}

.circle-text {
  font-size: 20px;
  font-weight: 600;
  color: white;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  letter-spacing: 2px;
}
</style>
