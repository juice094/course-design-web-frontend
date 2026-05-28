<script setup lang="ts">
import * as Icons from '@element-plus/icons-vue'

const props = defineProps<{
  name: string
}>()

const Icon = computed(() => (Icons as Record<string, any>)[props.name])
</script>

<template>
  <component :is="Icon" v-if="Icon" />
</template>
