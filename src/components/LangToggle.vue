<template>
  <button class="cursor-pointer" @click="toggleLang">
    <div class="i-carbon-translate" />
  </button>
</template>

<script setup lang="ts">
const locale = computed(() => currentLocale.value)
async function toggleLang() {
  await useLocale(locale.value === 'zh-CN' ? 'en-US' : 'zh-CN')
  location.reload()
}
</script>
