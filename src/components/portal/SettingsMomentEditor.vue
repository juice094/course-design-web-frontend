<template>
  <div class="editor">
    <div v-for="moment in momentStore.moments" :key="moment.id" class="item">
      <div class="item-info">
        <span class="item-name">{{ moment.content.slice(0, 40) }}{{ moment.content.length > 40 ? '...' : '' }}</span>
        <span class="item-detail">{{ moment.mood || '无心情' }} | {{ new Date(moment.date).toLocaleDateString() }}</span>
      </div>
      <button class="item-del" @click="momentStore.removeMoment(moment.id)">删除</button>
    </div>

    <div v-if="showForm" class="form">
      <textarea v-model="form.content" class="textarea" rows="3" placeholder="分享你的想法..."></textarea>
      <input v-model="imageInput" class="input" placeholder="图片 URLs，用逗号分隔（可选）">
      <input v-model="form.mood" class="input" placeholder="心情（可选）">
      <input v-model="tagInput" class="input" placeholder="标签，用逗号分隔（可选）">
      <div class="form-actions">
        <button class="btn primary" @click="submit">发布</button>
        <button class="btn" @click="showForm = false">取消</button>
      </div>
    </div>
    <button v-else class="btn add" @click="openForm">+ 发布动态</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMomentStore } from '@/stores/moments'

const momentStore = useMomentStore()
const showForm = ref(false)
const imageInput = ref('')
const tagInput = ref('')
const form = ref({ content: '', mood: '' })

function openForm() {
  showForm.value = true
  imageInput.value = ''
  tagInput.value = ''
  form.value = { content: '', mood: '' }
}

function submit() {
  if (!form.value.content.trim()) return
  const images = imageInput.value.split(',').map(s => s.trim()).filter(Boolean)
  const tags = tagInput.value.split(',').map(s => s.trim()).filter(Boolean)
  momentStore.addMoment({
    content: form.value.content,
    mood: form.value.mood || undefined,
    images: images.length ? images : undefined,
    tags: tags.length ? tags : undefined,
  })
  showForm.value = false
}
</script>

<style scoped>
.editor { display: flex; flex-direction: column; gap: 0.5rem; }
.item { display: flex; align-items: center; justify-content: space-between; padding: 0.625rem; border-radius: 0.5rem; background: rgba(0,0,0,0.03); }
.item-info { display: flex; flex-direction: column; gap: 0.125rem; min-width: 0; flex: 1; }
.item-name { font-size: 0.875rem; color: #0f172a; }
.dark .item-name { color: #e2e8f0; }
.item-detail { font-size: 0.75rem; color: #94a3b8; }
.item-del { font-size: 0.75rem; padding: 0.25rem 0.5rem; border-radius: 0.375rem; border: none; background: rgba(239,68,68,0.1); color: #ef4444; cursor: pointer; }
.form { display: flex; flex-direction: column; gap: 0.5rem; padding: 0.75rem; border-radius: 0.75rem; background: rgba(0,0,0,0.03); }
.input, .textarea {
  padding: 0.5rem; border-radius: 0.5rem; border: 1px solid rgba(0,0,0,0.1);
  background: rgba(255,255,255,0.6); font-size: 0.8125rem; outline: none; font-family: inherit;
}
.textarea { resize: vertical; }
.input:focus, .textarea:focus { border-color: #6366f1; }
.form-actions { display: flex; gap: 0.5rem; }
.btn { padding: 0.5rem 1rem; border-radius: 0.5rem; border: none; font-size: 0.8125rem; font-weight: 600; cursor: pointer; background: rgba(0,0,0,0.05); color: #64748b; }
.btn.primary { background: #6366f1; color: #fff; }
.btn.add { width: 100%; border: 1px dashed rgba(0,0,0,0.15); background: transparent; }
.btn.add:hover { border-color: #6366f1; color: #6366f1; }
</style>
