<template>
  <div class="articles-section">
    <!-- 分类标签 -->
    <div class="category-tabs">
      <button
        v-for="cat in categories"
        :key="cat.value"
        class="tab-btn"
        :class="{ active: articleStore.activeCategory === cat.value }"
        @click="articleStore.setCategory(cat.value)"
      >
        {{ cat.label }}
      </button>
    </div>

    <!-- 文章网格 -->
    <div class="articles-grid">
      <div
        v-for="article in articleStore.publishedArticles"
        :key="article.id"
        class="article-card"
        @click="openArticle(article)"
      >
        <div class="article-cover-wrap">
          <img
            v-if="article.cover"
            :src="article.cover"
            :alt="article.title"
            class="article-cover"
            loading="lazy"
          >
          <div v-else class="article-cover-placeholder">
            <FileText class="placeholder-icon" :size="32" />
          </div>
          <span class="article-date">{{ article.date }}</span>
        </div>
        <div class="article-body">
          <h4 class="article-title">{{ article.title }}</h4>
          <p class="article-desc">{{ article.description }}</p>
          <div class="article-tags">
            <span v-for="tag in article.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 文章详情弹窗 -->
    <teleport to="body">
      <transition name="fade">
        <div v-if="selectedArticle" class="article-modal-overlay" @click.self="closeArticle">
          <div class="article-modal">
            <button class="modal-close" @click="closeArticle">&times;</button>
            <img v-if="selectedArticle.cover" :src="selectedArticle.cover" class="modal-cover">
            <div class="modal-body">
              <div class="modal-meta">
                <span class="modal-category">{{ categoryLabel(selectedArticle.category) }}</span>
                <span class="modal-date">{{ selectedArticle.date }}</span>
              </div>
              <h2 class="modal-title">{{ selectedArticle.title }}</h2>
              <div class="modal-tags">
                <span v-for="tag in selectedArticle.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
              <div class="modal-content">
                <pre>{{ selectedArticle.content }}</pre>
              </div>
              <a v-if="selectedArticle.url" :href="selectedArticle.url" target="_blank" rel="noopener" class="modal-link">
                查看原文 &rarr;
              </a>
            </div>
          </div>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FileText } from 'lucide-vue-next'
import { useArticleStore, type Article, type ArticleCategory } from '@/stores/articles'

const articleStore = useArticleStore()
const selectedArticle = ref<Article | null>(null)

const categories = [
  { value: 'all' as const, label: '全部' },
  { value: 'paper' as ArticleCategory, label: '论文' },
  { value: 'article' as ArticleCategory, label: '文章' },
  { value: 'tutorial' as ArticleCategory, label: '教程' },
  { value: 'note' as ArticleCategory, label: '笔记' },
]

function categoryLabel(cat: ArticleCategory): string {
  const map: Record<ArticleCategory, string> = {
    paper: '论文',
    article: '文章',
    tutorial: '教程',
    note: '笔记',
  }
  return map[cat]
}

function openArticle(article: Article) {
  selectedArticle.value = article
}

function closeArticle() {
  selectedArticle.value = null
}
</script>

<style scoped>
.articles-section { width: 100%; }

.category-tabs {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.tab-btn {
  padding: 0.375rem 0.875rem;
  border-radius: 9999px;
  font-size: 0.8125rem;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #475569;
  cursor: pointer;
  transition: all 0.3s;
}

.dark .tab-btn {
  background: rgba(51, 65, 85, 0.4);
  border-color: rgba(255, 255, 255, 0.1);
  color: #cbd5e1;
}

.tab-btn:hover {
  background: rgba(99, 102, 241, 0.15);
  color: #6366f1;
}

.tab-btn.active {
  background: #6366f1;
  color: #fff;
  border-color: #6366f1;
}

.dark .tab-btn.active {
  background: #4f46e5;
  border-color: #4f46e5;
}

.articles-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 768px) {
  .articles-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.article-card {
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.5s;
}

.dark .article-card {
  background: rgba(30, 41, 59, 0.5);
  border-color: rgba(255, 255, 255, 0.1);
}

.article-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15);
}

.article-card:hover .article-cover {
  transform: scale(1.03);
}

.article-cover-wrap {
  position: relative;
  height: 140px;
  overflow: hidden;
  background: rgba(99, 102, 241, 0.1);
}

.article-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s;
}

.article-cover-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
}

.placeholder-icon { width: 2rem; height: 2rem; }

.article-date {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(15, 23, 42, 0.7);
  color: #fff;
  font-size: 0.6875rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-weight: 600;
}

.article-body {
  padding: 0.875rem;
}

.article-title {
  font-size: 0.9375rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 0.375rem;
  line-height: 1.4;
  transition: color 1s;
}

.dark .article-title { color: #fff; }

.article-desc {
  font-size: 0.8125rem;
  color: #64748b;
  margin: 0 0 0.625rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 1s;
}

.dark .article-desc { color: #94a3b8; }

.article-tags {
  display: flex;
  gap: 0.375rem;
  flex-wrap: wrap;
}

.tag {
  font-size: 0.6875rem;
  padding: 0.125rem 0.5rem;
  border-radius: 0.25rem;
  background: rgba(99, 102, 241, 0.1);
  color: #6366f1;
  font-weight: 600;
}

.dark .tag {
  background: rgba(99, 102, 241, 0.2);
  color: #818cf8;
}

/* Modal */
.article-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.article-modal {
  width: 100%;
  max-width: 48rem;
  max-height: 85vh;
  border-radius: 1rem;
  background: #fff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: modalIn 0.3s ease;
}

.dark .article-modal {
  background: #1e293b;
}

@keyframes modalIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.modal-close {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-cover {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.modal-body {
  padding: 1.25rem;
  overflow-y: auto;
}

.modal-meta {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.modal-category {
  font-size: 0.75rem;
  font-weight: 700;
  color: #6366f1;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.modal-date {
  font-size: 0.75rem;
  color: #94a3b8;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 0.75rem;
  font-family: 'Noto Serif SC', serif;
  transition: color 1s;
}

.dark .modal-title { color: #fff; }

.modal-tags {
  display: flex;
  gap: 0.375rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.modal-content pre {
  font-family: inherit;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-size: 0.9375rem;
  line-height: 1.8;
  color: #334155;
  margin: 0;
  transition: color 1s;
}

.dark .modal-content pre { color: #cbd5e1; }

.modal-link {
  display: inline-block;
  margin-top: 1rem;
  color: #6366f1;
  font-weight: 600;
  text-decoration: none;
  font-size: 0.875rem;
}

.modal-link:hover { text-decoration: underline; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
