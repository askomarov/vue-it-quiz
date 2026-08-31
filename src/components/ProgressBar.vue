<script setup lang="ts">
defineProps<{
  percent: number
  current?: number
  total?: number
}>()
</script>

<template>
  <div class="w-full">
    <div
      v-if="current !== undefined && total !== undefined"
      class="mb-2 flex items-center justify-between text-sm font-medium text-slate-500"
    >
      <span>Question {{ current + 1 }} of {{ total }}</span>
      <span>{{ percent }}%</span>
    </div>
    <div
      class="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700"
      role="progressbar"
      :aria-valuenow="percent"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div
        class="h-full rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 transition-all duration-500 ease-out"
        :style="{ width: `${percent}%` }"
      ></div>
    </div>
  </div>
</template>
