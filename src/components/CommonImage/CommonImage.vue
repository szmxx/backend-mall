<template>
  <el-image
    :src="src"
    :zoom-rate="1.05"
    :max-scale="2"
    :min-scale="0.5"
    :preview-src-list="srcList"
    :z-index="9999"
    fit="cover"
    :preview-teleported="true"
    :hide-on-click-modal="true"
  />
</template>

<script setup lang="ts">
import { INSTANCE_PREVIEW_KEY } from '@/constants'
import { injectStrict } from '@/utils'
const instance = injectStrict(INSTANCE_PREVIEW_KEY)
const props = defineProps({
  src: {
    type: String,
    default: '',
  },
  preview: {
    type: Boolean,
    default: true,
  },
})

const srcList = ref<string[]>([])

onMounted(() => {
  if (props.preview && props.src && instance) {
    instance?.add?.(props.src)
    srcList.value = Array.from(instance) as string[]
  }
})

onBeforeUnmount(() => {
  if (props.preview && instance) {
    instance?.delete?.(props.src)
  }
})
</script>
