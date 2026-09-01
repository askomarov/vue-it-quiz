<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuiz } from '@/composables/useQuiz'
import UPageContainer from '@ui/UPageContainer/UPageContainer.vue'
import UCard from '@ui/UCard/UCard.vue'
import UButton from '@ui/UButton/UButton.vue'

const props = defineProps<{
  categoryId: string
}>()

const router = useRouter()

const {
  currentCategory,
  correctCount,
  incorrectCount,
  totalQuestions,
  scorePercent,
  resetQuiz,
  exitQuiz,
} = useQuiz()

onMounted(() => {
  if (
    !currentCategory.value ||
    currentCategory.value.id !== props.categoryId ||
    totalQuestions.value === 0
  ) {
    router.replace(`/category/${props.categoryId}`)
  }
})

const scoreColor = computed(() => {
  if (scorePercent.value >= 80) return 'text-emerald-500'
  if (scorePercent.value >= 50) return 'text-amber-500'
  return 'text-rose-500'
})

const scoreLabel = computed(() => {
  if (scorePercent.value >= 90) return 'Excellent!'
  if (scorePercent.value >= 70) return 'Great job!'
  if (scorePercent.value >= 50) return 'Good effort!'
  return 'Keep practicing!'
})

const ringColor = computed(() => {
  if (scorePercent.value >= 80) return 'text-emerald-500'
  if (scorePercent.value >= 50) return 'text-amber-500'
  return 'text-rose-500'
})

const circumference = 2 * Math.PI * 52
const dashOffset = computed(
  () => circumference - (scorePercent.value / 100) * circumference
)

function handleTryAgain() {
  resetQuiz()
  router.push(`/category/${props.categoryId}/quiz`)
}

function handleHome() {
  exitQuiz()
  router.push('/')
}
</script>

<template>
  <UPageContainer max-width="2xl">
    <UCard padding="lg" class="text-center sm:p-12">
      <p class="mb-2 text-sm font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {{ currentCategory?.name }} — Results
      </p>
      <h1 class="mb-8 text-3xl font-bold text-slate-900 dark:text-white">
        {{ scoreLabel }}
      </h1>

      <div class="mb-8 flex justify-center">
        <div class="relative h-36 w-36">
          <svg class="h-full w-full -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="52"
              stroke-width="10"
              class="fill-none stroke-slate-200 dark:stroke-slate-700"
            />
            <circle
              cx="60"
              cy="60"
              r="52"
              stroke-width="10"
              stroke-linecap="round"
              class="fill-none transition-all duration-1000 ease-out"
              :class="ringColor"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="dashOffset"
            />
          </svg>
          <div class="absolute inset-0 flex flex-col items-center justify-center">
            <span class="text-4xl font-bold" :class="scoreColor">{{ scorePercent }}%</span>
            <span class="text-xs font-medium text-slate-500 dark:text-slate-400">score</span>
          </div>
        </div>
      </div>

      <div class="mb-8 grid grid-cols-2 gap-4">
        <div class="rounded-xl bg-emerald-50 p-4 dark:bg-emerald-900/20">
          <div class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {{ correctCount }}
          </div>
          <div class="text-sm font-medium text-slate-600 dark:text-slate-400">Correct</div>
        </div>
        <div class="rounded-xl bg-rose-50 p-4 dark:bg-rose-900/20">
          <div class="text-2xl font-bold text-rose-600 dark:text-rose-400">
            {{ incorrectCount }}
          </div>
          <div class="text-sm font-medium text-slate-600 dark:text-slate-400">Incorrect</div>
        </div>
      </div>

      <p class="mb-8 text-sm text-slate-500 dark:text-slate-400">
        You answered {{ correctCount }} out of {{ totalQuestions }} questions correctly.
      </p>

      <div class="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <UButton size="lg" @click="handleTryAgain">
          Try Again
        </UButton>
        <UButton variant="secondary" size="lg" @click="handleHome">
          Back to Categories
        </UButton>
      </div>
    </UCard>
  </UPageContainer>
</template>
