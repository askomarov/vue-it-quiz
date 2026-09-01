<script setup lang="ts">
import { RouterLink } from 'vue-router'
import UCard from '@ui/UCard/UCard.vue'
import UIconBox from '@ui/UIconBox/UIconBox.vue'
import UBadge from '@ui/UBadge/UBadge.vue'
import UButton from '@ui/UButton/UButton.vue'
import { countByDifficulty } from '@/lib/categoryDisplay'
import type { Category } from '@/types'

defineProps<{
  category: Category
}>()

const emit = defineEmits<{
  startQuiz: [categoryId: string]
}>()
</script>

<template>
  <UCard hoverable class="group flex flex-col">
    <div class="mb-4 flex items-start justify-between">
      <UIconBox :icon="category.icon" />
      <UBadge variant="count">{{ category.questions.length }} questions</UBadge>
    </div>

    <RouterLink
      :to="`/category/${category.id}`"
      class="mb-2 text-xl font-semibold text-slate-900 transition-colors hover:text-sky-600 dark:text-white dark:hover:text-sky-400"
    >
      {{ category.name }}
    </RouterLink>
    <p class="mb-4 grow text-sm text-slate-600 dark:text-slate-400">
      {{ category.description }}
    </p>

    <div class="mb-5 flex flex-wrap gap-1.5">
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

    <UButton
      block
      :disabled="category.questions.length === 0"
      @click="emit('startQuiz', category.id)"
    >
      Start Quiz
    </UButton>
  </UCard>
</template>
