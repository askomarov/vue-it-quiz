<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

type ButtonVariant = 'primary' | 'accent' | 'secondary' | 'ghost' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    as?: 'button' | 'a' | 'router-link'
    to?: string
    href?: string
    type?: 'button' | 'submit' | 'reset'
    variant?: ButtonVariant
    size?: ButtonSize
    disabled?: boolean
    block?: boolean
    target?: string
    rel?: string
    title?: string
  }>(),
  {
    as: 'button',
    type: 'button',
    variant: 'primary',
    size: 'md',
    disabled: false,
    block: false,
  },
)

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-slate-900 text-white hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100',
  accent: 'bg-sky-600 text-white hover:bg-sky-700',
  secondary:
    'border border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700',
  ghost:
    'text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200',
  outline:
    'border border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:text-sky-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-sky-500 dark:hover:text-sky-400',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-sm rounded-lg',
  md: 'rounded-xl px-4 py-3 text-sm',
  lg: 'rounded-xl px-6 py-3 text-sm',
}

const classes = computed(() => [
  'inline-flex items-center justify-center gap-1.5 font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800 disabled:cursor-not-allowed disabled:opacity-50',
  variantClasses[props.variant],
  sizeClasses[props.size],
  props.block ? 'w-full' : '',
])

const isRouterLink = computed(() => props.as === 'router-link' || Boolean(props.to))
const isAnchor = computed(() => props.as === 'a' || Boolean(props.href))

const componentTag = computed(() => {
  if (isRouterLink.value) return RouterLink
  if (isAnchor.value) return 'a'
  return 'button'
})

function handleClick(event: MouseEvent) {
  if (props.disabled) {
    event.preventDefault()
    return
  }
  emit('click', event)
}
</script>

<template>
  <component
    :is="componentTag"
    :to="isRouterLink ? to : undefined"
    :href="isAnchor ? href : undefined"
    :type="componentTag === 'button' ? type : undefined"
    :disabled="componentTag === 'button' ? disabled : undefined"
    :target="target"
    :rel="rel"
    :title="title"
    :class="classes"
    @click="handleClick"
  >
    <slot />
  </component>
</template>
