<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    maxWidth?: '2xl' | '3xl' | '5xl'
    paddingY?: '8' | '12'
  }>(),
  {
    maxWidth: '5xl',
    paddingY: '12',
  },
)

const classes = computed(() => [
  'mx-auto px-4 sm:px-6 lg:px-8',
  props.maxWidth === '2xl'
    ? 'max-w-2xl'
    : props.maxWidth === '3xl'
      ? 'max-w-3xl'
      : 'max-w-5xl',
  props.paddingY === '8' ? 'py-8' : 'py-12',
])
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
