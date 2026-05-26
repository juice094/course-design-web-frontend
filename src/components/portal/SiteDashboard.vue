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
          <svg
            class="badge-icon green"
            viewBox="0 0 24 24"
            fill="currentColor"
          ><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>
          Vue 3
        </span>
        <span class="badge">
          <svg
            class="badge-icon yellow"
            viewBox="0 0 24 24"
            fill="currentColor"
          ><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
          Vite
        </span>
        <span class="badge">
          <svg
            class="badge-icon blue"
            viewBox="0 0 24 24"
            fill="currentColor"
          ><path d="M3 3h18v18H3V3zm14.5 14.5v-3h-2v3h-2v-5h-2v5h-2v-7h-2v7h-2v-4h-2v4H5v-9h14v9h-1.5z" /></svg>
          TypeScript
        </span>
        <span class="badge">
          <svg
            class="badge-icon sky"
            viewBox="0 0 24 24"
            fill="currentColor"
          ><path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624C10.337,13.382,8.976,12,6.001,12z" /></svg>
          Tailwind
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

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

@media (min-width: 768px) {
  .dashboard {
    flex-direction: row;
    height: 5rem;
  }
}

.clock-panel {
  background: #0f172a;
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
}

.dark .clock-panel {
  background: #000;
}

@media (min-width: 768px) {
  .clock-panel {
    font-size: 1.875rem;
    padding: 0 2rem;
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