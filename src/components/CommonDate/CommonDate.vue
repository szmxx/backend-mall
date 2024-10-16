<template>
  <el-date-picker
    v-model="value"
    class="w-full!"
    :type="type"
    :placeholder="placeholder"
  />
</template>

<script setup lang="ts">
import { PropType } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '请选择',
  },
  type: {
    type: String as PropType<'date' | 'datetime'>,
    default: 'date',
  },
})

defineOptions({
  name: 'CommonRadio',
  inheritAttrs: true,
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
