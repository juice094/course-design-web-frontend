<template>
  <div class="portal-bg">
    <div
      class="gradient-flow"
      :class="{ animated: config.background.gradientAnimated }"
      :style="bgStyle"
    />
    <div class="overlay" />
    <div class="glow glow-tl" />
    <div class="glow glow-br" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePortalStore } from '@/stores/portal'

const portalStore = usePortalStore()
const config = computed(() => portalStore.config)
const bgStyle = computed(() => portalStore.bgStyle)
</script>

<style scoped>
.portal-bg {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  overflow: hidden;
}

.gradient-flow {
  position: absolute;
  inset: 0;
  z-index: -8;
  opacity: 0.6;
  mix-blend-mode: color;
  background-size: 400% 400% !important;
}

.gradient-flow.animated {
  animation: gradientMove 15s ease infinite;
}

.dark .gradient-flow {
  opacity: 0.2;
}

@keyframes gradientMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.overlay {
  position: absolute;
  inset: 0;
  z-index: -9;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: background 1s;
}

.dark .overlay {
  background: rgba(15, 23, 42, 0.4);
}

.glow {
  position: absolute;
  width: 40%;
  height: 40%;
  border-radius: 50%;
  filter: blur(100px);
  z-index: -7;
}

.glow-tl {
  top: -10%;
  left: -10%;
  background: rgba(255, 255, 255, 0.4);
}

.dark .glow-tl {
  background: rgba(49, 46, 129, 0.2);
}

.glow-br {
  bottom: -10%;
  right: -10%;
  background: rgba(99, 102, 241, 0.3);
}

.dark .glow-br {
  background: rgba(88, 28, 135, 0.3);
}
</style>
