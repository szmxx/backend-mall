<template>
  <el-table
    ref="tableRef"
    :border="border"
    :data="data"
    :max-height="maxTableHeight"
    v-bind="$attrs"
    highlight-current-row
  >
    <column-item
      v-for="column in columns"
      :key="column.prop"
      :column="column"
      :align="align"
    ></column-item>
    <template #empty>
      <slot name="empty"></slot>
    </template>
  </el-table>
  <common-loading v-show="loading"></common-loading>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { InstanceKey } from './constants'
import { IColumnItem } from './types'

defineOptions({
  name: 'CommonTable',
  inheritAttrs: false,
})
const props = defineProps({
  data: {
    type: Array as PropType<Record<string, unknown>[]>,
    default: () => [],
  },
  columns: {
    type: Array as PropType<IColumnItem[]>,
    default: () => [],
  },
  maxHeight: {
    type: Number,
    default: 0,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  align: {
    type: String,
    default: 'center',
  },
  border: {
    type: Boolean,
    default: true,
  },
})
provide(InstanceKey, getCurrentInstance()!)

const maxTableHeight = ref()
onMounted(() => {
  // 等待其他布局完成
  setTimeout(() => {
    resize()
  }, 100)
})

useEventListener('resize', resize)

const tableRef = ref()

function resize() {
  let height = 0

  if (props.maxHeight !== 0) {
    height = props.maxHeight
  } else {
    const parent = tableRef?.value?.$el?.parentElement
    if (parent) {
      height = parent?.getBoundingClientRect?.()?.height || 0
      const { paddingTop, paddingBottom } = getComputedStyle(parent)
      height =
        parseFloat(String(height)) -
        parseFloat(paddingTop) -
        parseFloat(paddingBottom)
    }
  }
  if (height > 0) {
    nextTick(() => {
      maxTableHeight.value = height || 0
    })
  }
}

function getSelection() {
  return tableRef?.value?.getSelectionRows?.() || []
}

defineExpose({
  getSelection: getSelection,
})
</script>
