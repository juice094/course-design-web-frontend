<template>
  <div class="news-tabs">
    <div class="section-header">
      <h3>新闻分类</h3>
    </div>
    <div class="tab-header">
      <span
          v-for="(tab, index) in tabs"
          :key="index"
          :class="{ active: activeTab === index }"
          @mouseenter="activeTab = index"
      >
        {{ tab.title }}
      </span>
    </div>
    <div class="tab-content">
      <ul v-show="activeTab === 0">
        <li v-for="(item, i) in techNews" :key="i">
          <a href="#">{{ item }}</a>
        </li>
      </ul>
      <ul v-show="activeTab === 1">
        <li v-for="(item, i) in quickNews" :key="i">
          <a href="#">{{ item }}</a>
        </li>
      </ul>
      <ul v-show="activeTab === 2">
        <li v-for="(item, i) in researchNews" :key="i">
          <a href="#">{{ item }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref(0)

const tabs = [
  { title: '技大新闻' },
  { title: '新闻速览' },
  { title: '教学科研' }
]

const techNews = [
  '2021年度Web技术大学十大新闻揭晓',
  '我校开展寒假前安全检查',
  '我校在"精品思政课"大赛中再创佳绩',
  '我校召开2021年学生工作考核集中汇报会',
  '我校举办2021年度教师教学创新大赛',
  '我校与八家企业签署校企合作协议',
  '我校教师在高校青年教师优质公共课教学竞赛中再创辉煌'
]

const quickNews = [
  'Web技术大学与国内外多所高校建立合作关系',
  '我校学生在全国大学生科技创新大赛中获奖',
  '新图书馆正式投入使用，藏书量突破百万册',
  '校园网络升级完成，实现全校区WiFi覆盖',
  '2022年春季学期教学工作安排发布'
]

const researchNews = [
  '我校科研团队在人工智能领域取得重大突破',
  'Web技术实验室获国家级重点实验室认定',
  '教授团队发表SCI论文20余篇',
  '校企合作项目取得阶段性成果',
  '研究生培养方案全面优化升级'
]
</script>

<style scoped>
.news-tabs {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  height: 100%;
}

.section-header {
  padding: 25px 20px 15px;
  border-bottom: 1px solid #eee;
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

.tab-header {
  display: flex;
  border-bottom: 2px solid #e63946;
  background: #f8f9fa;
}

.tab-header span {
  flex: 1;
  padding: 14px 20px;
  cursor: pointer;
  font-size: 15px;
  color: #666;
  font-weight: 500;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
}

.tab-header span::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background: #e63946;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.tab-header span.active {
  color: #e63946;
  background: #fff;
}

.tab-header span.active::after {
  transform: scaleX(1);
}

.tab-header span:hover {
  color: #e63946;
  background: rgba(230, 57, 70, 0.05);
}

.tab-content {
  padding: 20px;
  min-height: 350px;
}

.tab-content ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tab-content li {
  padding: 14px 0;
  border-bottom: 1px dashed #eee;
  font-size: 15px;
  transition: all 0.3s ease;
}

.tab-content li:last-child {
  border-bottom: none;
}

.tab-content li::before {
  content: '›';
  color: #e63946;
  margin-right: 8px;
  font-weight: bold;
}

.tab-content li:hover {
  padding-left: 5px;
}

.tab-content li a {
  color: #333;
  text-decoration: none;
  transition: all 0.3s ease;
}

.tab-content li a:hover {
  color: #e63946;
}
</style>
