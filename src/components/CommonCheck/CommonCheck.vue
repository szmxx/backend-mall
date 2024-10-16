<template>
  <el-checkbox-group v-model="value">
    <el-checkbox
      v-for="item in options"
      :key="item.value"
      :label="item.value"
      :disabled="item.disabled"
      >{{ item.label }}
    </el-checkbox>
  </el-checkbox-group>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
interface CheckItem {
  label: string
  value: string | number
  disabled?: boolean
}
const props = defineProps({
  modelValue: {
    type: Array as PropType<(number | string)[]>,
    default: () => [],
  },
  options: {
    type: Array as PropType<CheckItem[]>,
    default: () => [],
  },
})
defineOptions({
  name: 'CommonCheck',
  inheritAttrs: true,
})

const emit = defineEmits(['update:modelValue'])
const value = computed({
  get() {
    return props.modelValue || []
  },
  set(value) {
    emit('update:modelValue', value)
  },
})
</script>
