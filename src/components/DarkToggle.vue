<script setup lang="ts">
const theme = computed(() => currentTheme.value)
function toggleDark() {
  useTheme(theme.value === 'light' ? 'dark' : 'light')
}
</script>

<template>
  <button class="cursor-pointer" @click="toggleDark">
    <div class="i-carbon-sun" :class="{ 'i-carbon-moon!': theme === 'dark' }" />
  </button>
</template>
