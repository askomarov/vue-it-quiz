<script setup lang="ts">
defineOptions({ inheritAttrs: false })

withDefaults(
  defineProps<{
    hoverable?: boolean
    padding?: 'md' | 'lg'
  }>(),
  {
    hoverable: false,
    padding: 'md',
  },
)
</script>

<template>
  <div
    v-bind="$attrs"
    class="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800"
    :class="[
      padding === 'lg' ? 'p-8' : 'p-6',
      hoverable
        ? 'transition-all duration-200 hover:-translate-y-1 hover:shadow-lg'
        : '',
    ]"
  >
    <slot />
  </div>
</template>
