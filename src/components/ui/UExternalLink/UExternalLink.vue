<script setup lang="ts">
withDefaults(
  defineProps<{
    href: string
    target?: string
    rel?: string
    title?: string
    pill?: boolean
    icon?: boolean
    square?: boolean
  }>(),
  {
    target: '_blank',
    rel: 'noopener noreferrer',
    pill: true,
    icon: false,
    square: false,
  },
)
</script>

<template>
  <a
    :href="href"
    :target="target"
    :rel="rel"
    :title="title"
    class="inline-flex items-center justify-center font-medium text-slate-700 transition-colors hover:border-sky-300 hover:text-sky-700 dark:text-slate-200 dark:hover:border-sky-500 dark:hover:text-sky-400 gap-2"
    :class="[
      pill
        ? 'rounded-full border border-slate-200 bg-white px-4 py-2 text-sm dark:border-slate-600 dark:bg-slate-800'
        : square
          ? 'h-9 w-9 rounded-lg border border-slate-200 bg-white dark:border-slate-600 dark:bg-slate-800'
          : 'rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs dark:border-slate-600 dark:bg-slate-800',
    ]"
  >
    <slot />
  </a>
</template>
