<script setup lang="ts">
import { computed } from 'vue'
import { difficultyColors } from '@/lib/categoryDisplay'

type BadgeVariant = 'count' | 'difficulty' | 'tag' | 'stat'

const props = withDefaults(
  defineProps<{
    variant?: BadgeVariant
    difficulty?: 'easy' | 'medium' | 'hard'
  }>(),
  {
    variant: 'count',
  },
)

const variantClasses: Record<BadgeVariant, string> = {
  count:
    'rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-700 dark:text-slate-300',
  difficulty: 'rounded-md px-2 py-0.5 text-xs font-medium',
  tag: 'rounded-md bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-600 dark:bg-sky-900/30 dark:text-sky-400',
  stat: 'inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300',
}

const classes = computed(() => {
  const base = variantClasses[props.variant]
  if (props.variant === 'difficulty' && props.difficulty) {
    return [base, difficultyColors[props.difficulty]]
  }
  return base
})
</script>

<template>
  <span :class="classes">
    <slot />
  </span>
</template>
