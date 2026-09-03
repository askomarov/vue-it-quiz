<script setup lang="ts">
import { computed } from 'vue'
import UButton from '@ui/UButton/UButton.vue'
import UBadge from '@ui/UBadge/UBadge.vue'
import { categories, getTotalQuestionCount } from '@/lib/questionLoader'
import { ADD_QUESTION_URL } from '@/lib/siteLinks'

const totalQuestions = computed(() => getTotalQuestionCount())

function scrollToCategories() {
  document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section class="py-10 text-center min-h-[min(100vh,600px)] flex flex-col justify-center">
    <h1
      class="text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white"
    >
      Test your knowledge across different IT domains. Pick a category and start answering questions.
    </h1>

    <div class="mt-6 flex flex-wrap items-center justify-center gap-3">
      <UButton variant="primary" size="lg" @click="scrollToCategories">
        Browse categories
        <svg
          class="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </UButton>
      <UButton
        as="a"
        :href="ADD_QUESTION_URL"
        variant="secondary"
        size="lg"
        target="_blank"
        rel="noopener noreferrer"
      >
        Add your question
      </UButton>
    </div>

    <div class="mt-6 flex flex-wrap items-center justify-center gap-3">
      <UBadge variant="stat">
        <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
        {{ categories.length }} categories · {{ totalQuestions }} questions ready
      </UBadge>
    </div>
  </section>
</template>
