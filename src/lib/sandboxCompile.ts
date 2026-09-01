import { transform } from 'sucrase'
import { SANDBOX_DEFAULT_TEMPLATE, SANDBOX_VUE_RUNTIME_URL } from './sandboxConstants'

function stripMarkdownFence(code: string): string {
  const trimmed = code.trim()
  const match = trimmed.match(/^```(?:typescript|ts|javascript|js|vue)?\n([\s\S]*?)```$/)
  return match ? match[1].trim() : trimmed
}

function rewriteVueImports(code: string): string {
  let result = code

  result = result.replace(/import\s+type\s*\{[^}]+\}\s*from\s*['"]vue['"]\s*;?\n?/g, '')
  result = result.replace(/import\s*\*\s*as\s+\w+\s*from\s*['"]vue['"]\s*;?\n?/g, '')
  result = result.replace(/import\s+\w+\s+from\s*['"]vue['"]\s*;?\n?/g, '')
  result = result.replace(
    /import\s*\{([^}]+)\}\s*from\s*['"]vue['"]\s*;?\n?/g,
    (_, imports: string) => `const { ${imports.trim()} } = Vue\n`,
  )

  return result.trim()
}

const VUE_REACTIVE_CALLEES = new Set([
  'ref',
  'reactive',
  'computed',
  'shallowRef',
  'shallowReactive',
  'readonly',
  'shallowReadonly',
  'customRef',
  'toRef',
  'toRefs',
])

function getVueImportNames(code: string): Set<string> {
  const names = new Set<string>()
  const importPattern = /const\s*\{([^}]+)\}\s*=\s*Vue/g

  for (const match of code.matchAll(importPattern)) {
    for (const part of match[1].split(',')) {
      const name = part.trim().split(/\s+as\s+/)[0]?.trim()
      if (name) names.add(name)
    }
  }

  return names
}

function hasExplicitReturn(code: string): boolean {
  return /^\s*return\s/m.test(code)
}

function collectAutoReturnBindings(code: string, vueImports: Set<string>): string[] {
  const bindings: string[] = []
  const seen = new Set<string>()

  for (const line of code.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('//')) continue

    const reactiveMatch = trimmed.match(
      /^(?:const|let|var)\s+(\w+)\s*=\s*(?:await\s+)?(\w+)\s*\(/,
    )
    if (reactiveMatch) {
      const [, name, callee] = reactiveMatch
      if (
        name &&
        callee &&
        VUE_REACTIVE_CALLEES.has(callee) &&
        !vueImports.has(name) &&
        !seen.has(name)
      ) {
        bindings.push(name)
        seen.add(name)
      }
      continue
    }

    const fnMatch = trimmed.match(/^function\s+(\w+)\s*\(/)
    if (fnMatch?.[1] && !vueImports.has(fnMatch[1]) && !seen.has(fnMatch[1])) {
      bindings.push(fnMatch[1])
      seen.add(fnMatch[1])
      continue
    }

    const arrowMatch = trimmed.match(
      /^(?:const|let|var)\s+(\w+)\s*=\s*(?:async\s+)?(?:\([^)]*\)|\w+)\s*=>/,
    )
    if (arrowMatch?.[1] && !vueImports.has(arrowMatch[1]) && !seen.has(arrowMatch[1])) {
      bindings.push(arrowMatch[1])
      seen.add(arrowMatch[1])
    }
  }

  return bindings
}

function appendAutoReturn(code: string): string {
  if (hasExplicitReturn(code)) return code

  const vueImports = getVueImportNames(code)
  const bindings = collectAutoReturnBindings(code, vueImports)
  if (bindings.length === 0) return code

  return `${code}\nreturn { ${bindings.join(', ')} }`
}

function transpileTypeScript(code: string): string {
  const { code: js } = transform(code, { transforms: ['typescript'] })
  return js
}

export function compileSandboxCode(scriptSource: string, templateSource: string): string {
  const userScript = appendAutoReturn(
    rewriteVueImports(transpileTypeScript(stripMarkdownFence(scriptSource))),
  )

  const template = JSON.stringify(
    templateSource.trim() || SANDBOX_DEFAULT_TEMPLATE,
  )

  const importMap = JSON.stringify({ imports: { vue: SANDBOX_VUE_RUNTIME_URL } })

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<script type="importmap">${importMap}</script>
<style>
  body { font-family: system-ui, sans-serif; margin: 0; padding: 1.5rem; color: #334155; }
  h2 { margin: 0; font-size: 1.5rem; font-weight: 600; }
</style>
</head>
<body>
<div id="app"></div>
<script type="module">
import * as Vue from 'vue'

function serializeArg(value) {
  if (value === undefined) return 'undefined'
  if (value === null) return 'null'
  if (typeof value === 'string') return value === '' ? '""' : value
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)
  if (value instanceof Error) return value.message
  try {
    return JSON.stringify(value, null, 2)
  } catch {
    return String(value)
  }
}

function post(level, args) {
  const normalized = args.length === 0 ? [undefined] : args
  parent.postMessage({
    type: 'sandbox-console',
    level,
    args: normalized.map(serializeArg),
  }, '*')
}

console.log = (...args) => post('log', args)
console.warn = (...args) => post('warn', args)
console.error = (...args) => post('error', args)
console.info = (...args) => post('info', args)

try {
  const { createApp } = Vue
  const app = createApp({
    setup() {
${userScript.split('\n').map((line) => `      ${line}`).join('\n')}
    },
    template: ${template},
  })

  app.config.errorHandler = (err) => {
    post('error', [err instanceof Error ? err.message : String(err)])
  }

  app.mount('#app')
} catch (err) {
  post('error', [err instanceof Error ? err.message : String(err)])
}
</script>
</body>
</html>`
}
