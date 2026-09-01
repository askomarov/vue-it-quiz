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
      class="relative h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700"
    >
      <span
        class="relative block h-full overflow-hidden transition-all duration-500 ease-out"
        :style="{ width: `${percent}%` }"
      >
        <span
          class="absolute inset-y-0 left-0 h-full rounded-full bg-linear-to-r from-red-400 via-yellow-400 to-green-700"
          :style="{ width: percent ? `calc(100% * 100 / ${percent})` : '0' }"
        />
      </span>
    </div>
  </div>
</template>
