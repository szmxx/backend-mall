<!--
 * @Author: cola
 * @Date: 2022-07-04 19:17:18
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div class="flex justify-between h-[60px] items-center px-4 border-b">
    <div>{{ title }}</div>
    <div class="center gap-x-2">
      <DarkToggle></DarkToggle>
      <LangToggle></LangToggle>
    </div>
  </div>
  <div class="flex gap-4 p-4">
    <div
      v-for="i in portals"
      :key="i.label"
      class="center rounded cursor-pointer w-400px h-200px bg-color hover:bg-primary"
      @click="openHandler(i)"
    >
      {{ i.label }}
    </div>
  </div>
</template>

<script setup lang="ts">
import useStore from '@/store/app'

const { config } = useStore()
const { t } = useI18n()
const title = config?.title
const portals = ref([
  {
    label: t('common.chinese'),
    path: '/cn',
  },
  {
    label: t('common.english'),
    path: '/en',
  },
  {
    label: 'DEMO',
    path: '/demo',
  },
  {
    label: 'Element',
    path: '/element',
  },
])

const router = useRouter()

function openHandler(i: Record<string, unknown>) {
  if (i.path) router.push(i.path)
}
</script>
