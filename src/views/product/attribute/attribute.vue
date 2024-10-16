<template>
  <div class="flex flex-col w-full h-full bg-default p-4">
    <div class="flex-1">
      <common-table
        :loading="loading"
        :columns="ColumnList"
        :data="tableData"
      ></common-table>
    </div>
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-x-2">
        <common-select
          v-model="currentType"
          placeholder="批量操作"
          :options="TypeList"
          clearable
        ></common-select>
        <el-button type="primary" @click="onMultiOperate(currentType)"
          >确认</el-button
        >
      </div>
      <common-pagination
        v-model:page="pagination.page"
        v-model:size="pagination.size"
        :total="pagination.total"
        @pagination="getDataList"
      ></common-pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ColumnList, TypeList } from './config'

const pagination = ref({
  page: 1,
  size: 10,
  total: 100,
})

const tableData = ref([])
const loading = ref(false)

getDataList()

async function getDataList() {
  if (!loading.value) {
    // pass
  }
}

const currentType = ref('')
const tableRef = ref()
function onMultiOperate(type: string) {
  const list = tableRef.value.getSelection()
  if (list.length) {
    switch (type) {
      case 'up':
        list.map((item: Record<string, unknown>) => {
          item.status = true
        })
        break
      case 'down':
        list.map((item: Record<string, unknown>) => {
          item.status = false
        })
        break
      case 'new':
        list.map((item: Record<string, unknown>) => {
          item.new = true
        })
        break
      case 'unnew':
        list.map((item: Record<string, unknown>) => {
          item.new = false
        })
        break
      case 'recommend':
        list.map((item: Record<string, unknown>) => {
          item.recommend = true
        })
        break
      case 'unrecommend':
        list.map((item: Record<string, unknown>) => {
          item.recommend = false
        })
        break
      case 'remove':
        break
    }
  }
}
</script>
