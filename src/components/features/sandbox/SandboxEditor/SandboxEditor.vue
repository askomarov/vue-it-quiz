<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { EditorState } from '@codemirror/state'
import { EditorView, keymap, lineNumbers } from '@codemirror/view'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands'
import { indentOnInput, syntaxHighlighting, defaultHighlightStyle } from '@codemirror/language'
import { html } from '@codemirror/lang-html'

const props = withDefaults(
  defineProps<{
    modelValue: string
    language?: 'typescript' | 'html'
  }>(),
  { language: 'typescript' },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const langExtension = computed(() =>
  props.language === 'html'
    ? html()
    : javascript({ typescript: true }),
)

const containerRef = ref<HTMLDivElement | null>(null)
let view: EditorView | null = null

function createEditor(initialDoc: string) {
  if (!containerRef.value) return

  view = new EditorView({
    parent: containerRef.value,
    state: EditorState.create({
      doc: initialDoc,
      extensions: [
        lineNumbers(),
        history(),
        indentOnInput(),
        syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
        langExtension.value,
        oneDark,
        keymap.of([...defaultKeymap, ...historyKeymap]),
        EditorView.lineWrapping,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            emit('update:modelValue', update.state.doc.toString())
          }
        }),
      ],
    }),
  })
}

function setDoc(value: string) {
  if (!view) return
  const current = view.state.doc.toString()
  if (current === value) return
  view.dispatch({
    changes: { from: 0, to: view.state.doc.length, insert: value },
  })
}

onMounted(() => {
  createEditor(props.modelValue)
})

watch(
  () => props.modelValue,
  (value) => setDoc(value),
)

onBeforeUnmount(() => {
  view?.destroy()
  view = null
})
</script>

<template>
  <div ref="containerRef" class="h-full overflow-hidden text-sm [&_.cm-editor]:h-full [&_.cm-scroller]:overflow-auto" />
</template>

<style scoped>
:deep(.cm-editor) {
  height: 100%;
}

:deep(.cm-focused) {
  outline: none;
}
</style>
