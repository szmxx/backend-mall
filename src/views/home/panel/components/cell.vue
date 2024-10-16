<template>
  <div class="w-full h-full">
    <div class="px-4 py-4">{{ title }}</div>
    <div class="flex px-4 pb-4 gap-4 flex-wrap">
      <div
        v-for="item in list"
        :key="item.key"
        class="flex-1 center flex-col bg-color p-4 gap-y-4 rounded cursor-pointer"
      >
        <div class="whitespace-nowrap">{{ item.name }}</div>
        <div class="text-6 text-danger">
          {{ formatMoney(map[item.key] || 0) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { formatMoney } from '@/utils'

defineProps({
  title: {
    type: String,
    default: '',
  },
  list: {
    type: Array as PropType<Record<string, string>[]>,
    default: () => [],
  },
  map: {
    type: Object as PropType<Record<string, unknown>>,
    default: () => {
      return {}
    },
  },
})
</script>
