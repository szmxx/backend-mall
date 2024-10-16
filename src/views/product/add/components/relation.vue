<template>
  <common-form
    :model="model"
    component-class="w-full"
    :list="RelativeFormList"
    :label-width="100"
    :footer="false"
    :redirect="false"
  >
    <template #topic>
      <el-transfer
        v-model="model.topic"
        class="<sm:(flex flex-col gap-4)"
        :titles="['待选择', '已选择']"
        :data="topicList"
        filterable
        :filter-method="onFilter"
        filter-placeholder="请输入专题名称"
      />
    </template>
  </common-form>
</template>

<script setup lang="ts">
import { RelativeFormList } from '../config'

const topicList = [
  {
    key: 1,
    label: `Option 1`,
    disabled: false,
  },
]
const model = ref({
  topic: [],
})

function onFilter(query: string, item: Record<string, string>) {
  return item?.label?.toLowerCase()?.includes(query?.toLowerCase?.())
}
</script>
