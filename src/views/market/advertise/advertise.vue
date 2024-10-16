<template>
  <div
    class="flex min-h-full w-full flex-col box-border gap-y-4 bg-default p-4 rounded"
  >
    <common-form
      :inline="true"
      :list="FormList"
      :model="model"
      @submit="getDataList"
    ></common-form>
    <div class="flex-1 rounded">
      <common-table
        ref="tableRef"
        :loading="loading"
        :data="tableData"
        :columns="ColumnList"
        :max-height="-1"
      >
        <template #position="{ row }">
          <div :class="PositionMap?.[row?.checkstatus]?.color">
            {{ PositionMap?.[row?.checkstatus]?.label }}
          </div>
        </template>
        <template #image="{ row }">
          <common-image :src="row.image"></common-image>
        </template>
        <template #enabled="{ row }">
          <common-switch v-model="row.enabled"></common-switch>
        </template>

        <template #operate>
          <div class="gap-2 flex-wrap center">
            <el-button size="small" class="m-0!" type="primary">编辑</el-button>
            <el-button size="small" class="m-0!" type="danger">删除</el-button>
          </div>
        </template>
      </common-table>
    </div>
    <div class="flex justify-between gap-4 <sm:flex-col">
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
import { TypeList, ColumnList, FormList, PositionMap } from './config'
import { getOrderList } from '@/api/order'

const pagination = ref({
  page: 1,
  size: 10,
  total: 0,
})

const route = useRoute()
const model = computed(() => Object.assign({}, route.query || {}))
const tableData = ref<Record<string, unknown>[]>([])
const { loading, run } = getOrderList({
  onError() {
    message({
      type: 'error',
      message: '请求失败',
    })
  },
  onSuccess(data) {
    if (data) {
      tableData.value = data.list
      pagination.value.total = data.total
    }
  },
})

getDataList()

const message = useMessage()

async function getDataList() {
  if (!loading.value) {
    run(Object.assign({}, model.value, pagination.value))
  }
}

const currentType = ref('')
const tableRef = ref()
function onMultiOperate(type: string) {
  const list = tableRef.value.getSelection()
  if (list.length) {
    switch (type) {
      case 'send':
        list.map((item: Record<string, unknown>) => {
          item.status = true
        })
        break
      case 'close':
        list.map((item: Record<string, unknown>) => {
          item.status = false
        })
        break
      case 'remove':
        break
    }
  } else {
    message({
      type: 'warning',
      message: '请选择操作的订单',
    })
  }
}
</script>
