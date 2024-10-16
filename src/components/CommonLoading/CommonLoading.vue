<template>
  <div
    class="absolute w-full h-full z-9 gap-y-4 center flex-col bg-default/90 top-0 left-0"
  >
    <div class="loading"></div>
    <div>{{ message }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  message: {
    type: String,
    default: '加载中...',
  },
})
</script>
