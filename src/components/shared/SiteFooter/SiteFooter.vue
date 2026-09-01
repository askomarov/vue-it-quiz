<script setup lang="ts">
import { ADD_QUESTION_URL, REPO_URL } from '@/lib/siteLinks'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-slate-200 bg-white/80 dark:border-slate-700 dark:bg-slate-900/80">
    <div
      class="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:px-6 lg:px-8 dark:text-slate-400"
    >
      <span>IT Quiz &copy; {{ year }}</span>
      <div class="flex items-center gap-4">
        <a
          :href="ADD_QUESTION_URL"
          target="_blank"
          rel="noopener noreferrer"
          class="font-medium transition-colors hover:text-sky-600 dark:hover:text-sky-400"
        >
          Add a question
        </a>
        <a
          :href="REPO_URL"
          target="_blank"
          rel="noopener noreferrer"
          class="font-medium transition-colors hover:text-sky-600 dark:hover:text-sky-400"
        >
          GitHub
        </a>
      </div>
    </div>
  </footer>
</template>
