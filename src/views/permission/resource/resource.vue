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
        <template #status="{ row }">
          <div :class="StatusMap?.[row?.checkstatus]?.color">
            {{ StatusMap?.[row?.checkstatus]?.label }}
          </div>
        </template>

        <template #operate>
          <div class="gap-2 flex-wrap center">
            <el-button size="small" class="m-0!" type="primary"
              >查看详情</el-button
            >
            <el-button size="small" class="m-0!" type="danger">删除</el-button>
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
const { loading, runAsync } = getOrderList({
  onError() {
    message({
      type: 'error',
      message: '请求失败',
    })
  },
  onSuccess(data) {
    if (data) {
      pagination.value.total = data.total
      tableData.value = data?.list
    }
  },
})

getDataList()

const message = useMessage()
async function getDataList() {
  if (!loading.value) {
    runAsync(Object.assign({}, model.value, pagination.value))
  }
}

const tableRef = ref()
function onMultiOperate(type: string) {
  const list = tableRef?.value?.getSelection?.()
  if (list?.length) {
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
      message: '请选择操作的申请',
    })
  }
}
onMultiOperate('')
</script>
