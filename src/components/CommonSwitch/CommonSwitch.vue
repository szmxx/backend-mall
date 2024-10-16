<template>
  <el-switch
    v-model="value"
    :active-value="options[0] === void 0 ? true : options[0]"
    :inactive-value="options[1] === void 0 ? false : options[1]"
  />
</template>

<script setup lang="ts">
import { PropType } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array as PropType<string[] | number[]>,
    default: () => [],
  },
})
defineOptions({
  name: 'CommonSwitch',
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
