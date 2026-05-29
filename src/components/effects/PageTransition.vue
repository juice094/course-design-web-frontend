<template>
  <Transition name="page">
    <slot />
  </Transition>
</template>

<script setup lang="ts">
// Vue 3 原生 Transition，无需额外依赖
</script>

<style>
/* 全局样式：确保 Transition 包裹的 router-view 正常过渡 */
.page-enter-active,
.page-leave-active {
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (prefers-reduced-motion: reduce) {
  .page-enter-active,
  .page-leave-active {
    transition: none;
  }
}
</style>
