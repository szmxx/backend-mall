<template>
  <el-input
    v-bind="$attrs"
    v-model="value"
    :placeholder="placeholder"
    :clearable="clearable"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '请输入内容',
  },
  clearable: {
    type: Boolean,
    default: true,
  },
})
defineOptions({
  name: 'CommonInput',
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
