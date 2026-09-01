import { SANDBOX_STORAGE_KEY } from './sandboxConstants'
import { parseSandboxInput } from './sandboxParse'

export function stageSandboxCode(code: string) {
  const { script, template } = parseSandboxInput(code)
  localStorage.setItem(SANDBOX_STORAGE_KEY, JSON.stringify({ script, template }))
}
