<template>
  <div class="editor">
    <!-- 可见性配置 -->
    <div class="visibility-config">
      <label class="field-label">可见性</label>
      <div class="btn-group">
        <button
          v-for="v in visibilityOptions"
          :key="v.value"
          class="btn-group-item"
          :class="{ active: scheduleStore.visibility === v.value }"
          @click="scheduleStore.setVisibility(v.value)"
        >
          {{ v.label }}
        </button>
      </div>

      <!-- 白名单管理 -->
      <div v-if="scheduleStore.visibility === 'whitelist'" class="whitelist-section">
        <div class="whitelist-list">
          <div v-for="id in scheduleStore.whitelist" :key="id" class="whitelist-item">
            <span>{{ id }}</span>
            <button class="item-del" @click="scheduleStore.removeFromWhitelist(id)">删除</button>
          </div>
        </div>
        <div class="whitelist-add">
          <input v-model="newWhitelistId" class="input" placeholder="用户 ID">
          <button class="btn primary" @click="addWhitelist">添加</button>
        </div>
      </div>
    </div>

    <!-- 课程列表 -->
    <div v-for="course in scheduleStore.courses" :key="course.id" class="item">
      <div class="item-info">
        <span class="item-name" :style="{ color: course.color }">{{ course.name }}</span>
        <span class="item-detail">{{ weekDayLabel(course.day) }} 第{{ course.startSlot }}-{{ course.endSlot }}节 | {{ course.teacher }} | {{ course.location }} | {{ course.weekPattern }}</span>
      </div>
      <button class="item-del" @click="scheduleStore.removeCourse(course.id)">删除</button>
    </div>

    <!-- 添加表单 -->
    <div v-if="showForm" class="form">
      <input v-model="form.name" class="input" placeholder="课程名称">
      <input v-model="form.teacher" class="input" placeholder="教师">
      <input v-model="form.location" class="input" placeholder="教室">
      <div class="row">
        <select v-model="form.day" class="select">
          <option v-for="d in weekDays" :key="d.value" :value="d.value">{{ d.label }}</option>
        </select>
        <select v-model="form.startSlot" class="select">
          <option v-for="n in 12" :key="n" :value="n">第{{ n }}节开始</option>
        </select>
        <select v-model="form.endSlot" class="select">
          <option v-for="n in 12" :key="n" :value="n">第{{ n }}节结束</option>
        </select>
      </div>
      <select v-model="form.weekPattern" class="select">
        <option value="全周">全周</option>
        <option value="单周">单周</option>
        <option value="双周">双周</option>
      </select>
      <div class="form-actions">
        <button class="btn primary" @click="submit">添加</button>
        <button class="btn" @click="showForm = false">取消</button>
      </div>
    </div>
    <button v-else class="btn add" @click="openForm">+ 添加课程</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useScheduleStore } from '@/stores/schedule'

const scheduleStore = useScheduleStore()
const showForm = ref(false)
const form = ref({
  name: '', teacher: '', location: '',
  day: 1 as 1|2|3|4|5|6|7,
  startSlot: 1, endSlot: 2,
  weekPattern: '全周',
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

const visibilityOptions = [
  { value: 'public' as const, label: '公开' },
  { value: 'private' as const, label: '私密' },
  { value: 'whitelist' as const, label: '白名单' },
]

const newWhitelistId = ref('')

function weekDayLabel(day: number): string {
  return weekDays.find(d => d.value === day)?.label || ''
}

function addWhitelist() {
  const id = newWhitelistId.value.trim()
  if (!id) return
  scheduleStore.addToWhitelist(id)
  newWhitelistId.value = ''
}

function openForm() {
  showForm.value = true
  form.value = { name: '', teacher: '', location: '', day: 1, startSlot: 1, endSlot: 2, weekPattern: '全周' }
}

function submit() {
  if (!form.value.name) return
  if (form.value.endSlot < form.value.startSlot) {
    form.value.endSlot = form.value.startSlot
  }
  scheduleStore.addCourse({ ...form.value })
  showForm.value = false
}
</script>

<style scoped>
.editor { display: flex; flex-direction: column; gap: 0.5rem; }
.item {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0.625rem; border-radius: 0.5rem;
  background: rgba(0,0,0,0.03);
}
.item-info { display: flex; flex-direction: column; gap: 0.125rem; min-width: 0; }
.item-name { font-size: 0.875rem; font-weight: 700; }
.item-detail { font-size: 0.75rem; color: #94a3b8; }
.item-del {
  font-size: 0.75rem; padding: 0.25rem 0.5rem; border-radius: 0.375rem;
  border: none; background: rgba(239,68,68,0.1); color: #ef4444;
  cursor: pointer;
}
.form { display: flex; flex-direction: column; gap: 0.5rem; padding: 0.75rem; border-radius: 0.75rem; background: rgba(0,0,0,0.03); }
.row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.5rem; }
.input, .select {
  padding: 0.5rem; border-radius: 0.5rem; border: 1px solid rgba(0,0,0,0.1);
  background: rgba(255,255,255,0.6); font-size: 0.8125rem; outline: none;
}
.input:focus, .select:focus { border-color: #6366f1; }
.form-actions { display: flex; gap: 0.5rem; }
.btn {
  padding: 0.5rem 1rem; border-radius: 0.5rem; border: none;
  font-size: 0.8125rem; font-weight: 600; cursor: pointer;
  background: rgba(0,0,0,0.05); color: #64748b;
}
.btn.primary { background: #6366f1; color: #fff; }
.btn.add { width: 100%; border: 1px dashed rgba(0,0,0,0.15); background: transparent; }
.btn.add:hover { border-color: #6366f1; color: #6366f1; }

.visibility-config { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 0.5rem; }
.field-label { font-size: 0.8125rem; font-weight: 600; color: #0f172a; transition: color 1s; }
.dark .field-label { color: #fff; }

.btn-group { display: flex; gap: 0.25rem; }
.btn-group-item {
  padding: 0.375rem 0.75rem; border-radius: 0.5rem; border: 1px solid rgba(0,0,0,0.1);
  background: rgba(255,255,255,0.5); font-size: 0.8125rem; font-weight: 600;
  color: #475569; cursor: pointer; transition: all 0.3s;
}
.dark .btn-group-item { background: rgba(51,65,85,0.5); border-color: rgba(255,255,255,0.1); color: #94a3b8; }
.btn-group-item:hover { border-color: #6366f1; color: #6366f1; }
.btn-group-item.active { background: #6366f1; color: #fff; border-color: #6366f1; }
.dark .btn-group-item.active { background: #4f46e5; border-color: #4f46e5; }

.whitelist-section { display: flex; flex-direction: column; gap: 0.5rem; padding: 0.75rem; border-radius: 0.75rem; background: rgba(0,0,0,0.03); }
.dark .whitelist-section { background: rgba(255,255,255,0.03); }
.whitelist-list { display: flex; flex-direction: column; gap: 0.375rem; }
.whitelist-item {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0.375rem 0.625rem; border-radius: 0.5rem;
  background: rgba(255,255,255,0.5); font-size: 0.8125rem; color: #0f172a;
}
.dark .whitelist-item { background: rgba(51,65,85,0.4); color: #e2e8f0; }
.whitelist-add { display: flex; gap: 0.5rem; }
</style>
