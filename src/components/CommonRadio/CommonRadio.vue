<template>
  <el-radio-group v-model="value">
    <el-radio
      v-for="item in options"
      :key="item.value"
      :label="item.value"
      :disabled="item.disabled"
      >{{ item.label }}
    </el-radio>
  </el-radio-group>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
interface RadioItem {
  label: string
  value: string | number
  disabled?: boolean
}
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  options: {
    type: Array as PropType<RadioItem[]>,
    default: () => [],
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
