<script setup lang="ts">
import { RouterLink } from 'vue-router'

withDefaults(
  defineProps<{
    to?: string
    label?: string
  }>(),
  {
    to: '/',
    label: '← All categories',
  },
)
</script>

<template>
  <RouterLink
    :to="to"
    class="inline-flex items-center gap-1 text-sm font-medium text-slate-500 transition-colors hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
  >
    {{ label }}
  </RouterLink>
</template>
