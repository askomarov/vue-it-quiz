import { SANDBOX_STORAGE_KEY } from './sandboxConstants'

export function stageSandboxCode(code: string) {
  localStorage.setItem(SANDBOX_STORAGE_KEY, code)
}
