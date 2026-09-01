<script setup lang="ts">
import { computed } from 'vue'
import { iconPaths } from '@/lib/categoryDisplay'

const props = withDefaults(
  defineProps<{
    icon: string
    size?: 'sm' | 'md'
  }>(),
  {
    size: 'md',
  },
)

const path = computed(() => iconPaths[props.icon] || iconPaths.circle)

const boxClasses = computed(() =>
  props.size === 'md'
    ? 'h-12 w-12'
    : 'h-14 w-14',
)

const iconClasses = computed(() =>
  props.size === 'md' ? 'h-6 w-6' : 'h-7 w-7',
)
</script>

<template>
  <div
    class="flex items-center justify-center rounded-xl bg-sky-50 text-sky-600 transition-colors group-hover:bg-sky-100 dark:bg-sky-900/30 dark:text-sky-400"
    :class="boxClasses"
  >
    <svg
      :class="iconClasses"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      stroke-width="1.5"
    >
      <path stroke-linecap="round" stroke-linejoin="round" :d="path" />
    </svg>
  </div>
</template>
