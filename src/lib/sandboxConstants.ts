export const SANDBOX_STORAGE_KEY = 'vue-it-quiz:sandbox-code'

export const SANDBOX_VUE_RUNTIME_URL =
  'https://cdn.jsdelivr.net/npm/vue@3.5.42/dist/vue.esm-browser.prod.js'

export const DEFAULT_SANDBOX_SCRIPT = `import { ref } from 'vue'

const count = ref(0)
console.log('count:', count.value)
`

export const DEFAULT_SANDBOX_TEMPLATE = `<div>
  <h2>Vue 3 Sandbox</h2>
  <p v-if="count || count === 0">Count: {{ count }}</p>
</div>`

export const SANDBOX_DEFAULT_TEMPLATE = DEFAULT_SANDBOX_TEMPLATE
