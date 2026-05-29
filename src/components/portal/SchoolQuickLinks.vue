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
          <component
            :is="link.icon"
            class="ql-svg"
            :size="20"
          />
        </div>
        <div class="ql-info">
          <h4 class="ql-name">
            {{ link.name }}
          </h4>
          <p class="ql-desc">
            {{ link.desc }}
          </p>
        </div>
        <ChevronRight class="ql-arrow" :size="16" />
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BookOpen, BarChart3, CalendarDays, Building2, ChevronRight } from 'lucide-vue-next'

const links = [
  {
    name: '选课规划',
    desc: '浏览可选课程，一键选课退课',
    path: '/panel/enrollment',
    color: 'blue',
    icon: BookOpen,
  },
  {
    name: '成绩分析',
    desc: '查看各科成绩与 GPA 统计',
    path: '/panel/grades',
    color: 'emerald',
    icon: BarChart3,
  },
  {
    name: '课表编排',
    desc: '查看个人课程安排与教室',
    path: '/panel/timetable',
    color: 'amber',
    icon: CalendarDays,
  },
  {
    name: '教务入口',
    desc: '常用教务服务一站式入口',
    path: '/',
    color: 'rose',
    icon: Building2,
  },
]
</script>

<style scoped>
.ql-section { width: 100%; }

.ql-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.75rem;
}

@media (min-width: 768px) {
  .ql-grid {
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
