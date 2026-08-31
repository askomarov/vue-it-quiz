<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { getCategoryById } from '../lib/questionLoader'
import type { Category } from '../types'

const props = defineProps<{
  categoryId: string
}>()

const router = useRouter()

const category = computed(() => getCategoryById(props.categoryId))

watchEffect(() => {
  if (!category.value) {
    router.replace('/')
  }
})

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

function startQuiz() {
  router.push(`/category/${props.categoryId}/quiz`)
}
</script>

<template>
  <div v-if="category" class="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
    <RouterLink
      to="/"
      class="mb-8 inline-flex items-center gap-1 text-sm font-medium text-slate-500 transition-colors hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
    >
      ← All categories
    </RouterLink>

    <div
      class="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800"
    >
      <div class="mb-6 flex items-start justify-between">
        <div
          class="flex h-14 w-14 items-center justify-center rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400"
        >
          <svg
            class="h-7 w-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            stroke-width="1.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              :d="iconPaths[category.icon] || iconPaths.circle"
            />
          </svg>
        </div>
        <span
          class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-700 dark:text-slate-300"
        >
          {{ category.questions.length }} questions
        </span>
      </div>

      <h1 class="mb-3 text-3xl font-bold text-slate-900 dark:text-white">
        {{ category.name }}
      </h1>
      <p class="mb-6 text-slate-600 dark:text-slate-400">
        {{ category.description }}
      </p>

      <div class="mb-8 flex flex-wrap gap-1.5">
        <span
          v-if="countByDifficulty(category.questions).easy"
          :class="difficultyColors.easy"
          class="rounded-md px-2 py-0.5 text-xs font-medium"
        >
          {{ countByDifficulty(category.questions).easy }} easy
        </span>
        <span
          v-if="countByDifficulty(category.questions).medium"
          :class="difficultyColors.medium"
          class="rounded-md px-2 py-0.5 text-xs font-medium"
        >
          {{ countByDifficulty(category.questions).medium }} medium
        </span>
        <span
          v-if="countByDifficulty(category.questions).hard"
          :class="difficultyColors.hard"
          class="rounded-md px-2 py-0.5 text-xs font-medium"
        >
          {{ countByDifficulty(category.questions).hard }} hard
        </span>
      </div>

      <button
        type="button"
        :disabled="category.questions.length === 0"
        class="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 dark:focus-visible:ring-offset-slate-800"
        @click="startQuiz"
      >
        Start Quiz
      </button>
    </div>
  </div>
</template>
