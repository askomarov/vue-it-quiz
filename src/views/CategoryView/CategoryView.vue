<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { getCategoryById } from '@/lib/questionLoader'
import { countByDifficulty } from '@/lib/categoryDisplay'
import UPageContainer from '@ui/UPageContainer/UPageContainer.vue'
import UBackLink from '@ui/UBackLink/UBackLink.vue'
import UCard from '@ui/UCard/UCard.vue'
import UIconBox from '@ui/UIconBox/UIconBox.vue'
import UBadge from '@ui/UBadge/UBadge.vue'
import UButton from '@ui/UButton/UButton.vue'

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

function startQuiz() {
  router.push(`/category/${props.categoryId}/quiz`)
}
</script>

<template>
  <UPageContainer v-if="category" max-width="2xl">
    <UBackLink class="mb-8 block" />

    <UCard padding="lg">
      <div class="mb-6 flex items-start justify-between">
        <UIconBox :icon="category.icon" size="sm" />
        <UBadge variant="count">{{ category.questions.length }} questions</UBadge>
      </div>

      <h1 class="mb-3 text-3xl font-bold text-slate-900 dark:text-white">
        {{ category.name }}
      </h1>
      <p class="mb-6 text-slate-600 dark:text-slate-400">
        {{ category.description }}
      </p>

      <div class="mb-8 flex flex-wrap gap-1.5">
        <UBadge
          v-if="countByDifficulty(category.questions).easy"
          variant="difficulty"
          difficulty="easy"
        >
          {{ countByDifficulty(category.questions).easy }} easy
        </UBadge>
        <UBadge
          v-if="countByDifficulty(category.questions).medium"
          variant="difficulty"
          difficulty="medium"
        >
          {{ countByDifficulty(category.questions).medium }} medium
        </UBadge>
        <UBadge
          v-if="countByDifficulty(category.questions).hard"
          variant="difficulty"
          difficulty="hard"
        >
          {{ countByDifficulty(category.questions).hard }} hard
        </UBadge>
      </div>

      <UButton block :disabled="category.questions.length === 0" @click="startQuiz">
        Start Quiz
      </UButton>
    </UCard>
  </UPageContainer>
</template>
