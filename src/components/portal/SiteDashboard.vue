<template>
  <div class="dashboard">
    <div class="clock-panel">
      <div class="clock-gloss" />
      {{ timeStr || '00:00:00' }}
      <div class="clock-line" />
    </div>

    <div class="status-panel">
      <div class="status-item">
        <span class="pulse-dot" />
        <span>
          系统已稳定运行：
          <span class="uptime">{{ uptimeStr }}</span>
        </span>
      </div>

      <div class="badge-list">
        <span class="badge">
          <Globe class="badge-icon green" :size="14" />
          Vue 3
        </span>
        <span class="badge">
          <Zap class="badge-icon yellow" :size="14" />
          Vite
        </span>
        <span class="badge">
          <FileCode class="badge-icon blue" :size="14" />
          TypeScript
        </span>
        <span class="badge">
          <Wind class="badge-icon sky" :size="14" />
          Tailwind
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Globe, Zap, FileCode, Wind } from 'lucide-vue-next'

const START_DATE = new Date('2026-03-23T00:00:00').getTime()

const timeStr = ref('')
const uptimeStr = ref('')
let timer: ReturnType<typeof setInterval> | null = null

function updateTime() {
  const now = new Date()
  timeStr.value = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })

  const diff = now.getTime() - START_DATE
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  uptimeStr.value = `${days}天 ${hours}小时`
}

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.dashboard {
  width: 100%;
  border-radius: 1.5rem;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: background 0.7s, border-color 0.7s;
  height: auto;
}

.dark .dashboard {
  background: rgba(30, 41, 59, 0.5);
  border-color: rgba(255, 255, 255, 0.1);
}

.dark .dashboard {
  background: rgba(30, 41, 59, 0.5);
  border-color: rgba(255, 255, 255, 0.1);
}

@media (min-width: 768px) {
  .dashboard {
    flex-direction: row;
    height: 5rem;
  }
}

.clock-panel {
  background: rgba(15, 23, 42, 0.85);
  color: #fff;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
  transition: background 1s;
  border-radius: 1.5rem 0 0 1.5rem;
}

.dark .clock-panel {
  background: rgba(0, 0, 0, 0.9);
}

@media (min-width: 768px) {
  .clock-panel {
    font-size: 1.875rem;
    padding: 0 2rem;
    border-radius: 1.5rem 0 0 1.5rem;
  }
}

.clock-gloss {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(255,255,255,0.1), transparent);
  pointer-events: none;
}

.clock-line {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 1px;
  background: rgba(0, 0, 0, 0.5);
}

.status-panel {
  flex: 1;
  padding: 1rem 1.5rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #475569;
  transition: color 1s;
}

.dark .status-panel {
  color: #cbd5e1;
}

@media (min-width: 768px) {
  .status-panel {
    padding: 0 1.5rem;
    font-size: 0.875rem;
  }
}

.status-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pulse-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: #22c55e;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.uptime {
  color: #4f46e5;
  font-weight: 900;
}

.dark .uptime {
  color: #818cf8;
}

.badge-list {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.badge {
  padding: 0.25rem 0.5rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 0.25rem;
  border: 1px solid rgba(255, 255, 255, 0.4);
  font-size: 0.75rem;
}

.dark .badge {
  background: rgba(51, 65, 85, 0.5);
  border-color: rgba(71, 85, 105, 1);
}

.badge-icon {
  width: 0.875rem;
  height: 0.875rem;
}

.green { color: #22c55e; }
.yellow { color: #eab308; }
.blue { color: #3b82f6; }
.sky { color: #38bdf8; }
</style>