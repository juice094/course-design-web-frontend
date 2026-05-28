<template>
  <div class="top-header">
    <div class="top-bar">
      <div class="top-bar-inner">
        <div class="contact-phone">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
          <span>8900 - 444 - 422</span>
        </div>
        <div class="social-icons">
          <a href="#" class="social-icon" title="微信">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M9.5 4C5.36 4 2 6.69 2 10c0 1.89 1.08 3.56 2.78 4.66L4 17l2.5-1.18C7.61 16.23 8.53 16.5 9.5 16.5c.17 0 .33 0 .5-.02C9.68 15.99 9.5 15.51 9.5 15c0-3.04 2.69-5.5 6-5.5.17 0 .33.01.5.02C15.53 6.37 12.86 4 9.5 4zM7 8.5c-.83 0-1.5-.67-1.5-1.5S6.17 5.5 7 5.5s1.5.67 1.5 1.5S7.83 8.5 7 8.5zm5 0c-.83 0-1.5-.67-1.5-1.5S11.17 5.5 12 5.5s1.5.67 1.5 1.5S12.83 8.5 12 8.5zM22 14c0-2.76-2.69-5-6-5s-6 2.24-6 5 2.69 5 6 5c.7 0 1.37-.1 2-.28L20 19.5l-.56-2.24C21.09 16.35 22 15.28 22 14zm-7.5-1.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm5 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
            </svg>
          </a>
          <a href="#" class="social-icon" title="微博">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M10.1 18.3c-3.5.4-6.6-1.2-6.9-3.6-.3-2.4 2.4-4.7 5.9-5.1 3.5-.4 6.6 1.2 6.9 3.6.3 2.4-2.4 4.7-5.9 5.1zm6.3-9.6c-.3-.1-.5-.4-.4-.7.5-1.5.1-2.9-1.1-3.3-.3-.1-.4-.4-.3-.7.1-.3.4-.4.7-.3 1.8.6 2.4 2.5 1.8 4.5-.1.3-.4.5-.7.4-.1 0-.1 0 0 .1zm.9-1.2c-.1 0-.2-.1-.3-.1-.2-.2-.2-.5 0-.7.6-.8.5-1.8-.2-2.3-.2-.2-.2-.5 0-.7.2-.2.5-.2.7 0 1.1.8 1.3 2.4.5 3.6-.2.2-.4.2-.7.2zM18.5 14c-.8 2.4-3.6 3.7-6.2 3-2.6-.8-4.1-3.3-3.3-5.7.8-2.4 3.6-3.7 6.2-3 2.6.8 4.1 3.3 3.3 5.7z"/>
            </svg>
          </a>
          <a href="#" class="social-icon" title="邮箱">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>

    <div class="main-header">
      <div class="header-inner">
        <div class="header-left">
          <div class="logo">
            <img src="/images/logo.jpg" alt="Web技术大学">
          </div>
        </div>
        <div class="header-right">
          <router-link to="/" class="nav-link">首页</router-link>
          <router-link to="/about" class="nav-link">关于我们</router-link>
          <router-link to="/admissions" class="nav-link">招生信息</router-link>
          <router-link to="/academics" class="nav-link">学术项目</router-link>
          <a href="#" class="search-btn">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </a>
          <a href="#" class="apply-btn">立即申请</a>
        </div>
      </div>
    </div>

    <div class="main-nav">
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
  </div>
</template>

<script setup>
const navItems = [
  { title: '首页', link: '#' },
  { title: '学校概况', link: '#', children: [{ title: '学校简介', link: '#' }, { title: '历史沿革', link: '#' }, { title: '校园风光', link: '#' }] },
  { title: 'admissions', link: '#', children: [{ title: '本科招生', link: '#' }, { title: '研究生招生', link: '#' }] },
  { title: '学术项目', link: '#', children: [{ title: '本科生教育', link: '#' }, { title: '研究生教育', link: '#' }] },
  { title: '校园生活', link: '#', children: [{ title: '学生活动', link: '#' }, { title: '社团组织', link: '#' }] },
  { title: '就业安置', link: '#', children: [{ title: '就业指导', link: '#' }, { title: '校企合作', link: '#' }] },
  { title: '研究创新', link: '#', children: [{ title: '科研平台', link: '#' }, { title: '科研成果', link: '#' }] }
]
</script>

<style scoped>
.top-header {
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1001;
}

.top-bar {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 8px 0;
}

.top-bar-inner {
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.contact-phone {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
}

.contact-phone svg {
  opacity: 0.9;
}

.social-icons {
  display: flex;
  align-items: center;
  gap: 15px;
}

.social-icon {
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.social-icon:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.main-header {
  padding: 0;
}

.header-inner {
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 60px;
}

.header-left {
  display: flex;
  align-items: center;
}

.logo img {
  height: 50px;
  width: auto;
  transition: all 0.3s ease;
}

.logo:hover img {
  transform: scale(1.05);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 30px;
}

.nav-link {
  color: #333;
  text-decoration: none;
  font-size: 15px;
  padding: 10px 16px;
  border-radius: 4px;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.nav-link:hover {
  background: rgba(0, 0, 0, 0.05);
  color: #e63946;
}

.search-btn {
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.search-btn:hover {
  background: #f5f5f5;
  border-color: #e63946;
  color: #e63946;
}

.apply-btn {
  background: #e63946;
  color: #fff;
  text-decoration: none;
  padding: 12px 28px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 15px;
  transition: all 0.3s ease;
  white-space: nowrap;
  flex-shrink: 0;
}

.apply-btn:hover {
  background: #d62839;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(230, 57, 70, 0.4);
}

/* MainNav 样式 */
.main-nav {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
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
