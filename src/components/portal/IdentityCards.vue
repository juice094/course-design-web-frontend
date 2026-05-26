<template>
  <div class="id-grid">
    <!-- 学生卡 -->
    <div class="id-card">
      <div class="id-header">
        <div class="id-icon student">
          <svg class="icon-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          </svg>
        </div>
        <h3 class="id-title">在校学生</h3>
      </div>
      <div class="id-body">
        <div class="id-row"><span class="id-key">院校</span><span class="id-val">甘肃农业大学</span></div>
        <div class="id-row"><span class="id-key">专业</span><span class="id-val">计算机科学与技术</span></div>
        <div class="id-row"><span class="id-key">年级</span><span class="id-val">2022 级 · 大三</span></div>
        <div class="id-row"><span class="id-key">绩点</span><span class="id-val highlight">3.82 / 4.0</span></div>
      </div>
      <div class="id-tags">
        <span class="tag student-tag">数据结构</span>
        <span class="tag student-tag">操作系统</span>
        <span class="tag student-tag">计算机网络</span>
      </div>
    </div>

    <!-- 开发者卡 -->
    <div class="id-card">
      <div class="id-header">
        <div class="id-icon dev">
          <svg class="icon-svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
          </svg>
        </div>
        <h3 class="id-title">开发者</h3>
      </div>
      <div class="id-body">
        <div class="id-row"><span class="id-key">GitHub</span><span class="id-val">@gsau-dev</span></div>
        <div class="id-row"><span class="id-key">贡献</span><span class="id-val">1,247 commits</span></div>
        <div class="id-row"><span class="id-key">星标</span><span class="id-val highlight">342 ⭐</span></div>
        <div class="id-row"><span class="id-key">语言</span><span class="id-val">TypeScript · Vue</span></div>
      </div>
      <div class="id-tags">
        <span class="tag dev-tag">Vue 3</span>
        <span class="tag dev-tag">Node.js</span>
        <span class="tag dev-tag">Tailwind</span>
      </div>
    </div>

    <!-- 玩家卡 -->
    <div class="id-card">
      <div class="id-header">
        <div class="id-icon gamer">
          <svg class="icon-svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.979 0C5.346 0 0 5.346 0 11.979c0 2.789.96 5.623 2.674 7.962L.81 22.96l3.519-.998c1.74 1.145 3.81 1.813 5.963 1.813 6.633 0 11.979-5.346 11.979-11.979C22.271 5.346 16.925 0 11.979 0zM6.69 14.323l3.887 1.592c1.254-.674 2.236-1.788 2.74-3.147l-4.47-1.829a4.002 4.002 0 01-2.157 3.384zm7.082-4.516a4 4 0 113.228 3.228 4 4 0 01-3.228-3.228z"/>
          </svg>
        </div>
        <h3 class="id-title">Steam 玩家</h3>
      </div>
      <div class="id-body">
        <div class="id-row"><span class="id-key">ID</span><span class="id-val">xinghuisama</span></div>
        <div class="id-row"><span class="id-key">等级</span><span class="id-val">Lv. 42</span></div>
        <div class="id-row"><span class="id-key">时长</span><span class="id-val highlight">2,847 h</span></div>
        <div class="id-row"><span class="id-key">最近在玩</span><span class="id-val">Arknights · CS2</span></div>
      </div>
      <div class="id-tags">
        <span class="tag gamer-tag">RPG</span>
        <span class="tag gamer-tag">FPS</span>
        <span class="tag gamer-tag">策略</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.id-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  width: 100%;
}

@media (min-width: 768px) {
  .id-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.id-card {
  border-radius: 1.5rem;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: all 0.7s;
}

.dark .id-card {
  background: rgba(30, 41, 59, 0.5);
  border-color: rgba(255, 255, 255, 0.1);
}

.id-card:hover {
  transform: scale(1.02) translateY(-4px);
}

.id-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.id-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.student {
  background: rgba(99, 102, 241, 0.2);
  color: #4f46e5;
}

.dark .student { color: #818cf8; }

.dev {
  background: rgba(168, 85, 247, 0.2);
  color: #7c3aed;
}

.dark .dev { color: #a78bfa; }

.gamer {
  background: rgba(219, 39, 119, 0.2);
  color: #db2777;
}

.dark .gamer { color: #f472b6; }

.icon-svg {
  width: 1.25rem;
  height: 1.25rem;
}

.id-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #0f172a;
  font-family: 'Noto Serif SC', serif;
  margin: 0;
  transition: color 1s;
}

.dark .id-title {
  color: #fff;
}

.id-body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.id-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
}

.id-key {
  color: #94a3b8;
  transition: color 1s;
}

.dark .id-key {
  color: #64748b;
}

.id-val {
  color: #334155;
  font-weight: 500;
  transition: color 1s;
}

.dark .id-val {
  color: #cbd5e1;
}

.highlight {
  color: #4f46e5;
  font-weight: 600;
}

.dark .highlight {
  color: #818cf8;
}

.id-tags {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.student-tag {
  background: rgba(99, 102, 241, 0.1);
  color: #4f46e5;
}

.dark .student-tag {
  background: rgba(99, 102, 241, 0.2);
  color: #818cf8;
}

.dev-tag {
  background: rgba(168, 85, 247, 0.1);
  color: #7c3aed;
}

.dark .dev-tag {
  background: rgba(168, 85, 247, 0.2);
  color: #a78bfa;
}

.gamer-tag {
  background: rgba(219, 39, 119, 0.1);
  color: #db2777;
}

.dark .gamer-tag {
  background: rgba(219, 39, 119, 0.2);
  color: #f472b6;
}
</style>