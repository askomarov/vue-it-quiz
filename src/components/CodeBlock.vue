<script setup lang="ts">
import { computed } from 'vue'
import hljs from 'highlight.js/lib/common'

const props = defineProps<{
  code: string
  language?: string
}>()

const highlighted = computed(() => {
  if (props.language && hljs.getLanguage(props.language)) {
    return hljs.highlight(props.code, { language: props.language }).value
  }
  return hljs.highlightAuto(props.code).value
})
</script>

<template>
  <div class="my-4 overflow-hidden rounded-xl border border-slate-700/50 bg-[#0d1117] shadow-md">
    <div
      v-if="language"
      class="flex items-center gap-1.5 border-b border-slate-700/50 bg-[#161b22] px-4 py-2"
    >
      <span class="h-2.5 w-2.5 rounded-full bg-red-400/80"></span>
      <span class="h-2.5 w-2.5 rounded-full bg-yellow-400/80"></span>
      <span class="h-2.5 w-2.5 rounded-full bg-green-400/80"></span>
      <span class="ml-2 text-xs font-medium uppercase tracking-wide text-slate-400">{{ language }}</span>
    </div>
    <pre class="overflow-x-auto p-4 text-sm leading-relaxed"><code class="hljs font-mono" v-html="highlighted"></code></pre>
  </div>
</template>
