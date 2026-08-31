import { parse } from 'marked'
import type { Question, QuestionOption, Category } from '../types'

interface ParsedMarkdown {
  frontmatter: Record<string, unknown>
  body: string
}

function extractFrontmatter(content: string): ParsedMarkdown {
  const fmMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/)
  if (!fmMatch) {
    return { frontmatter: {}, body: content }
  }

  const fmText = fmMatch[1]
  const body = fmMatch[2]
  const frontmatter: Record<string, unknown> = {}

  for (const line of fmText.split('\n')) {
    const match = line.match(/^(\w+):\s*(.*)$/)
    if (!match) continue
    const key = match[1]
    let value: unknown = match[2].trim()

    if (typeof value === 'string' && value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    }

    frontmatter[key] = value
  }

  return { frontmatter, body }
}

interface ParsedSections {
  question: string
  code?: string
  codeLanguage?: string
  options: string[]
  answer: string
  explanation: string
}

function extractSections(body: string): ParsedSections {
  const sections: Record<string, string> = {}
  const lines = body.split('\n')
  let currentHeader = ''
  let currentContent: string[] = []

  for (const line of lines) {
    const headerMatch = line.match(/^##\s+(.*)$/)
    if (headerMatch) {
      if (currentHeader) {
        sections[currentHeader] = currentContent.join('\n').trim()
      }
      currentHeader = headerMatch[1].trim().toLowerCase()
      currentContent = []
    } else {
      currentContent.push(line)
    }
  }
  if (currentHeader) {
    sections[currentHeader] = currentContent.join('\n').trim()
  }

  const codeMatch = sections['code']?.match(/^```(\w*)\n([\s\S]*?)\n```$/)
  const code = codeMatch ? codeMatch[2].trim() : undefined
  const codeLanguage = codeMatch && codeMatch[1] ? codeMatch[1] : undefined

  const options = (sections['options'] || '')
    .split('\n')
    .map((line) => line.replace(/^-\s*/, '').trim())
    .filter(Boolean)

  return {
    question: (sections['question'] || '').trim(),
    code,
    codeLanguage,
    options,
    answer: (sections['answer'] || '').trim(),
    explanation: (sections['explanation'] || '').trim(),
  }
}

function markdownToHtml(markdown: string): string {
  const html = parse(markdown, { async: false }) as string
  return html.replace(
    /<a href="(https?:\/\/[^"]+)"/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer"'
  )
}

let questionIdCounter = 0
let optionIdCounter = 0

function generateQuestionId(): string {
  questionIdCounter += 1
  return `q-${questionIdCounter}`
}

function generateOptionId(): string {
  optionIdCounter += 1
  return `opt-${optionIdCounter}`
}

function parseQuestionFile(content: string, fileName: string): Question | null {
  try {
    const { frontmatter, body } = extractFrontmatter(content)
    const sections = extractSections(body)

    if (!sections.question || sections.options.length < 2 || !sections.answer) {
      console.warn(`Skipping invalid question file: ${fileName}`)
      return null
    }

    const options: QuestionOption[] = sections.options.map((text) => ({
      id: generateOptionId(),
      text,
    }))

    const correctText = sections.answer
    const correctOption = options.find(
      (opt) => opt.text.toLowerCase() === correctText.toLowerCase()
    )
    if (!correctOption) {
      console.warn(`Correct answer not found in options for: ${fileName}`)
      return null
    }

    const difficulty = (frontmatter.difficulty as string) || 'medium'

    return {
      id: generateQuestionId(),
      category: (frontmatter.category as string) || 'Uncategorized',
      difficulty: (['easy', 'medium', 'hard'].includes(difficulty)
        ? difficulty
        : 'medium') as Question['difficulty'],
      question: markdownToHtml(sections.question),
      code: sections.code,
      codeLanguage: sections.codeLanguage,
      options,
      correctAnswerId: correctOption.id,
      explanation: markdownToHtml(sections.explanation),
      tags: (frontmatter.tags as string[]) || undefined,
    }
  } catch (err) {
    console.error(`Error parsing question file ${fileName}:`, err)
    return null
  }
}

export function parseQuestions(rawFiles: Record<string, string>): Category[] {
  questionIdCounter = 0
  optionIdCounter = 0

  const allQuestions: Question[] = []
  const categoryMap = new Map<string, { description: string; icon: string }>()

  for (const [fileName, content] of Object.entries(rawFiles)) {
    const question = parseQuestionFile(content, fileName)
    if (question) {
      allQuestions.push(question)

      const { frontmatter } = extractFrontmatter(content)
      const catName = question.category
      if (!categoryMap.has(catName)) {
        categoryMap.set(catName, {
          description: (frontmatter.description as string) || '',
          icon: (frontmatter.icon as string) || 'circle',
        })
      }
    }
  }

  const categories: Category[] = []
  for (const [catName, meta] of categoryMap) {
    const questions = allQuestions.filter((q) => q.category === catName)
    categories.push({
      id: catName.toLowerCase().replace(/\s+/g, '-'),
      name: catName,
      description: meta.description,
      icon: meta.icon,
      questions,
    })
  }

  return categories
}
