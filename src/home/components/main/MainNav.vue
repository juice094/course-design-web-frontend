<template>
  <div class="main-nav" :class="{ 'scrolled': isScrolled }">
    <div class="nav-inner">
      <ul class="nav-list">
        <li v-for="(item, index) in navItems" :key="index" class="nav-item">
          <a :href="item.link">
            {{ item.title }}
            <span class="arrow" v-if="item.children">▼</span>
          </a>
          <ul class="sub-menu" v-if="item.children">
            <li v-for="(sub, i) in item.children" :key="i">
              <a :href="sub.link">{{ sub.title }}</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)

const navItems = [
  { title: '首页', link: '#' },
  { title: '学校概况', link: '#', children: [{ title: '学校简介', link: '#' }, { title: '历史沿革', link: '#' }, { title: '校园风光', link: '#' }] },
  { title: ' admissions', link: '#', children: [{ title: '本科招生', link: '#' }, { title: '研究生招生', link: '#' }] },
  { title: '学术项目', link: '#', children: [{ title: '本科生教育', link: '#' }, { title: '研究生教育', link: '#' }] },
  { title: '校园生活', link: '#', children: [{ title: '学生活动', link: '#' }, { title: '社团组织', link: '#' }] },
  { title: '就业安置', link: '#', children: [{ title: '就业指导', link: '#' }, { title: '校企合作', link: '#' }] },
  { title: '研究创新', link: '#', children: [{ title: '科研平台', link: '#' }, { title: '科研成果', link: '#' }] }
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0
}

onMounted(() => {
  // 初始化时检查当前滚动位置
  handleScroll()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.main-nav {
  background: transparent !important;
  box-shadow: none;
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

.main-nav.scrolled {
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.nav-inner {
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
}

.nav-list {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  position: relative;
}

.nav-item > a {
  display: block;
  padding: 0 28px;
  color: #333;
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  line-height: 50px;
  white-space: nowrap;
  transition: all 0.3s ease;
  position: relative;
}

.nav-item > a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 3px;
  background: #e63946;
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.nav-item:hover > a {
  color: #e63946;
}

.nav-item:hover > a::after {
  width: 80%;
}

.arrow {
  font-size: 10px;
  margin-left: 4px;
  color: #999;
}

.sub-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background: #fff;
  border: 1px solid #eee;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 180px;
  z-index: 1000;
  list-style: none;
  padding: 8px 0;
  margin: 0;
  border-radius: 4px;
}

.nav-item:hover .sub-menu {
  display: block;
}

.sub-menu li a {
  display: block;
  padding: 10px 20px;
  color: #505050;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.3s ease;
}

.sub-menu li a:hover {
  color: #e63946;
  background-color: #f8f9fa;
  padding-left: 25px;
}
</style>
