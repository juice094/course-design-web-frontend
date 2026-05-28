<template>
  <div class="section">
    <div class="section-header">
      <div class="section-icon">
        <FolderGit2 class="icon-svg" :size="16" />
      </div>
      <h2 class="section-title">
        项目展示
      </h2>
    </div>

    <div class="project-grid">
      <a
        v-for="project in projects"
        :key="project.name"
        :href="project.url"
        target="_blank"
        rel="noopener noreferrer"
        class="project-card"
      >
        <div class="project-cover">
          <img
            :src="project.cover"
            :alt="project.name"
            class="cover-img"
          >
          <div class="cover-overlay" />
        </div>
        <div class="project-body">
          <h3 class="project-name">{{ project.name }}</h3>
          <p class="project-desc">{{ project.description }}</p>
          <div class="project-tags">
            <span
              v-for="tag in project.tags"
              :key="tag"
              class="project-tag"
            >{{ tag }}</span>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FolderGit2 } from 'lucide-vue-next'
import { projects } from '@/data/profile'
</script>

<style scoped>
.section {
  width: 100%;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.section-icon {
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  background: rgba(99, 102, 241, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-svg {
  width: 1rem;
  height: 1rem;
  color: #4f46e5;
}

.dark .icon-svg {
  color: #818cf8;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
  font-family: 'Noto Serif SC', serif;
  margin: 0;
  transition: color 1s;
}

.dark .section-title {
  color: #fff;
}

.project-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

@media (min-width: 640px) {
  .project-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .project-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.project-card {
  border-radius: 1.5rem;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.7s;
  display: flex;
  flex-direction: column;
  text-decoration: none;
}

.dark .project-card {
  background: rgba(30, 41, 59, 0.5);
  border-color: rgba(255, 255, 255, 0.1);
}

.project-card:hover {
  transform: scale(1.02);
}

.project-cover {
  height: 9rem;
  overflow: hidden;
  position: relative;
}

.cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s;
}

.project-card:hover .cover-img {
  transform: scale(1.05);
}

.cover-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.4), transparent);
}

.project-body {
  padding: 1.25rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.project-name {
  font-size: 1rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 0.25rem;
  transition: color 0.3s;
}

.project-card:hover .project-name {
  color: #4f46e5;
}

.dark .project-name {
  color: #fff;
}

.dark .project-card:hover .project-name {
  color: #818cf8;
}

.project-desc {
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.5;
  margin: 0 0 0.75rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
  transition: color 1s;
}

.dark .project-desc {
  color: #94a3b8;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
}

.project-tag {
  padding: 0.125rem 0.5rem;
  border-radius: 0.375rem;
  background: rgba(99, 102, 241, 0.1);
  color: #4f46e5;
  font-size: 0.75rem;
  font-weight: 500;
}

.dark .project-tag {
  background: rgba(99, 102, 241, 0.2);
  color: #818cf8;
}
</style>