<template>
  <Teleport to="body">
    <div class="toast-container" aria-live="polite" aria-atomic="true">
      <TransitionGroup name="toast">
        <div
          v-for="(item, index) in store.items"
          :key="item.id"
          class="toast-item"
          :class="`toast-${item.type}`"
          :style="{ '--index': index } as Record<string, string>"
          role="status"
        >
          <span class="toast-icon">{{ typeIcon(item.type) }}</span>
          <span class="toast-text">{{ item.text }}</span>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useToastStore, type ToastType } from '@/stores/toast'

const store = useToastStore()

function typeIcon(type: ToastType): string {
  const map: Record<ToastType, string> = {
    success: '✓',
    warning: '▲',
    error: '✕',
    info: 'ℹ',
  }
  return map[type]
}
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  pointer-events: none;
}

.toast-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  border-radius: 0.875rem;
  font-size: 0.875rem;
  font-weight: 600;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  white-space: nowrap;
  transform: translateY(calc(var(--index, 0) * 4px));
  transition: transform 0.3s ease;
}

.toast-success {
  background: rgba(16, 185, 129, 0.9);
  color: #fff;
}
.toast-warning {
  background: rgba(245, 158, 11, 0.9);
  color: #fff;
}
.toast-error {
  background: rgba(239, 68, 68, 0.9);
  color: #fff;
}
.toast-info {
  background: rgba(99, 102, 241, 0.9);
  color: #fff;
}

.toast-icon {
  font-size: 0.75rem;
  font-weight: 900;
  flex-shrink: 0;
}

/* 进入/离开动画 */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(-20px) scale(0.92);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(-12px) scale(0.95);
}

@media (prefers-reduced-motion: reduce) {
  .toast-enter-active,
  .toast-leave-active {
    transition: none;
  }
}
</style>
