<template>
  <div class="flex flex-col w-full h-full">
    <Toolbar
      class="border-b"
      :editor="editorRef"
      :default-config="toolbarConfig"
      :mode="mode"
    />
    <Editor
      v-model="valueHtml"
      :default-config="editorConfig"
      :mode="mode"
      class="flex-1"
      @on-change="changeFn"
      @on-created="createFn"
    />
  </div>
</template>

<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { PropType } from 'vue'
import { IToolbarConfig } from '@wangeditor/editor'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

import { Boot } from '@wangeditor/editor'
import markdownModule from '@wangeditor/plugin-md'
Boot.registerModule(markdownModule)

const props = defineProps({
  mode: {
    type: String,
    default: 'default',
  },
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '请输入内容',
  },
  toolbarConfig: {
    type: Object as PropType<IToolbarConfig>,
    default: () => {
      return {
        excludeKeys: ['group-video', 'insertVideo', 'codeBlock', 'fullScreen'],
      }
    },
  },
})

const emit = defineEmits(['update:modelValue'])
defineExpose({
  clear: clear,
})
// editor ref
const editorRef = shallowRef()
// 内容 HTML
const valueHtml = ref(props.modelValue)

const editorConfig = { placeholder: props.placeholder }

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const changeFn = useDebounceFn(debounceChange, 500)
function debounceChange() {
  const res = editorRef.value.getHtml()
  if (res !== '<p><br></p>') {
    emit('update:modelValue', res.replace(/^<p>(.*)<\/p>$/, '$1'))
  } else {
    emit('update:modelValue', '')
  }
}
function createFn(editor: unknown) {
  editorRef.value = editor
}
function clear() {
  valueHtml.value = ''
}
</script>

<style lang="scss" scoped>
:deep(.w-e-scroll > div) {
  @apply py-2 px-3;
}

:deep(.w-e-scroll p) {
  @apply my-0;
}

:deep(.w-e-text-placeholder) {
  @apply top-3 left-3 line-height-1em;
}

:deep(.w-e-text-container),
:deep(.w-e-bar),
:deep(.w-e-select-list),
:deep(.w-e-bar-item button),
:deep(.w-e-bar-item-menus-container),
:deep(.w-e-drop-panel),
:deep(.w-e-modal),
:deep(.w-e-modal input),
:deep(.w-e-panel-content-table) {
  @apply bg-default text-color border-color;
}

:deep(.w-e-modal button) {
  @apply bg-primary text-color border-color text-white;
}

:deep(.w-e-text-container blockquote) {
  @apply bg-color border-primary;
}

:deep(.w-e-panel-content-color li) {
  @apply border-color;
}

:deep(.w-e-panel-content-color li.active) {
  @apply bg-primary;
}

:deep(.w-e-text-container table th) {
  border-right: 0;

  @apply bg-primary/50 text-white border-color;
}

:deep(.w-e-text-container [data-selected='true']) {
  box-shadow: 0 0 0 2px rgb(var(--color-primary));
}

:deep(.w-e-bar svg) {
  fill: rgb(var(--text-primary));
}

:deep(.w-e-bar-item .disabled svg) {
  fill: rgb(var(--text-hint));
}

:deep(.w-e-bar-item .disabled) {
  @apply text-hint;
}

:deep(.w-e-bar-divider) {
  @apply hidden;
}

:deep(.w-e-bar-item button:hover),
:deep(.w-e-select-list ul li:hover) {
  @apply bg-color text-color;
}

:deep(.w-e-select-list ul li.selected),
:deep(.w-e-bar-item button.active) {
  @apply bg-primary rounded text-white;
}

:deep(.w-e-text-container h1, h2, h3, h4, h5, h6) {
  @apply my-4;
}

:deep(h1) {
  @apply text-[32px];
}

:deep(h2) {
  @apply text-[28px];
}

:deep(h3) {
  @apply text-[24px];
}

:deep(h4) {
  @apply text-[20px];
}

:deep(h5) {
  @apply text-[16px];
}

:deep(h6) {
  @apply text-[12px];
}
</style>
