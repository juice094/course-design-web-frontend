<template>
  <div class="academics-programs">
    <div class="programs-container">
      <div class="section-header">
        <h2 class="section-title">专业介绍</h2>
        <div class="title-underline"></div>
        <p class="section-desc">多元化的专业设置，满足不同兴趣和需求</p>
      </div>

      <div class="programs-grid">
        <div class="program-card" v-for="(program, index) in programs" :key="index">
          <div class="program-icon">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
              <path :d="program.iconPath"/>
            </svg>
          </div>
          <h3 class="program-title">{{ program.title }}</h3>
          <p class="program-desc">{{ program.description }}</p>
          <ul class="program-features">
            <li v-for="(feature, idx) in program.features" :key="idx">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              <span>{{ feature }}</span>
            </li>
          </ul>
          <router-link :to="program.link" class="program-link">
            了解详情
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
            </svg>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const programs = ref([
  {
    title: 'Web技术',
    iconPath: 'M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z',
    description: '学习现代Web开发技术，包括HTML5、CSS3、JavaScript框架等。',
    features: ['前端开发', '后端技术', '全栈开发'],
    link: '/courses/web-tech'
  },
  {
    title: '人工智能',
    iconPath: 'M21 10.5h-1.5V9c0-1.1-.9-2-2-2h-1.5V5.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V7h-3V5.5c0-.83-.67-1.5-1.5-1.5S7 4.67 7 5.5V7H5.5c-1.1 0-2 .9-2 2v1.5H2v2h1.5v1.5c0 1.1.9 2 2 2H7v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V14h3v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V14h1.5c1.1 0 2-.9 2-2v-1.5H21v-2z',
    description: '探索机器学习、深度学习和自然语言处理等AI核心技术。',
    features: ['机器学习', '深度学习', 'AI应用'],
    link: '/courses/ai'
  },
  {
    title: '计算机科学',
    iconPath: 'M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z',
    description: '扎实的计算机科学基础，涵盖算法、数据结构和系统设计。',
    features: ['算法设计', '系统架构', '软件工程'],
    link: '/courses/computer-science'
  },
  {
    title: '数据分',
    iconPath: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z',
    description: '掌握大数据分析、数据挖掘和可视化技术。',
    features: ['数据处理', '统计分析', '可视化'],
    link: '/courses/data-analysis'
  },
  {
    title: '网络安全',
    iconPath: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z',
    description: '学习网络安全防护、渗透测试和安全审计技术。',
    features: ['安全防护', '渗透测试', '安全审计'],
    link: '/courses/cyber-security'
  },
  {
    title: '云计算',
    iconPath: 'M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z',
    description: '了解云计算架构、虚拟化和云服务平台管理。',
    features: ['云架构', '虚拟化', 'DevOps'],
    link: '/courses/cloud-computing'
  }
])
</script>

<style scoped>
.academics-programs {
  padding: 80px 0;
  background: #f8f9fa;
}

.programs-container {
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

.programs-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.program-card {
  background: #fff;
  padding: 35px 30px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease;
  animation: fadeInUp 0.8s ease both;
}

.program-card:nth-child(1) { animation-delay: 0.1s; }
.program-card:nth-child(2) { animation-delay: 0.2s; }
.program-card:nth-child(3) { animation-delay: 0.3s; }
.program-card:nth-child(4) { animation-delay: 0.4s; }
.program-card:nth-child(5) { animation-delay: 0.5s; }
.program-card:nth-child(6) { animation-delay: 0.6s; }

.program-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}

.program-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.program-title {
  font-size: 24px;
  color: #1a1a2e;
  margin-bottom: 15px;
  font-weight: 600;
  text-align: center;
}

.program-desc {
  font-size: 15px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
  text-align: center;
}

.program-features {
  list-style: none;
  padding: 0;
  margin: 0 0 25px 0;
}

.program-features li {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  font-size: 14px;
  color: #555;
}

.program-features svg {
  color: #4facfe;
  flex-shrink: 0;
}

.program-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: #fff;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 15px;
  transition: all 0.3s ease;
}

.program-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(79, 172, 254, 0.4);
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
  .programs-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .academics-programs {
    padding: 50px 0;
  }

  .section-title {
    font-size: 32px;
  }

  .programs-grid {
    grid-template-columns: 1fr;
  }
}
</style>
