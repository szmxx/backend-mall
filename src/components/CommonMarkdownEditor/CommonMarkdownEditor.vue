<template>
  <MdEditor v-model="value" />
</template>

<script setup lang="ts">
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  options: {
    type: Object as PropType<Record<string, unknown>>,
    default: () => {
      return {}
    },
  },
})

defineOptions({
  name: 'CommonMarkdownEditor',
  inheritAttrs: false,
})
const emit = defineEmits(['update:modelValue'])
const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})
</script>
