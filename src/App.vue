<template>
  <AppLayout v-if="!isStandalonePage" />
  <RouterView v-else />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppLayout from '@/components/AppLayout.vue'

const route = useRoute()
const standalonePages = ['/login', '/portal']
const isStandalonePage = computed(() => standalonePages.includes(route.path))
</script>
