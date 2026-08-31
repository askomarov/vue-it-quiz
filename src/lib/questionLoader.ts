import { parseQuestions } from './markdownParser'
import type { Category } from '../types'

const questionFiles = import.meta.glob('../questions/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const rawFiles: Record<string, string> = {}
for (const [path, content] of Object.entries(questionFiles)) {
  const fileName = path.split('/').pop() || path
  rawFiles[fileName] = content
}

export const categories: Category[] = parseQuestions(rawFiles)

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id)
}

export function getTotalQuestionCount(): number {
  return categories.reduce((sum, c) => sum + c.questions.length, 0)
}
