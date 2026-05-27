<template>
  <div class="editor">
    <div v-for="article in articleStore.articles" :key="article.id" class="item">
      <div class="item-info">
        <span class="item-name">{{ article.title }}</span>
        <span class="item-detail">{{ categoryLabel(article.category) }} | {{ article.date }}</span>
      </div>
      <button class="item-del" @click="articleStore.removeArticle(article.id)">删除</button>
    </div>

    <div v-if="showForm" class="form">
      <input v-model="form.title" class="input" placeholder="标题">
      <select v-model="form.category" class="select">
        <option value="paper">论文</option>
        <option value="article">文章</option>
        <option value="tutorial">教程</option>
        <option value="note">笔记</option>
      </select>
      <input v-model="form.cover" class="input" placeholder="封面图 URL（可选）">
      <input v-model="tagInput" class="input" placeholder="标签，用逗号分隔">
      <textarea v-model="form.description" class="textarea" rows="2" placeholder="摘要描述"></textarea>
      <textarea v-model="form.content" class="textarea" rows="4" placeholder="正文内容（Markdown）"></textarea>
      <div class="form-actions">
        <button class="btn primary" @click="submit">添加</button>
        <button class="btn" @click="showForm = false">取消</button>
      </div>
    </div>
    <button v-else class="btn add" @click="openForm">+ 添加文章</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useArticleStore, type ArticleCategory } from '@/stores/articles'

const articleStore = useArticleStore()
const showForm = ref(false)
const tagInput = ref('')
const form = ref({
  title: '', category: 'article' as ArticleCategory,
  cover: '', tags: [] as string[],
  description: '', content: '',
  published: true, url: '',
})

function categoryLabel(cat: ArticleCategory): string {
  const map = { paper: '论文', article: '文章', tutorial: '教程', note: '笔记' }
  return map[cat]
}

function openForm() {
  showForm.value = true
  tagInput.value = ''
  form.value = { title: '', category: 'article', cover: '', tags: [], description: '', content: '', published: true, url: '' }
}

function submit() {
  if (!form.value.title) return
  const tags = tagInput.value.split(',').map(t => t.trim()).filter(Boolean)
  articleStore.addArticle({ ...form.value, tags: tags.length ? tags : ['未分类'] })
  showForm.value = false
}
</script>

<style scoped>
.editor { display: flex; flex-direction: column; gap: 0.5rem; }
.item { display: flex; align-items: center; justify-content: space-between; padding: 0.625rem; border-radius: 0.5rem; background: rgba(0,0,0,0.03); }
.item-info { display: flex; flex-direction: column; gap: 0.125rem; min-width: 0; }
.item-name { font-size: 0.875rem; font-weight: 700; color: #0f172a; }
.dark .item-name { color: #fff; }
.item-detail { font-size: 0.75rem; color: #94a3b8; }
.item-del { font-size: 0.75rem; padding: 0.25rem 0.5rem; border-radius: 0.375rem; border: none; background: rgba(239,68,68,0.1); color: #ef4444; cursor: pointer; }
.form { display: flex; flex-direction: column; gap: 0.5rem; padding: 0.75rem; border-radius: 0.75rem; background: rgba(0,0,0,0.03); }
.input, .select, .textarea {
  padding: 0.5rem; border-radius: 0.5rem; border: 1px solid rgba(0,0,0,0.1);
  background: rgba(255,255,255,0.6); font-size: 0.8125rem; outline: none; font-family: inherit;
}
.textarea { resize: vertical; }
.input:focus, .select:focus, .textarea:focus { border-color: #6366f1; }
.form-actions { display: flex; gap: 0.5rem; }
.btn { padding: 0.5rem 1rem; border-radius: 0.5rem; border: none; font-size: 0.8125rem; font-weight: 600; cursor: pointer; background: rgba(0,0,0,0.05); color: #64748b; }
.btn.primary { background: #6366f1; color: #fff; }
.btn.add { width: 100%; border: 1px dashed rgba(0,0,0,0.15); background: transparent; }
.btn.add:hover { border-color: #6366f1; color: #6366f1; }
</style>
