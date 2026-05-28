<template>
  <div class="focus-news">
    <div class="section-header">
      <h3>焦点新闻</h3>
      <a href="#" class="more">查看全部 →</a>
    </div>
    <div class="focus-news-container">
      <!-- 左侧：图片轮播 -->
      <div class="carousel-section">
        <div class="carousel-wrapper">
          <div 
            class="carousel-slide" 
            v-for="(item, index) in carouselNews" 
            :key="index"
            :class="{ active: currentSlide === index }"
          >
            <img :src="item.image" :alt="item.title">
            <div class="carousel-overlay">
              <div class="carousel-title">{{ item.title }}</div>
              <div class="carousel-desc">{{ item.description }}</div>
            </div>
          </div>
          
          <!-- 轮播控制按钮 -->
          <button class="carousel-btn prev" @click="prevSlide">‹</button>
          <button class="carousel-btn next" @click="nextSlide">›</button>
          
          <!-- 轮播指示器 -->
          <div class="carousel-indicators">
            <span 
              v-for="(item, index) in carouselNews" 
              :key="index"
              :class="{ active: currentSlide === index }"
              @click="goToSlide(index)"
            ></span>
          </div>
        </div>
      </div>
      
      <!-- 右侧：新闻列表 -->
      <div class="news-list-section">
        <div class="news-list">
          <div 
            v-for="(item, index) in displayNews" 
            :key="index"
            class="news-item"
            :class="{ active: activeNewsIndex === index }"
            @click="handleNewsClick(index)"
          >
            <div class="news-date">{{ item.date }}</div>
            <div class="news-title">{{ item.title }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentSlide = ref(0)
const activeNewsIndex = ref(-1) // 当前选中的新闻列表项
let timer = null

// 轮播新闻数据（带图片）
const carouselNews = [
  {
    image: '/images/news_1.jpg',
    title: '仲恺农业工程学院党委书记翟雪梅一行来校调研交流',
    description: '2026年5月26日，仲恺农业工程学院党委书记翟雪梅一行莅临我校进行调研交流',
    date: '05-26'
  },
  {
    image: '/images/news_2.jpg',
    title: 'Web技术大学与华为签署战略合作协议',
    description: '双方在人工智能、云计算等领域展开深度合作，共同培养新一代IT人才',
    date: '05-28'
  },
  {
    image: '/images/news_3.jpg',
    title: '我校举办2026年Web技术开发大赛',
    description: '来自全国50所高校的300余支队伍参加此次技术盛会',
    date: '05-26'
  },
  {
    image: '/images/news_4.jpg',
    title: 'Web技术大学发布《2026人工智能教育白皮书》',
    description: '白皮书全面分析了AI技术在教育领域的应用现状和发展趋势',
    date: '05-24'
  },
  {
    image: '/images/news_5.jpg',
    title: '我校承办全国高校Web技术教学研讨会',
    description: '来自200余所高校的专家学者共同探讨Web技术教育创新发展',
    date: '05-23'
  }
]

// 右侧新闻列表数据（不包括轮播中的新闻）
const allNews = [
  { date: '05-21', title: 'Web技术大学与腾讯共建AI联合实验室' },
  { date: '05-21', title: '我校学生团队在全国程序设计大赛中获特等奖' },
  { date: '05-20', title: '学校召开2026年度教学工作总结会议' },
  { date: '05-18', title: 'Web技术大学新增3个国家级一流本科专业' },
  { date: '05-16', title: '我校教师团队荣获全国教学创新大赛一等奖' },
  { date: '05-15', title: 'Web技术大学2026年招生简章正式发布' },
  { date: '05-13', title: '学校举办校园开放日活动，吸引数千名学生参观' },
  { date: '05-12', title: 'Web技术大学入选国家一流学科建设名单' },
  { date: '05-10', title: '我校与国际知名高校签署交换生项目协议' }
]

// 只显示列表中的新闻
const displayNews = allNews

// 轮播控制函数
const goToSlide = (index) => {
  currentSlide.value = index
  activeNewsIndex.value = -1 // 点击轮播时清除列表选中状态
}

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % carouselNews.length
  activeNewsIndex.value = -1
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + carouselNews.length) % carouselNews.length
  activeNewsIndex.value = -1
}

// 点击新闻列表项
const handleNewsClick = (index) => {
  activeNewsIndex.value = index
  // 这里可以添加跳转到新闻详情页的逻辑
  console.log('点击了新闻:', displayNews.value[index].title)
}

// 自动轮播
const startAutoPlay = () => {
  timer = setInterval(() => {
    nextSlide()
  }, 4000)
}

const stopAutoPlay = () => {
  if (timer) {
    clearInterval(timer)
  }
}

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<style scoped>
.focus-news {
  width: 100%;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid #e63946;
}

.section-header h3 {
  font-size: 24px;
  color: #333;
  font-weight: 600;
  position: relative;
  padding-left: 15px;
}

.section-header h3::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 24px;
  background: #e63946;
  border-radius: 2px;
}

.more {
  color: #e63946;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.more:hover {
  color: #d62839;
}

.focus-news-container {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 25px;
  align-items: start;
}

/* 左侧轮播区域 */
.carousel-section {
  grid-column: 1 / 2;
  position: relative;
}

.carousel-wrapper {
  position: relative;
  width: 100%;
  height: 420px;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.carousel-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.carousel-slide.active {
  opacity: 1;
}

.carousel-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  padding: 40px 20px 20px;
  color: #fff;
}

.carousel-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
  line-height: 1.4;
}

.carousel-desc {
  font-size: 14px;
  line-height: 1.6;
  opacity: 0.9;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.3);
  border: none;
  color: #fff;
  width: 40px;
  height: 40px;
  font-size: 24px;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.3s ease;
  z-index: 10;
}

.carousel-btn:hover {
  background: rgba(255, 255, 255, 0.5);
}

.carousel-btn.prev {
  left: 10px;
}

.carousel-btn.next {
  right: 10px;
}

.carousel-indicators {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
}

.carousel-indicators span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
}

.carousel-indicators span.active {
  background: #fff;
  width: 24px;
  border-radius: 5px;
}

/* 右侧新闻列表 */
.news-list-section {
  grid-column: 2 / 3;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  max-height: 420px;
}

.news-list {
  padding: 15px 0;
}

.news-item {
  padding: 14px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 1px dashed #eee;
}

.news-item:last-child {
  border-bottom: none;
}

.news-item:hover {
  background: #f8f9fa;
  padding-left: 25px;
}

.news-item.active {
  background: #fff5f5;
  border-left: 3px solid #e63946;
}

.news-date {
  font-size: 13px;
  color: #999;
  margin-bottom: 5px;
}

.news-title {
  font-size: 14px;
  color: #333;
  line-height: 1.6;
  transition: all 0.3s ease;
}

.news-item:hover .news-title {
  color: #e63946;
}
</style>
