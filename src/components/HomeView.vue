<script setup lang="ts">
import { computed } from 'vue'
import { categories, getTotalQuestionCount } from '../lib/questionLoader'
import type { Category } from '../types'

const emit = defineEmits<{
  (e: 'start', category: Category): void
}>()

const totalQuestions = computed(() => getTotalQuestionCount())

const iconPaths: Record<string, string> = {
  layout:
    'M4 4h7v7H4V4zm9 0h7v4h-7V4zM4 15h7v5H4v-5zm9-8h7v12h-7V7z',
  server:
    'M4 5a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm0 8a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm3-7h.01M7 14h.01',
  database:
    'M4 6c0-1.66 3.58-3 8-3s8 1.34 8 3-3.58 3-8 3-8-1.34-8-3zm0 6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6c0 1.66-3.58 3-8 3s-8-1.34-8-3v6zm0 4c0 1.66 3.58 3 8 3s8-1.34 8-3v-6c0 1.66-3.58 3-8 3s-8-1.34-8-3v6z',
  cloud:
    'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A3.5 3.5 0 003 15z',
  git: 'M6 3a3 3 0 100 6 3 3 0 000-6zm0 12a3 3 0 100 6 3 3 0 000-6zm12-6a3 3 0 100 6 3 3 0 000-6zM6 9v6m0-6a3 3 0 003-3h6',
  circle: 'M12 8a4 4 0 100 8 4 4 0 000-8z',
}

const difficultyColors: Record<string, string> = {
  easy: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  hard: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
}

function countByDifficulty(questions: Category['questions']) {
  return {
    easy: questions.filter((q) => q.difficulty === 'easy').length,
    medium: questions.filter((q) => q.difficulty === 'medium').length,
    hard: questions.filter((q) => q.difficulty === 'hard').length,
  }
}
</script>

<template>
  <div class="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
    <!-- Hero -->
    <div class="mb-12 text-center">
      <h1
        class="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
      >
        IT Quiz
      </h1>
      <p class="mt-4 text-lg text-slate-600 dark:text-slate-400">
        Test your knowledge across different IT domains. Pick a category and start
        answering questions.
      </p>
      <div
        class="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
      >
        <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
        {{ categories.length }} categories · {{ totalQuestions }} questions ready
      </div>
    </div>

    <!-- Category cards -->
    <div
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      <div
        v-for="cat in categories"
        :key="cat.id"
        class="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800"
      >
        <div class="mb-4 flex items-start justify-between">
          <div
            class="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600 transition-colors group-hover:bg-sky-100 dark:bg-sky-900/30 dark:text-sky-400"
          >
            <svg
              class="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              stroke-width="1.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                :d="iconPaths[cat.icon] || iconPaths.circle"
              />
            </svg>
          </div>
          <span
            class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-700 dark:text-slate-300"
          >
            {{ cat.questions.length }} questions
          </span>
        </div>

        <h2
          class="mb-2 text-xl font-semibold text-slate-900 dark:text-white"
        >
          {{ cat.name }}
        </h2>
        <p class="mb-4 flex-grow text-sm text-slate-600 dark:text-slate-400">
          {{ cat.description }}
        </p>

        <div class="mb-5 flex flex-wrap gap-1.5">
          <span
            v-if="countByDifficulty(cat.questions).easy"
            :class="difficultyColors.easy"
            class="rounded-md px-2 py-0.5 text-xs font-medium"
          >
            {{ countByDifficulty(cat.questions).easy }} easy
          </span>
          <span
            v-if="countByDifficulty(cat.questions).medium"
            :class="difficultyColors.medium"
            class="rounded-md px-2 py-0.5 text-xs font-medium"
          >
            {{ countByDifficulty(cat.questions).medium }} medium
          </span>
          <span
            v-if="countByDifficulty(cat.questions).hard"
            :class="difficultyColors.hard"
            class="rounded-md px-2 py-0.5 text-xs font-medium"
          >
            {{ countByDifficulty(cat.questions).hard }} hard
          </span>
        </div>

        <button
          type="button"
          :disabled="cat.questions.length === 0"
          class="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 dark:focus-visible:ring-offset-slate-800"
          @click="emit('start', cat)"
        >
          Start Quiz
        </button>
      </div>
    </div>
  </div>
</template>
