<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuiz } from '../composables/useQuiz'
import { getCategoryById } from '../lib/questionLoader'
import { stageSandboxCode } from '../lib/sandboxNavigation'
import type { QuestionOption } from '../types'
import CodeBlock from './CodeBlock.vue'
import ProgressBar from './ProgressBar.vue'

const props = defineProps<{
  categoryId: string
}>()

const route = useRoute()
const router = useRouter()

const {
  currentCategory,
  currentQuestion,
  currentIndex,
  totalQuestions,
  selectedAnswerId,
  isAnswered,
  isLastQuestion,
  progressPercent,
  quizQuestions,
  startQuiz,
  selectAnswer,
  submitAnswer,
  nextQuestion,
  exitQuiz,
} = useQuiz()

function ensureQuizStarted() {
  const category = getCategoryById(props.categoryId)
  if (!category) {
    router.replace('/')
    return
  }

  if (currentCategory.value?.id !== props.categoryId || quizQuestions.value.length === 0) {
    startQuiz(category)
  }
}

onMounted(ensureQuizStarted)

watch(
  () => route.params.categoryId,
  () => ensureQuizStarted(),
)

const canSubmit = computed(() => selectedAnswerId.value !== null && !isAnswered.value)

const canOpenSandbox = computed(
  () =>
    currentCategory.value?.name === 'Vue 3' &&
    Boolean(currentQuestion.value?.code),
)

function handleOpenSandbox() {
  if (!currentQuestion.value?.code) return
  stageSandboxCode(currentQuestion.value.code)
}

function handleNext() {
  if (isAnswered.value && isLastQuestion.value) {
    router.push(`/category/${props.categoryId}/result`)
  } else {
    nextQuestion()
  }
}

function handleExit() {
  exitQuiz()
  router.push(`/category/${props.categoryId}`)
}

function optionClasses(opt: QuestionOption): string {
  if (!isAnswered.value) {
    return selectedAnswerId.value === opt.id
      ? 'border-sky-500 bg-sky-50 dark:bg-sky-900/20'
      : 'border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600'
  }
  if (opt.id === currentQuestion.value?.correctAnswerId) {
    return 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
  }
  if (opt.id === selectedAnswerId.value && opt.id !== currentQuestion.value?.correctAnswerId) {
    return 'border-rose-500 bg-rose-50 dark:bg-rose-900/20'
  }
  return 'border-slate-200 opacity-60 dark:border-slate-700'
}

function indicatorClasses(opt: QuestionOption): string {
  if (!isAnswered.value) {
    return selectedAnswerId.value === opt.id
      ? 'border-sky-500 bg-sky-500'
      : 'border-slate-300 dark:border-slate-600'
  }
  if (opt.id === currentQuestion.value?.correctAnswerId) {
    return 'border-emerald-500 bg-emerald-500 text-white'
  }
  if (opt.id === selectedAnswerId.value && opt.id !== currentQuestion.value?.correctAnswerId) {
    return 'border-rose-500 bg-rose-500 text-white'
  }
  return 'border-slate-300 dark:border-slate-600'
}
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h2 class="text-lg font-semibold text-slate-900 dark:text-white">
          {{ currentCategory?.name }}
        </h2>
      </div>
      <button
        type="button"
        class="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
        @click="handleExit"
      >
        Exit
      </button>
    </div>

    <!-- Progress -->
    <ProgressBar
      :percent="progressPercent"
      :current="currentIndex"
      :total="totalQuestions"
    />

    <!-- Question card -->
    <div
      v-if="currentQuestion"
      class="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:p-8"
    >
      <div class="mb-4 flex items-center gap-2">
        <span
          class="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium capitalize text-slate-600 dark:bg-slate-700 dark:text-slate-300"
        >
          {{ currentQuestion.difficulty }}
        </span>
        <span
          v-for="tag in currentQuestion.tags"
          :key="tag"
          class="rounded-md bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-600 dark:bg-sky-900/30 dark:text-sky-400"
        >
          {{ tag }}
        </span>
      </div>

      <!-- eslint-disable vue/no-v-html -->
      <div
        class="text-lg font-medium leading-relaxed text-slate-900 dark:text-white [&_code]:rounded [&_code]:bg-slate-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_code]:font-mono dark:[&_code]:bg-slate-900"
        v-html="currentQuestion.question"
      ></div>

      <div v-if="currentQuestion.code" class="space-y-2">
        <CodeBlock
          :code="currentQuestion.code"
          :language="currentQuestion.codeLanguage"
        />
        <a
          v-if="canOpenSandbox"
          href="/sandbox"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-sky-300 hover:text-sky-700 dark:border-slate-600 dark:text-slate-300 dark:hover:border-sky-500 dark:hover:text-sky-400"
          @click="handleOpenSandbox"
        >
          Open in sandbox
          <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>

      <!-- Options -->
    <div class="mt-6 space-y-3">
      <button
        v-for="opt in currentQuestion.options"
        :key="opt.id"
        type="button"
        :disabled="isAnswered"
        class="flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 disabled:cursor-default dark:focus-visible:ring-offset-slate-800"
        :class="optionClasses(opt)"
        @click="selectAnswer(opt.id)"
      >
        <span
          class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-all"
          :class="indicatorClasses(opt)"
        >
          <svg
            v-if="isAnswered && opt.id === currentQuestion.correctAnswerId"
            class="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            stroke-width="3"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <svg
            v-else-if="isAnswered && opt.id === selectedAnswerId && opt.id !== currentQuestion.correctAnswerId"
            class="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            stroke-width="3"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span v-else class="text-slate-500 dark:text-slate-400">
            {{ String.fromCharCode(65 + currentQuestion.options.indexOf(opt)) }}
          </span>
        </span>
        <span class="text-sm font-medium text-slate-800 dark:text-slate-200">
          {{ opt.text }}
        </span>
      </button>
    </div>

      <!-- Explanation -->
    <div
      v-if="isAnswered"
      class="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/50"
    >
      <div class="mb-2 flex items-center gap-2">
        <svg
          v-if="selectedAnswerId === currentQuestion.correctAnswerId"
          class="h-5 w-5 text-emerald-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <svg
          v-else
          class="h-5 w-5 text-rose-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span
          class="text-sm font-semibold"
          :class="selectedAnswerId === currentQuestion.correctAnswerId ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'"
        >
          {{ selectedAnswerId === currentQuestion.correctAnswerId ? 'Correct!' : 'Incorrect' }}
        </span>
      </div>
      <!-- eslint-disable vue/no-v-html -->
      <div
        class="text-sm leading-relaxed text-slate-600 dark:text-slate-400 [&_a]:font-medium [&_a]:text-emerald-600 [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-emerald-700 dark:[&_a]:text-emerald-400 dark:hover:[&_a]:text-emerald-300 [&_code]:rounded [&_code]:bg-slate-200 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_code]:font-mono dark:[&_code]:bg-slate-800"
        v-html="currentQuestion.explanation"
      ></div>
    </div>

    <!-- Actions -->
    <div class="mt-6 flex justify-end">
      <button
        v-if="!isAnswered"
        type="button"
        :disabled="!canSubmit"
        class="rounded-xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:focus-visible:ring-offset-slate-800"
        @click="submitAnswer"
      >
        Submit Answer
      </button>
      <button
        v-else
        type="button"
        class="rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 dark:focus-visible:ring-offset-slate-800"
        @click="handleNext"
      >
        {{ isLastQuestion ? 'See Results' : 'Next Question' }}
      </button>
    </div>
    </div>
  </div>
</template>
