export interface QuestionOption {
  id: string
  text: string
}

export interface Question {
  id: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  question: string
  code?: string
  codeLanguage?: string
  options: QuestionOption[]
  correctAnswerId: string
  explanation: string
  tags?: string[]
}

export interface Category {
  id: string
  name: string
  description: string
  icon: string
  questions: Question[]
}

export type ViewName = 'home' | 'quiz' | 'result'

export interface QuizState {
  category: Category | null
  questions: Question[]
  currentIndex: number
  selectedAnswerId: string | null
  isAnswered: boolean
  correctCount: number
  answers: AnswerRecord[]
}

export interface AnswerRecord {
  questionId: string
  selectedAnswerId: string
  correctAnswerId: string
  isCorrect: boolean
}
