<template>
  <el-config-provider :locale="current">
    <router-view></router-view>
  </el-config-provider>
</template>

<script lang="ts" setup>
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 是否是自身路由
const { locale } = useI18n()
const current = shallowRef()
watch(
  locale,
  (newVal) => {
    console.log(newVal)
    switch (newVal) {
      case 'zh-CN':
        current.value = zhCn
        break
      case 'en-US':
        current.value = null
        break
    }
  },
  {
    immediate: true,
  },
)

console.log(import.meta.env.VITE_APP_NAME)
</script>
