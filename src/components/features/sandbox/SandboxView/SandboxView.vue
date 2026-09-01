<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import SandboxEditor from '@features/sandbox/SandboxEditor/SandboxEditor.vue'
import SandboxConsole, { type ConsoleEntry } from '@features/sandbox/SandboxConsole/SandboxConsole.vue'
import { compileSandboxCode } from '@/lib/sandboxCompile'
import {
  DEFAULT_SANDBOX_SCRIPT,
  DEFAULT_SANDBOX_TEMPLATE,
  SANDBOX_STORAGE_KEY,
} from '@/lib/sandboxConstants'

const script = ref(DEFAULT_SANDBOX_SCRIPT)
const template = ref(DEFAULT_SANDBOX_TEMPLATE)
const previewSrc = ref('')
const consoleEntries = ref<ConsoleEntry[]>([])
let nextEntryId = 0
let debounceTimer: ReturnType<typeof setTimeout> | null = null

function formatTime() {
  return new Date().toLocaleTimeString('en-GB', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

function addConsoleEntry(level: ConsoleEntry['level'], args: string[]) {
  consoleEntries.value.push({
    id: nextEntryId++,
    level,
    args,
    time: formatTime(),
  })
}

function handleMessage(event: MessageEvent) {
  if (event.data?.type !== 'sandbox-console') return
  addConsoleEntry(event.data.level, event.data.args)
}

function runCode() {
  try {
    previewSrc.value = compileSandboxCode(script.value, template.value)
  } catch (err) {
    addConsoleEntry('error', [err instanceof Error ? err.message : String(err)])
  }
}

function scheduleRun() {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(runCode, 400)
}

function resetCode() {
  script.value = DEFAULT_SANDBOX_SCRIPT
  template.value = DEFAULT_SANDBOX_TEMPLATE
}

function clearConsole() {
  consoleEntries.value = []
}

function loadStoredCode() {
  const stored = localStorage.getItem(SANDBOX_STORAGE_KEY)
  if (!stored) return

  try {
    const parsed = JSON.parse(stored) as { script?: string; template?: string }
    if (parsed.script) script.value = parsed.script
    if (parsed.template) template.value = parsed.template
  } catch {
    script.value = stored
  }

  localStorage.removeItem(SANDBOX_STORAGE_KEY)
}

onMounted(() => {
  loadStoredCode()
  window.addEventListener('message', handleMessage)
  runCode()
})

onBeforeUnmount(() => {
  window.removeEventListener('message', handleMessage)
  if (debounceTimer) clearTimeout(debounceTimer)
})

watch([script, template], scheduleRun)
</script>

<template>
  <div class="flex h-screen flex-col bg-slate-900 text-white">
    <header class="flex shrink-0 items-center justify-between border-b border-slate-700 px-4 py-3">
      <div class="flex items-center gap-4">
        <RouterLink
          to="/"
          class="text-sm font-medium text-slate-400 transition-colors hover:text-white"
        >
          ← Back to Quiz
        </RouterLink>
        <h1 class="text-sm font-semibold text-slate-200">
          Vue 3 Sandbox
        </h1>
      </div>
      <div class="flex items-center gap-2">
        <button
          type="button"
          class="rounded-lg border border-slate-600 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
          @click="clearConsole"
        >
          Clear console
        </button>
        <button
          type="button"
          class="rounded-lg bg-slate-700 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-slate-600"
          @click="resetCode"
        >
          Reset code
        </button>
      </div>
    </header>

    <div class="flex min-h-0 flex-1 flex-col lg:flex-row">
      <section class="flex min-h-0 flex-1 flex-col border-b border-slate-700 lg:w-1/2 lg:border-b-0 lg:border-r">
        <div class="flex min-h-0 flex-1 flex-col border-b border-slate-700/50">
          <div class="border-b border-slate-700/50 px-4 py-2 text-xs font-medium uppercase tracking-wide text-slate-400">
            Script
          </div>
          <div class="min-h-0 flex-1">
            <SandboxEditor v-model="script" language="typescript" />
          </div>
        </div>

        <div class="flex min-h-0 flex-1 flex-col">
          <div class="border-b border-slate-700/50 px-4 py-2 text-xs font-medium uppercase tracking-wide text-slate-400">
            Template
          </div>
          <div class="min-h-0 flex-1">
            <SandboxEditor v-model="template" language="html" />
          </div>
          <p class="border-t border-slate-700/50 px-4 py-1.5 text-xs text-slate-500">
            Template auto-binds
            <code class="text-slate-400">ref</code>,
            <code class="text-slate-400">reactive</code>,
            <code class="text-slate-400">computed</code>
            and handlers from script
          </p>
        </div>
      </section>

      <section class="flex min-h-0 flex-1 flex-col lg:w-1/2">
        <div class="border-b border-slate-700/50 px-4 py-2 text-xs font-medium uppercase tracking-wide text-slate-400">
          Preview
        </div>
        <div class="min-h-0 flex-1 bg-white">
          <iframe
            :key="previewSrc"
            :srcdoc="previewSrc"
            sandbox="allow-scripts"
            class="h-full w-full border-0"
            title="Vue sandbox preview"
          />
        </div>
      </section>
    </div>

    <section class="h-48 shrink-0 border-t border-slate-700">
      <SandboxConsole :entries="consoleEntries" />
    </section>
  </div>
</template>
