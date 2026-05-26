<template>
  <component
    :is="url ? 'a' : 'div'"
    :href="url"
    target="_blank"
    rel="noopener noreferrer"
    class="social-btn"
    :title="type"
    @click="handleClick"
  >
    <svg
      v-if="type === 'github'"
      class="social-icon"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
    <svg
      v-else-if="type === 'steam'"
      class="social-icon"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M11.979 0C5.346 0 0 5.346 0 11.979c0 2.789.96 5.623 2.674 7.962L.81 22.96l3.519-.998c1.74 1.145 3.81 1.813 5.963 1.813 6.633 0 11.979-5.346 11.979-11.979C22.271 5.346 16.925 0 11.979 0zM6.69 14.323l3.887 1.592c1.254-.674 2.236-1.788 2.74-3.147l-4.47-1.829a4.002 4.002 0 01-2.157 3.384zm7.082-4.516a4 4 0 113.228 3.228 4 4 0 01-3.228-3.228z" />
    </svg>
    <svg
      v-else-if="type === 'email'"
      class="social-icon"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
    <svg
      v-else-if="type === 'qq'"
      class="social-icon"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 2c-4.418 0-8 3.582-8 8 0 1.25.289 2.433.805 3.49-1.024 1.708-1.53 3.843-1.021 5.308.203.585.806.84 1.341.57.828-.418 1.625-1.025 2.296-1.722 1.335.539 2.862.854 4.579.854 1.716 0 3.243-.315 4.578-.854.671.697 1.468 1.304 2.296 1.722.535.27 1.138.015 1.341-.57.509-1.465.003-3.6-1.021-5.308C19.71 12.433 20 11.25 20 10c0-4.418-3.582-8-8-8zm-2.5 8c-.828 0-1.5-.895-1.5-2s.672-2 1.5-2 1.5.895 1.5 2-.672 2-1.5 2zm5 0c-.828 0-1.5-.895-1.5-2s.672-2 1.5-2 1.5.895 1.5 2-.672 2-1.5 2z" />
    </svg>
  </component>
</template>

<script setup lang="ts">
defineProps<{
  type: 'github' | 'steam' | 'email' | 'qq'
  url?: string
}>()

const emit = defineEmits<{
  click: []
}>()

function handleClick() {
  emit('click')
}
</script>

<style scoped>
.social-btn {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #475569;
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;
}

.dark .social-btn {
  background: rgba(51, 65, 85, 0.5);
  color: #cbd5e1;
  border-color: rgba(255, 255, 255, 0.1);
}

.social-btn:hover {
  background: #6366f1;
  color: #fff;
  transform: translateY(-1px);
}

.dark .social-btn:hover {
  background: #4f46e5;
}

.social-icon {
  width: 1rem;
  height: 1rem;
}

@media (min-width: 768px) {
  .social-btn {
    width: 2.5rem;
    height: 2.5rem;
  }
  .social-icon {
    width: 1.25rem;
    height: 1.25rem;
  }
}
</style>
