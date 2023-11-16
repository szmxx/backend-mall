<template>
  <div class="h-[60px] flex items-center p-4 border-b">
    <div>{{ title }}</div>
  </div>
</template>

<script setup lang="ts">
import useStore from '@/store/app'
const { config } = useStore()
const title = config?.title
</script>
