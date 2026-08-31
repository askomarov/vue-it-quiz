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

function transpileTypeScript(code: string): string {
  const { code: js } = transform(code, { transforms: ['typescript'] })
  return js
}

export function compileSandboxCode(source: string): string {
  const cleaned = stripMarkdownFence(source)
  const withoutTypes = transpileTypeScript(cleaned)
  const userScript = rewriteVueImports(withoutTypes)

  const importMap = JSON.stringify({ imports: { vue: SANDBOX_VUE_RUNTIME_URL } })
  const template = JSON.stringify(SANDBOX_DEFAULT_TEMPLATE)

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
