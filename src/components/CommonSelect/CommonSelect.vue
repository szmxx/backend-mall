<template>
  <el-select
    v-bind="$attrs"
    v-model="value"
    :placeholder="placeholder"
    :clearable="clearable"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled="item.disabled"
    />
  </el-select>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
interface SelectItem {
  label: string
  value: string | number
  disabled?: boolean
}
const props = defineProps({
  modelValue: {
    type: [Number, String, Array],
    default: '',
  },
  options: {
    type: Array as PropType<SelectItem[]>,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: '请选择内容',
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  number: {
    type: Boolean,
    default: false,
  },
})
defineOptions({
  name: 'CommonSelect',
  inheritAttrs: true,
})
const emit = defineEmits(['update:modelValue'])
const value = computed({
  get() {
    if (props.number) {
      return parseInt(props.modelValue as string) || ''
    }
    return props.modelValue
  },
  set(value) {
    if (props.number) {
      emit('update:modelValue', parseInt(value as string) || '')
    } else {
      emit('update:modelValue', value)
    }
  },
})
</script>
