<script setup lang="ts">
import { ref } from 'vue'
import HomeView from './components/HomeView.vue'
import QuestionView from './components/QuestionView.vue'
import ResultView from './components/ResultView.vue'
import { useQuiz } from './composables/useQuiz'
import type { Category, ViewName } from './types'

const { startQuiz, exitQuiz } = useQuiz()

const currentView = ref<ViewName>('home')

function handleStart(category: Category) {
  startQuiz(category)
  currentView.value = 'quiz'
}

function handleFinish() {
  currentView.value = 'result'
}

function handleHome() {
  exitQuiz()
  currentView.value = 'home'
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900">
    <HomeView v-if="currentView === 'home'" @start="handleStart" />
    <QuestionView v-else-if="currentView === 'quiz'" @finish="handleFinish" @home="handleHome" />
    <ResultView v-else-if="currentView === 'result'" @home="handleHome" />
  </div>
</template>
