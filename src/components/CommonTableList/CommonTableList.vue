<template>
  <div class="flex flex-wrap" :class="[{ 'flex-col': direction === 'column' }]">
    <div
      v-for="col in columns"
      :key="col.prop"
      class="flex"
      :class="[
        {
          'justify-center': align === 'center',
          'justify-start': align === 'left',
          'justify-end': align === 'right',
          'flex-col': direction === 'row',
        },
      ]"
    >
      <div class="bg-color">{{ col.label }}</div>
      <div>
        <template v-if="'slot' in col">
          <table-slot :column="col" :data="data"></table-slot>
        </template>
        <template v-else>{{ data[col.prop as any] }}</template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { IColumnItem } from './types'
import TableSlot from './slot'
import { InstanceKey } from './constants'

defineProps({
  columns: {
    type: Array as PropType<IColumnItem[]>,
    default: () => [],
  },
  data: {
    type: Object as PropType<Record<string, unknown>>,
    default: () => {
      return {}
    },
  },
  align: {
    type: String,
    default: 'center',
  },
  direction: {
    type: String,
    default: 'row',
  },
})

defineOptions({
  name: 'CommonTableList',
  inheritAttrs: false,
})

provide(InstanceKey, getCurrentInstance()!)
</script>
