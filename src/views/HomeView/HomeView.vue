<script setup lang="ts">
import { useRouter } from 'vue-router'
import { categories } from '@/lib/questionLoader'
import UPageContainer from '@ui/UPageContainer/UPageContainer.vue'
import HomeHero from '@shared/HomeHero/HomeHero.vue'
import CategoryCard from '@features/quiz/CategoryCard/CategoryCard.vue'

const router = useRouter()

function startQuiz(categoryId: string) {
  router.push(`/category/${categoryId}/quiz`)
}
</script>

<template>
  <UPageContainer>
    <HomeHero />

    <div id="categories" class="grid py-10 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <CategoryCard
        v-for="cat in categories"
        :key="cat.id"
        :category="cat"
        @start-quiz="startQuiz"
      />
    </div>
  </UPageContainer>
</template>
