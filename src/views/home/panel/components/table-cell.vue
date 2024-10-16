<template>
  <div class="w-full h-full">
    <div class="px-4 py-4">{{ title }}</div>
    <div class="flex gap-4 px-4 pb-4 flex-wrap">
      <div
        v-for="item in list"
        :key="item.key"
        class="flex-1 flex flex-col bg-color p-4 rounded gap-y-4 min-w-40"
      >
        <div class="text-hint text-lg">{{ item.name }}</div>
        <div
          v-for="cell in item.children"
          :key="cell.key"
          class="flex items-center gap-x-4 justify-between cursor-pointer"
        >
          <div class="ellipsis">{{ cell.name }}</div>
          <div class="text-danger">({{ map[cell.key] || 0 }})</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { DealList } from '../config'
defineProps({
  title: {
    type: String,
    default: '',
  },
  list: {
    type: Array as PropType<typeof DealList>,
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
