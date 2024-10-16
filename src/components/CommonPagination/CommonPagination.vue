<template>
  <el-pagination
    v-model:current-page="page"
    v-model:page-size="size"
    background
    :layout="bool ? 'total, prev, pager, next' : layout"
    :total="total"
    :pager-count="max"
    :page-sizes="pageSizes"
    @size-change="onSize"
    @current-change="onCurrent"
  />
</template>

<script setup lang="ts">
import { isMobileDevice } from '@/utils'
const props = defineProps({
  total: {
    type: Number,
    default: 100,
  },
  size: {
    type: Number,
    default: 10,
  },
  page: {
    type: Number,
    default: 1,
  },
  layout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper',
  },
  pageSizes: {
    type: Array as PropType<number[]>,
    default: () => [10, 15, 20, 25],
  },
})

const emit = defineEmits(['pagination', 'update:size', 'update:page'])
const bool = isMobileDevice()
const max = ref(bool ? 3 : 5)
const page = computed({
  get() {
    return props.page
  },
  set(newVal) {
    emit('update:page', newVal)
  },
})

const size = computed({
  get() {
    return props.size
  },
  set(newVal) {
    emit('update:size', newVal)
  },
})

function onCurrent(page: number) {
  emit('pagination', {
    page: page,
    size: size.value,
  })
}
function onSize(size: number) {
  emit('pagination', {
    page: page.value,
    size: size,
  })
}
</script>
