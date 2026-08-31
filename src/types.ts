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

export interface AnswerRecord {
  questionId: string
  selectedAnswerId: string
  correctAnswerId: string
  isCorrect: boolean
}
