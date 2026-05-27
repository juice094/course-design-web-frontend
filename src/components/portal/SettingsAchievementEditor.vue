<template>
  <div class="editor">
    <div v-for="item in achievementStore.achievements" :key="item.id" class="item">
      <div class="item-info">
        <span class="item-name">{{ item.title }}</span>
        <span class="item-detail">
          <span class="level-badge" :style="{ background: achievementStore.levelColors[item.level] + '20', color: achievementStore.levelColors[item.level] }">
            {{ achievementStore.levelLabels[item.level] }}
          </span>
          {{ item.date }}
        </span>
      </div>
      <button class="item-del" @click="achievementStore.removeAchievement(item.id)">删除</button>
    </div>

    <div v-if="showForm" class="form">
      <input v-model="form.title" class="input" placeholder="奖项名称">
      <select v-model="form.level" class="select">
        <option value="national">国家级</option>
        <option value="provincial">省级</option>
        <option value="school">校级</option>
        <option value="other">其他</option>
      </select>
      <input v-model="form.date" class="input" type="date" placeholder="获奖日期">
      <input v-model="form.description" class="input" placeholder="描述（可选）">
      <input v-model="form.certificateUrl" class="input" placeholder="证书链接（可选）">
      <div class="form-actions">
        <button class="btn primary" @click="submit">添加</button>
        <button class="btn" @click="showForm = false">取消</button>
      </div>
    </div>
    <button v-else class="btn add" @click="openForm">+ 添加成就</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAchievementStore, type AchievementLevel } from '@/stores/achievements'

const achievementStore = useAchievementStore()
const showForm = ref(false)
const form = ref({
  title: '', level: 'school' as AchievementLevel,
  date: new Date().toISOString().split('T')[0],
  description: '', certificateUrl: '',
})

function openForm() {
  showForm.value = true
  form.value = { title: '', level: 'school', date: new Date().toISOString().split('T')[0], description: '', certificateUrl: '' }
}

function submit() {
  if (!form.value.title) return
  achievementStore.addAchievement({ ...form.value })
  showForm.value = false
}
</script>

<style scoped>
.editor { display: flex; flex-direction: column; gap: 0.5rem; }
.item { display: flex; align-items: center; justify-content: space-between; padding: 0.625rem; border-radius: 0.5rem; background: rgba(0,0,0,0.03); }
.item-info { display: flex; flex-direction: column; gap: 0.25rem; min-width: 0; flex: 1; }
.item-name { font-size: 0.875rem; font-weight: 700; color: #0f172a; }
.dark .item-name { color: #fff; }
.item-detail { font-size: 0.75rem; color: #94a3b8; display: flex; align-items: center; gap: 0.5rem; }
.level-badge { font-size: 0.6875rem; font-weight: 700; padding: 0.125rem 0.5rem; border-radius: 0.25rem; }
.item-del { font-size: 0.75rem; padding: 0.25rem 0.5rem; border-radius: 0.375rem; border: none; background: rgba(239,68,68,0.1); color: #ef4444; cursor: pointer; }
.form { display: flex; flex-direction: column; gap: 0.5rem; padding: 0.75rem; border-radius: 0.75rem; background: rgba(0,0,0,0.03); }
.input, .select { padding: 0.5rem; border-radius: 0.5rem; border: 1px solid rgba(0,0,0,0.1); background: rgba(255,255,255,0.6); font-size: 0.8125rem; outline: none; }
.input:focus, .select:focus { border-color: #6366f1; }
.form-actions { display: flex; gap: 0.5rem; }
.btn { padding: 0.5rem 1rem; border-radius: 0.5rem; border: none; font-size: 0.8125rem; font-weight: 600; cursor: pointer; background: rgba(0,0,0,0.05); color: #64748b; }
.btn.primary { background: #6366f1; color: #fff; }
.btn.add { width: 100%; border: 1px dashed rgba(0,0,0,0.15); background: transparent; }
.btn.add:hover { border-color: #6366f1; color: #6366f1; }
</style>
