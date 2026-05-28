<template>
  <div class="about-team">
    <div class="team-container">
      <div class="section-header">
        <h2 class="section-title">领导团队</h2>
        <div class="title-underline"></div>
        <p class="section-desc">经验丰富的管理团队引领学校发展</p>
      </div>

      <div class="team-grid">
        <div class="team-card" v-for="(member, index) in teamMembers" :key="index">
          <div class="member-avatar">
            <img :src="member.avatar" :alt="member.name">
          </div>
          <div class="member-info">
            <h3 class="member-name">{{ member.name }}</h3>
            <p class="member-position">{{ member.position }}</p>
            <p class="member-desc">{{ member.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const teamMembers = ref([
  {
    name: '张明华',
    position: '校长',
    avatar: '/images/team_leader_1.jpg',
    description: '计算机科学博士，从事高等教育管理20余年，致力于推动信息技术教育创新。'
  },
  {
    name: '李芳',
    position: '副校长',
    avatar: '/images/team_leader_2.jpg',
    description: '教育学教授，专注于课程体系改革和教学质量提升，推动国际化办学。'
  },
  {
    name: '王建国',
    position: '教务处长',
    avatar: '/images/team_leader_3.jpg',
    description: '软件工程专家，负责教学管理和课程体系建设，推动产学研结合。'
  },
  {
    name: '陈静',
    position: '学生处长',
    avatar: '/images/team_leader_4.jpg',
    description: '心理学博士，关注学生全面发展，构建完善的 student 服务体系。'
  }
])
</script>

<style scoped>
.about-team {
  padding: 80px 0;
  background: #fff;
}

.team-container {
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  margin: 0 auto 15px;
  border-radius: 2px;
}

.section-desc {
  font-size: 18px;
  color: #666;
  font-weight: 300;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

.team-card {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease;
  animation: fadeInUp 0.8s ease both;
}

.team-card:nth-child(1) { animation-delay: 0.1s; }
.team-card:nth-child(2) { animation-delay: 0.2s; }
.team-card:nth-child(3) { animation-delay: 0.3s; }
.team-card:nth-child(4) { animation-delay: 0.4s; }

.team-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}

.member-avatar {
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.member-avatar img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid rgba(255, 255, 255, 0.3);
}

.member-info {
  padding: 25px 20px;
  text-align: center;
}

.member-name {
  font-size: 22px;
  color: #1a1a2e;
  margin-bottom: 8px;
  font-weight: 600;
}

.member-position {
  font-size: 15px;
  color: #667eea;
  margin-bottom: 12px;
  font-weight: 500;
}

.member-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  text-align: left;
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
  .team-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .about-team {
    padding: 50px 0;
  }

  .section-title {
    font-size: 32px;
  }

  .team-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>
