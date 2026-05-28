<template>
  <div class="service-icons">
    <div class="section-header">
      <h3>快速服务</h3>
      <a href="#" class="more">查看全部 →</a>
    </div>
    <div class="icons-grid">
      <div v-for="(item, index) in icons" :key="index" class="icon-item">
        <div class="icon-circle">
          <img :src="item.image" :alt="item.title">
        </div>
        <span>{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const icons = [
  { image: '/images/icon_01.jpg', title: '治理结构' },
  { image: '/images/icon_02.jpg', title: '机构导览' },
  { image: '/images/icon_03.jpg', title: '综合服务' },
  { image: '/images/icon_04.jpg', title: '校务办公' },
  { image: '/images/icon_05.jpg', title: '教师主页' },
  { image: '/images/icon_06.jpg', title: '信息公开' },
  { image: '/images/icon_07.jpg', title: '图书资源' },
  { image: '/images/icon_08.jpg', title: '电子邮件' },
  { image: '/images/icon_09.jpg', title: '校园网络' },
  { image: '/images/icon_10.jpg', title: '通知公告' }
]
</script>

<style scoped>
.service-icons {
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 60px 60px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.section-header h3 {
  font-size: 32px;
  color: #333;
  font-weight: 600;
}

.more {
  color: #e63946;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.more:hover {
  color: #d62839;
}

.icons-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 30px;
}

.icon-item {
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.icon-circle {
  width: 90px;
  height: 90px;
  margin: 0 auto 15px;
  border-radius: 50%;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 3px;
  transition: all 0.3s ease;
}

.icon-circle img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.icon-item:hover .icon-circle {
  transform: scale(1.1);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
}

.icon-item span {
  display: block;
  font-size: 15px;
  color: #333;
  font-weight: 500;
  transition: all 0.3s ease;
}

.icon-item:hover span {
  color: #667eea;
}
</style>
