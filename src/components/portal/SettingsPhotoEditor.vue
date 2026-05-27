<template>
  <div class="editor">
    <div v-for="photo in photoStore.photos" :key="photo.id" class="item">
      <img :src="photo.url" class="thumb">
      <div class="item-info">
        <span class="item-name">{{ photo.title }}</span>
        <span class="item-detail">{{ categoryLabel(photo.category) }} | {{ photo.date }}</span>
      </div>
      <button class="item-del" @click="photoStore.removePhoto(photo.id)">删除</button>
    </div>

    <div v-if="showForm" class="form">
      <input v-model="form.title" class="input" placeholder="照片标题">
      <input v-model="form.url" class="input" placeholder="图片 URL">
      <select v-model="form.category" class="select">
        <option value="campus">校园</option>
        <option value="project">项目</option>
        <option value="life">生活</option>
        <option value="certificate">证书</option>
      </select>
      <input v-model="form.description" class="input" placeholder="描述（可选）">
      <div class="form-actions">
        <button class="btn primary" @click="submit">添加</button>
        <button class="btn" @click="showForm = false">取消</button>
      </div>
    </div>
    <button v-else class="btn add" @click="openForm">+ 添加照片</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePhotoStore, type PhotoCategory } from '@/stores/photos'

const photoStore = usePhotoStore()
const showForm = ref(false)
const form = ref({
  title: '', url: '', category: 'life' as PhotoCategory, description: '',
})

function categoryLabel(cat: PhotoCategory): string {
  const map = { campus: '校园', project: '项目', life: '生活', certificate: '证书' }
  return map[cat]
}

function openForm() {
  showForm.value = true
  form.value = { title: '', url: '', category: 'life', description: '' }
}

function submit() {
  if (!form.value.title || !form.value.url) return
  photoStore.addPhoto({ ...form.value })
  showForm.value = false
}
</script>

<style scoped>
.editor { display: flex; flex-direction: column; gap: 0.5rem; }
.item { display: flex; align-items: center; gap: 0.625rem; padding: 0.625rem; border-radius: 0.5rem; background: rgba(0,0,0,0.03); }
.thumb { width: 48px; height: 48px; border-radius: 0.375rem; object-fit: cover; flex-shrink: 0; }
.item-info { flex: 1; display: flex; flex-direction: column; gap: 0.125rem; min-width: 0; }
.item-name { font-size: 0.875rem; font-weight: 700; color: #0f172a; }
.dark .item-name { color: #fff; }
.item-detail { font-size: 0.75rem; color: #94a3b8; }
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
