<template>
  <div class="university-intro">
    <div class="intro-container">
      <div class="intro-logo">
        <img src="/images/logo.jpg" alt="Web技术大学">
      </div>
      <div class="intro-content">
        <h2>Web技术大学</h2>
        <h3>全球化视野，卓越教育</h3>
        <div class="intro-summary">
          <p>Web技术大学是一所专注于Web技术和计算机科学领域的高等学府。我们秉承"求真务实、创新进取"的办学理念，致力于培养具有国际视野和创新能力的优秀人才。</p>
          <p>学校拥有先进的教学设施、雄厚的师资力量和完善的科研平台，为学生提供了广阔的发展空间和优质的教育资源。</p>
        </div>
        <button class="intro-btn" @click="toggleDetail">
          {{ showDetail ? '收起' : '了解更多' }}
        </button>
        <transition name="expand">
          <div v-show="showDetail" class="intro-detail">
            <div class="detail-section">
              <h4>办学历史</h4>
              <p>Web技术大学创建于2005年，是一所以Web技术和信息技术为特色的高等学府。经过近20年的发展，学校已成长为国内信息技术教育领域的领军者，为国家培养了数万名优秀的IT人才。</p>
            </div>
            <div class="detail-section">
              <h4>学科优势</h4>
              <p>学校现设有10个本科专业和8个硕士专业，涵盖Web开发、软件工程、人工智能、网络安全、大数据分析、云计算等多个前沿领域。其中，Web技术与计算机科学专业被评为国家级一流本科专业。</p>
            </div>
            <div class="detail-section">
              <h4>师资力量</h4>
              <p>学校拥有专任教师800余人，其中教授120人，副教授260人，具有博士学位的教师占比超过70%。多位教师入选国家级人才计划，并在国内外重要学术期刊上发表高水平论文。</p>
            </div>
            <div class="detail-section">
              <h4>科研平台</h4>
              <p>学校建有国家级重点实验室2个、省部级重点实验室5个、校企合作联合实验室12个。每年承担国家级科研项目50余项，科研经费超过1亿元，多项研究成果获得国家科技进步奖。</p>
            </div>
            <div class="detail-section">
              <h4>国际合作</h4>
              <p>学校与美国、英国、德国、澳大利亚等20多个国家和地区的60余所高校建立了合作关系，开展学生交换、联合培养、学术研究等多项合作项目，为学生提供丰富的国际化学习机会。</p>
            </div>
            <div class="detail-section">
              <h4>校园文化</h4>
              <p>学校注重学生综合素质培养，设有100余个学生社团，每年举办科技创新大赛、编程马拉松、Web设计大赛等丰富多彩的学术活动和文体活动，营造了浓厚的创新创业氛围。</p>
            </div>
            <div class="detail-section">
              <h4>就业前景</h4>
              <p>毕业生就业率连续15年保持在98%以上，毕业生主要就职于华为、腾讯、阿里巴巴、百度、字节跳动等知名IT企业，平均起薪位居全国高校前列，深受用人单位好评。</p>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showDetail = ref(false)

const toggleDetail = () => {
  showDetail.value = !showDetail.value
}
</script>

<style scoped>
.university-intro {
  background: #fff;
  padding: 40px 0;
  border-top: 1px solid #eee;
}

.intro-container {
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 60px;
  display: flex;
  align-items: center;
  gap: 50px;
}

.intro-logo {
  flex-shrink: 0;
}

.intro-logo img {
  width: 150px;
  height: auto;
}

.intro-content {
  flex: 1;
}

.intro-summary {
  margin-bottom: 15px;
}

.intro-content h2 {
  font-size: 28px;
  color: #333;
  margin-bottom: 8px;
  font-weight: 700;
}

.intro-content h3 {
  font-size: 16px;
  color: #e63946;
  margin-bottom: 12px;
  font-weight: 500;
}

.intro-content p {
  font-size: 14px;
  color: #666;
  line-height: 1.8;
  margin-bottom: 8px;
}

.intro-btn {
  display: inline-block;
  padding: 10px 24px;
  background: #0047ab;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.intro-btn:hover {
  background: #003d91;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 71, 171, 0.4);
}

.intro-detail {
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid #eee;
}

.detail-section {
  margin-bottom: 25px;
}

.detail-section:last-child {
  margin-bottom: 0;
}

.detail-section h4 {
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
  font-weight: 600;
  position: relative;
  padding-left: 12px;
}

.detail-section h4::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 18px;
  background: #e63946;
  border-radius: 2px;
}

.detail-section p {
  font-size: 14px;
  color: #666;
  line-height: 1.8;
  margin-bottom: 0;
  text-align: justify;
}

/* 展开动画 */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.4s ease;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
  overflow: hidden;
}

.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  max-height: 2000px;
}
</style>
