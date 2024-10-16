<template>
  <el-dialog
    v-model="visible"
    align-center
    :title="title"
    :width="bool ? '90%' : width"
  >
    <slot></slot>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" :loading="loading" @click="onConfirm">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { isMobileDevice } from '@/utils'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '30%',
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})
const bool = isMobileDevice()
const emit = defineEmits(['update:modelValue', 'confirm'])
const visible = computed({
  get() {
    return props.modelValue
  },
  set(newVal: boolean) {
    emit('update:modelValue', newVal)
  },
})

function onConfirm() {
  emit('confirm')
}
</script>
