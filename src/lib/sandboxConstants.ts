export const SANDBOX_STORAGE_KEY = 'vue-it-quiz:sandbox-code'

export const SANDBOX_VUE_RUNTIME_URL =
  'https://cdn.jsdelivr.net/npm/vue@3.5.42/dist/vue.esm-browser.prod.js'

export const DEFAULT_SANDBOX_CODE = `import { ref } from 'vue'

const count = ref(0)
console.log('count:', count.value)
count.value = 1
console.log('count:', count.value)
`

export const SANDBOX_DEFAULT_TEMPLATE = '<h2>Vue 3 Sandbox</h2>'
