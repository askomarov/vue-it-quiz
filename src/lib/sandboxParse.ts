import { DEFAULT_SANDBOX_TEMPLATE } from './sandboxConstants'

function stripMarkdownFence(code: string): string {
  const trimmed = code.trim()
  const match = trimmed.match(/^```(?:typescript|ts|javascript|js|vue)?\n([\s\S]*?)```$/)
  return match ? match[1].trim() : trimmed
}

export function parseSandboxInput(raw: string) {
  const trimmed = stripMarkdownFence(raw)

  if (!trimmed.includes('<script')) {
    return { script: trimmed, template: DEFAULT_SANDBOX_TEMPLATE }
  }

  const script =
    trimmed.match(/<script[^>]*>([\s\S]*?)<\/script>/i)?.[1]?.trim() ?? ''
  const template =
    trimmed.match(/<template[^>]*>([\s\S]*?)<\/template>/i)?.[1]?.trim() ??
    DEFAULT_SANDBOX_TEMPLATE

  return { script, template }
}
