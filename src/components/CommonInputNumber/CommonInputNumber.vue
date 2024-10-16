<template>
  <el-input-number
    v-bind="$attrs"
    v-model="value"
    :min="min"
    :step="step"
    :controls-position="position as any"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
  min: {
    type: Number,
    default: 0,
  },
  step: {
    type: Number,
    default: 1,
  },
  position: {
    type: String,
    default: 'right',
  },
})
defineOptions({
  name: 'CommonInputNumber',
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
