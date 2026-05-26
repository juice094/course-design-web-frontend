<template>
  <div class="ql-section">
    <div class="ql-grid">
      <router-link
        v-for="link in links"
        :key="link.name"
        :to="link.path"
        class="ql-card"
      >
        <div
          class="ql-icon"
          :class="link.color"
        >
          <svg
            class="ql-svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              :d="link.icon"
            />
          </svg>
        </div>
        <div class="ql-info">
          <h4 class="ql-name">
            {{ link.name }}
          </h4>
          <p class="ql-desc">
            {{ link.desc }}
          </p>
        </div>
        <svg
          class="ql-arrow"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
const links = [
  {
    name: '学生选课',
    desc: '浏览可选课程，一键选课退课',
    path: '/course-select',
    color: 'blue',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  },
  {
    name: '成绩查询',
    desc: '查看各科成绩与 GPA 统计',
    path: '/score',
    color: 'emerald',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  },
  {
    name: '课表查询',
    desc: '查看个人课程安排与教室',
    path: '/schedule',
    color: 'amber',
    icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  },
  {
    name: '办事大厅',
    desc: '常用教务服务一站式入口',
    path: '/',
    color: 'rose',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  },
]
</script>

<style scoped>
.ql-section { width: 100%; }

.ql-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

@media (min-width: 768px) {
  .ql-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }
}

.ql-card {
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  transition: all 0.5s;
}

.dark .ql-card {
  background: rgba(30, 41, 59, 0.5);
  border-color: rgba(255, 255, 255, 0.1);
}

.ql-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15);
}

.ql-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.blue { background: rgba(59, 130, 246, 0.2); color: #2563eb; }
.dark .blue { color: #60a5fa; }

.emerald { background: rgba(16, 185, 129, 0.2); color: #059669; }
.dark .emerald { color: #34d399; }

.amber { background: rgba(245, 158, 11, 0.2); color: #d97706; }
.dark .amber { color: #fbbf24; }

.rose { background: rgba(244, 63, 94, 0.2); color: #e11d48; }
.dark .rose { color: #fb7185; }

.ql-svg { width: 1.25rem; height: 1.25rem; }

.ql-info { flex: 1; min-width: 0; }

.ql-name {
  font-size: 0.875rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
  transition: color 1s;
}

.dark .ql-name { color: #fff; }

.ql-desc {
  font-size: 0.6875rem;
  color: #64748b;
  margin: 0.125rem 0 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 1s;
}

.dark .ql-desc { color: #94a3b8; }

.ql-arrow {
  width: 1rem;
  height: 1rem;
  color: #94a3b8;
  transition: all 0.3s;
  flex-shrink: 0;
}

.ql-card:hover .ql-arrow {
  color: #6366f1;
  transform: translateX(2px);
}
</style>
