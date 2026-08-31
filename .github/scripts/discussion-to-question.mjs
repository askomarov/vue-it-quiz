#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'

const CATEGORY_META = {
  'Vue 3': {
    folder: 'vue',
    description: 'Composition API, reactivity, TypeScript integration, and internals',
    icon: 'layout',
  },
  Frontend: {
    folder: 'frontend',
    description: 'HTML, CSS, JavaScript, and modern frontend frameworks',
    icon: 'layout',
  },
  Backend: {
    folder: 'backend',
    description: 'Server-side development, APIs, and backend architecture',
    icon: 'server',
  },
  Git: {
    folder: 'git',
    description: 'Version control concepts and Git workflows',
    icon: 'git',
  },
  Database: {
    folder: 'database',
    description: 'SQL, NoSQL, and database design concepts',
    icon: 'database',
  },
  DevOps: {
    folder: 'devops',
    description: 'CI/CD, containers, deployment, and infrastructure',
    icon: 'cloud',
  },
}

const FIELD_LABELS = {
  category: 'Category',
  difficulty: 'Difficulty',
  question: 'Question',
  code: 'Code (optional)',
  codeLanguage: 'Code language (if code provided)',
  options: 'Options',
  answer: 'Correct Answer',
  explanation: 'Explanation',
  tags: 'Tags (optional)',
}

function parseDiscussionBody(body) {
  const sections = {}

  for (const part of body.split(/^### /m).filter(Boolean)) {
    const newlineIndex = part.indexOf('\n')
    if (newlineIndex === -1) continue

    const label = part.slice(0, newlineIndex).trim()
    const value = part.slice(newlineIndex + 1).trim()

    if (!value || value === '_No response_') continue
    sections[label] = value
  }

  return sections
}

function stripMarkdown(text) {
  return text
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .trim()
}

function tokenizeForSlug(text) {
  return stripMarkdown(text)
    .replace(/[()]/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function buildFileSlug(title, question, discussionNumber) {
  const cleanTitle = stripMarkdown(title).replace(/^\[question\]\s*/i, '').trim()

  if (cleanTitle) {
    const titleSlug = tokenizeForSlug(cleanTitle)
    if (titleSlug.length >= 2) return titleSlug.slice(0, 60)
  }

  const codeRefs = [...question.matchAll(/`([^`]+)`/g)].map((match) => match[1])
  for (const ref of codeRefs) {
    const refSlug = tokenizeForSlug(ref)
    if (refSlug.length >= 2) return refSlug.slice(0, 60)
  }

  const questionSlug = tokenizeForSlug(question.split('\n')[0])
  if (questionSlug.length >= 2) return questionSlug.slice(0, 60)

  return `question-${discussionNumber}`
}

function normalizeOptions(raw) {
  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => (line.startsWith('- ') ? line : `- ${line}`))
}

function formatTags(raw) {
  const tags = raw
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)

  if (tags.length === 0) return null
  return `[${tags.join(', ')}]`
}

function buildQuestionMarkdown(fields) {
  const category = fields.category
  const meta = CATEGORY_META[category]

  if (!meta) {
    throw new Error(`Unknown category: ${category}`)
  }

  const options = normalizeOptions(fields.options)
  if (options.length < 2) {
    throw new Error('At least 2 options are required')
  }

  const optionTexts = options.map((line) => line.replace(/^-\s*/, ''))
  const matchingOption = optionTexts.find(
    (option) => option.toLowerCase() === fields.answer.toLowerCase()
  )

  if (!matchingOption) {
    throw new Error('Correct answer must exactly match one of the options')
  }

  const tags = fields.tags ? formatTags(fields.tags) : null
  const frontmatter = [
    '---',
    `category: ${category}`,
    `description: ${meta.description}`,
    `icon: ${meta.icon}`,
    `difficulty: ${fields.difficulty}`,
    ...(tags ? [`tags: ${tags}`] : []),
    '---',
    '',
  ].join('\n')

  const sections = ['## Question', '', fields.question, '']

  if (fields.code?.trim()) {
    const language = fields.codeLanguage?.trim() || 'javascript'
    sections.push('## Code', '', '```' + language, fields.code.trim(), '```', '')
  }

  sections.push(
    '## Options',
    '',
    ...options,
    '',
    '## Answer',
    '',
    matchingOption,
    '',
    '## Explanation',
    '',
    fields.explanation,
    ''
  )

  return {
    folder: meta.folder,
    content: `${frontmatter}\n${sections.join('\n')}`,
  }
}

function resolveOutputPath(folder, baseSlug, discussionNumber) {
  let slug = baseSlug
  let filePath = path.join('src', 'questions', folder, `${slug}.md`)

  if (fs.existsSync(filePath)) {
    slug = `${baseSlug}-${discussionNumber}`
    filePath = path.join('src', 'questions', folder, `${slug}.md`)
  }

  if (fs.existsSync(filePath)) {
    throw new Error(`Question file already exists: ${filePath}`)
  }

  return filePath
}

function main() {
  const body = process.env.DISCUSSION_BODY
  const title = process.env.DISCUSSION_TITLE || ''
  const discussionNumber = process.env.DISCUSSION_NUMBER

  if (!body) throw new Error('DISCUSSION_BODY is required')
  if (!discussionNumber) throw new Error('DISCUSSION_NUMBER is required')

  const sections = parseDiscussionBody(body)
  const fields = {
    category: sections[FIELD_LABELS.category],
    difficulty: sections[FIELD_LABELS.difficulty],
    question: sections[FIELD_LABELS.question],
    code: sections[FIELD_LABELS.code],
    codeLanguage: sections[FIELD_LABELS.codeLanguage],
    options: sections[FIELD_LABELS.options],
    answer: sections[FIELD_LABELS.answer],
    explanation: sections[FIELD_LABELS.explanation],
    tags: sections[FIELD_LABELS.tags],
  }

  const missing = Object.entries({
    category: fields.category,
    difficulty: fields.difficulty,
    question: fields.question,
    options: fields.options,
    answer: fields.answer,
    explanation: fields.explanation,
  })
    .filter(([, value]) => !value)
    .map(([key]) => key)

  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(', ')}`)
  }

  const { folder, content } = buildQuestionMarkdown(fields)
  const baseSlug = buildFileSlug(title, fields.question, discussionNumber)
  const filePath = resolveOutputPath(folder, baseSlug, discussionNumber)

  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, content, 'utf8')

  const outputPath = process.env.GITHUB_OUTPUT
  if (outputPath) {
    fs.appendFileSync(
      outputPath,
      `file_path=${filePath}\nfile_slug=${path.basename(filePath, '.md')}\n`
    )
  }

  console.log(`Created ${filePath}`)
}

try {
  main()
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error))
  process.exit(1)
}
