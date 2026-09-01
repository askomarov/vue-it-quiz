<script setup lang="ts">
export interface ConsoleEntry {
  id: number
  level: 'log' | 'warn' | 'error' | 'info'
  args: string[]
  time: string
}

defineProps<{
  entries: ConsoleEntry[]
}>()

const levelClasses: Record<ConsoleEntry['level'], string> = {
  log: 'border-slate-600',
  info: 'border-sky-500',
  warn: 'border-amber-500',
  error: 'border-rose-500',
}

function formatMessage(args: string[]): string {
  return args.join(' ')
}
</script>

<template>
  <div class="flex h-full flex-col bg-[#0d1117]">
    <div class="border-b border-slate-700/50 px-4 py-2 text-xs font-medium uppercase tracking-wide text-slate-400">
      Console
    </div>
    <div class="flex-1 overflow-y-auto p-3 font-mono text-sm">
      <p v-if="entries.length === 0" class="text-slate-500">
        Console output will appear here…
      </p>
      <div
        v-for="entry in entries"
        :key="entry.id"
        class="mb-1 flex gap-3 border-l-2 pl-2 leading-relaxed text-slate-300"
        :class="levelClasses[entry.level]"
      >
        <span class="shrink-0 text-slate-500">{{ entry.time }}</span>
        <span class="whitespace-pre-wrap break-all">{{ formatMessage(entry.args) }}</span>
      </div>
    </div>
  </div>
</template>
