import { createRouter, createWebHistory } from 'vue-router'
import QuizLayout from './components/QuizLayout.vue'
import HomeView from './components/HomeView.vue'
import CategoryView from './components/CategoryView.vue'
import QuestionView from './components/QuestionView.vue'
import ResultView from './components/ResultView.vue'
import SandboxView from './components/SandboxView.vue'
import { getCategoryById } from './lib/questionLoader'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: QuizLayout,
      children: [
        { path: '', name: 'home', component: HomeView },
        {
          path: 'category/:categoryId',
          name: 'category',
          component: CategoryView,
          props: true,
          beforeEnter: (to) =>
            getCategoryById(String(to.params.categoryId)) ? true : '/',
        },
        {
          path: 'category/:categoryId/quiz',
          name: 'quiz',
          component: QuestionView,
          props: true,
          beforeEnter: (to) =>
            getCategoryById(String(to.params.categoryId)) ? true : '/',
        },
        {
          path: 'category/:categoryId/result',
          name: 'result',
          component: ResultView,
          props: true,
          beforeEnter: (to) =>
            getCategoryById(String(to.params.categoryId)) ? true : '/',
        },
      ],
    },
    { path: '/sandbox', name: 'sandbox', component: SandboxView },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})
