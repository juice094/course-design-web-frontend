<template>
  <div class="schedule-section">
    <!-- 可见性占位：未授权 -->
    <div v-if="!canView" class="placeholder">
      <svg class="placeholder-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
      <p class="placeholder-text">
        {{ scheduleStore.visibility === 'private' ? '该内容仅作者可见' : '该内容仅指定用户可见' }}
      </p>
    </div>

    <template v-else>
      <div class="schedule-header">
        <div class="semester-info">
          <svg class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span class="semester-text">{{ scheduleStore.semester }}</span>
        </div>
        <div class="legend">
          <span v-for="c in uniqueColors" :key="c" class="legend-item">
            <span class="legend-dot" :style="{ background: c }" />
          </span>
        </div>
      </div>

      <div class="schedule-grid">
        <!-- 表头 -->
        <div class="grid-header">
          <div class="time-col">节次</div>
          <div v-for="day in weekDays" :key="day.value" class="day-col" :class="{ today: day.value === today }">
            {{ day.label }}
          </div>
        </div>

        <!-- 课程网格 -->
        <div class="grid-body">
          <div v-for="slot in maxSlots" :key="slot" class="grid-row">
            <div class="time-col">{{ slot }}</div>
            <div
              v-for="day in weekDays"
              :key="day.value"
              class="slot-cell"
              :class="{ today: day.value === today }"
            >
              <div
                v-for="course in getCourses(day.value, slot)"
                :key="course.id"
                class="course-block"
                :style="{ background: course.color + '26', borderColor: course.color, color: course.color }"
                :title="`${course.name} @ ${course.location} (${course.teacher})`"
              >
                <span class="course-name">{{ course.name }}</span>
                <span class="course-room">{{ course.location }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useScheduleStore } from '@/stores/schedule'
import { useUserStore } from '@/stores/user'

const scheduleStore = useScheduleStore()
const userStore = useUserStore()
const maxSlots = computed(() => scheduleStore.maxSlots)

const canView = computed(() => {
  const vis = scheduleStore.visibility
  if (vis === 'public') return true
  if (!userStore.isLoggedIn) return false
  if (vis === 'private') return true
  // whitelist
  const userId = userStore.userInfo?.id?.toString()
  return userId ? scheduleStore.whitelist.includes(userId) : false
})

const weekDays = [
  { value: 1 as const, label: '周一' },
  { value: 2 as const, label: '周二' },
  { value: 3 as const, label: '周三' },
  { value: 4 as const, label: '周四' },
  { value: 5 as const, label: '周五' },
  { value: 6 as const, label: '周六' },
  { value: 7 as const, label: '周日' },
]

const today = new Date().getDay() || 7

const uniqueColors = computed(() => {
  const colors = new Set(scheduleStore.courses.map(c => c.color))
  return Array.from(colors)
})

function getCourses(day: number, slot: number) {
  return scheduleStore.courses.filter(
    c => c.day === day && c.startSlot <= slot && c.endSlot >= slot,
  )
}
</script>

<style scoped>
.schedule-section {
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  padding: 1.25rem;
  overflow: auto;
  transition: all 0.5s;
}

.dark .schedule-section {
  background: rgba(30, 41, 59, 0.5);
  border-color: rgba(255, 255, 255, 0.1);
}

.schedule-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.semester-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #0f172a;
  transition: color 1s;
}

.dark .semester-info { color: #fff; }

.icon { width: 1rem; height: 1rem; }

.legend {
  display: flex;
  gap: 0.375rem;
}

.legend-dot {
  width: 0.625rem;
  height: 0.625rem;
  border-radius: 50%;
  display: inline-block;
}

.schedule-grid {
  min-width: 640px;
}

.grid-header {
  display: grid;
  grid-template-columns: 2.5rem repeat(7, 1fr);
  gap: 0.25rem;
  margin-bottom: 0.25rem;
}

.time-col {
  font-size: 0.6875rem;
  color: #64748b;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 1s;
}

.dark .time-col { color: #94a3b8; }

.day-col {
  font-size: 0.75rem;
  font-weight: 700;
  color: #0f172a;
  text-align: center;
  padding: 0.375rem 0;
  border-radius: 0.5rem;
  transition: color 1s, background 1s;
}

.dark .day-col { color: #fff; }

.day-col.today {
  background: rgba(99, 102, 241, 0.15);
  color: #6366f1;
}

.dark .day-col.today {
  background: rgba(99, 102, 241, 0.25);
  color: #818cf8;
}

.grid-body {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.grid-row {
  display: grid;
  grid-template-columns: 2.5rem repeat(7, 1fr);
  gap: 0.25rem;
  min-height: 3.5rem;
}

.slot-cell {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  padding: 0.125rem;
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  transition: background 1s;
}

.dark .slot-cell { background: rgba(51, 65, 85, 0.3); }

.slot-cell.today {
  background: rgba(99, 102, 241, 0.08);
}

.dark .slot-cell.today {
  background: rgba(99, 102, 241, 0.12);
}

.course-block {
  border-radius: 0.375rem;
  border: 1px solid;
  padding: 0.25rem 0.375rem;
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  font-size: 0.6875rem;
  line-height: 1.2;
  cursor: default;
  transition: transform 0.2s;
}

.course-block:hover {
  transform: scale(1.02);
}

.course-name {
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.course-room {
  font-size: 0.625rem;
  opacity: 0.8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 3rem 1.5rem;
  text-align: center;
}

.placeholder-icon {
  width: 2.5rem;
  height: 2.5rem;
  color: #94a3b8;
  transition: color 1s;
}

.dark .placeholder-icon {
  color: #64748b;
}

.placeholder-text {
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;
  margin: 0;
  transition: color 1s;
}

.dark .placeholder-text {
  color: #94a3b8;
}
</style>
