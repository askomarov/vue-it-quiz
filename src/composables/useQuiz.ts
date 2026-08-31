import { ref, computed } from 'vue'
import type { Category, Question, AnswerRecord } from '../types'

const QUESTIONS_PER_QUIZ = 10

function shuffle<T>(array: T[]): T[] {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

const currentCategory = ref<Category | null>(null)
const quizQuestions = ref<Question[]>([])
const currentIndex = ref(0)
const selectedAnswerId = ref<string | null>(null)
const isAnswered = ref(false)
const answers = ref<AnswerRecord[]>([])
const correctCount = ref(0)

const currentQuestion = computed<Question | null>(() => {
  if (currentIndex.value >= quizQuestions.value.length) return null
  return quizQuestions.value[currentIndex.value]
})

const totalQuestions = computed(() => quizQuestions.value.length)

const isLastQuestion = computed(
  () => currentIndex.value === quizQuestions.value.length - 1
)

const progressPercent = computed(() => {
  if (totalQuestions.value === 0) return 0
  return Math.round(((currentIndex.value + (isAnswered.value ? 1 : 0)) / totalQuestions.value) * 100)
})

const scorePercent = computed(() => {
  if (totalQuestions.value === 0) return 0
  return Math.round((correctCount.value / totalQuestions.value) * 100)
})

const incorrectCount = computed(
  () => totalQuestions.value - correctCount.value
)

function startQuiz(category: Category) {
  currentCategory.value = category
  quizQuestions.value = shuffle(category.questions).slice(0, QUESTIONS_PER_QUIZ)
  currentIndex.value = 0
  selectedAnswerId.value = null
  isAnswered.value = false
  answers.value = []
  correctCount.value = 0
}

function selectAnswer(optionId: string) {
  if (isAnswered.value) return
  selectedAnswerId.value = optionId
}

function submitAnswer() {
  if (!selectedAnswerId.value || !currentQuestion.value || isAnswered.value) return

  const isCorrect = selectedAnswerId.value === currentQuestion.value.correctAnswerId
  const record: AnswerRecord = {
    questionId: currentQuestion.value.id,
    selectedAnswerId: selectedAnswerId.value,
    correctAnswerId: currentQuestion.value.correctAnswerId,
    isCorrect,
  }
  answers.value.push(record)
  if (isCorrect) correctCount.value++
  isAnswered.value = true
}

function nextQuestion() {
  if (!isAnswered.value) return
  if (currentIndex.value < quizQuestions.value.length - 1) {
    currentIndex.value++
    selectedAnswerId.value = null
    isAnswered.value = false
  }
}

function resetQuiz() {
  if (currentCategory.value) {
    startQuiz(currentCategory.value)
  }
}

function exitQuiz() {
  currentCategory.value = null
  quizQuestions.value = []
  currentIndex.value = 0
  selectedAnswerId.value = null
  isAnswered.value = false
  answers.value = []
  correctCount.value = 0
}

export function useQuiz() {
  return {
    currentCategory,
    quizQuestions,
    currentIndex,
    selectedAnswerId,
    isAnswered,
    answers,
    correctCount,
    incorrectCount,
    currentQuestion,
    totalQuestions,
    isLastQuestion,
    progressPercent,
    scorePercent,
    startQuiz,
    selectAnswer,
    submitAnswer,
    nextQuestion,
    resetQuiz,
    exitQuiz,
  }
}
