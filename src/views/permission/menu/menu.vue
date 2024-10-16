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
      <div class="flex justify-between items-center rounded-t p-4 bg-color">
        <div class="flex items-center gap-x-2">
          <div class="i-ion-server"></div>
          <div>数据列表</div>
        </div>
        <div class="flex gap-x-2">
          <el-button link type="primary" @click="onRowOperate('add', {})"
            >添加菜单</el-button
          >
        </div>
      </div>
      <common-table
        ref="tableRef"
        :loading="loading"
        :data="tableData"
        :columns="ColumnList"
        :max-height="-1"
      >
        <template #status="{ row }">
          <div :class="StatusMap?.[row?.checkstatus]?.color">
            {{ StatusMap?.[row?.checkstatus]?.label }}
          </div>
        </template>

        <template #operate="{ row }">
          <div class="gap-2 flex-wrap center">
            <el-button
              size="small"
              class="m-0!"
              type="primary"
              @click="onRowOperate('edit', row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              class="m-0!"
              type="danger"
              @click="onRowOperate('delete', row)"
              >删除</el-button
            >
          </div>
        </template>
      </common-table>
    </div>
    <common-pagination
      v-model:page="pagination.page"
      v-model:size="pagination.size"
      :total="pagination.total"
      @pagination="getDataList"
    ></common-pagination>
    <common-dialog title="编辑菜单">
      <common-form></common-form>
    </common-dialog>
  </div>
</template>

<script setup lang="ts">
import { ColumnList, FormList, StatusMap } from './config'
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
      pagination.value.total = data.total
      tableData.value = data.list
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

function onRowOperate(type: string, row: Record<string, unknown>) {
  switch (type) {
    case 'edit':
      break
    case 'add':
      break
    case 'delete':
      break
  }
  console.log(row)
}
</script>
