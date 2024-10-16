<template>
  <div
    class="flex min-h-full w-full flex-col box-border gap-y-4 bg-default p-4 rounded"
  >
    <common-form
      :inline="true"
      :list="FormList"
      :model="model"
      @submit="onSubmit"
    ></common-form>
    <div class="flex-1 rounded">
      <common-table
        ref="tableRef"
        :loading="loading"
        :data="tableData"
        :columns="ColumnList"
        :max-height="-1"
      >
        <template #name="{ row }">
          <div>{{ row.name }}</div>
        </template>
        <template #image="{ row }">
          <common-image :src="row.image"></common-image>
        </template>
        <template #checkstatus="{ row }">
          <div :class="CheckStatusMap?.[row?.checkstatus]?.color">
            {{ CheckStatusMap?.[row?.checkstatus]?.label }}
          </div>
        </template>
        <template #label="{ row }">
          <div class="flex flex-col">
            <el-switch
              v-model="row.status"
              inline-prompt
              active-text="上架"
              inactive-text="下架"
            ></el-switch>
            <el-switch
              v-model="row.new"
              inline-prompt
              active-text="新品"
              inactive-text="新品"
            ></el-switch>
            <el-switch
              v-model="row.recommend"
              inline-prompt
              active-text="推荐"
              inactive-text="推荐"
            ></el-switch>
          </div>
        </template>
        <template #sku="{ row }">
          <div class="p-2 bg-primary w-fit rounded cursor-pointer text-white">
            <div
              class="i-ion-edit cursor-pointer"
              @click="onSkuEdit(row)"
            ></div>
          </div>
        </template>
        <template #operate>
          <div class="gap-2 flex-wrap center">
            <el-button size="small" class="m-0!" type="primary">查看</el-button>
            <el-button size="small" class="m-0!" type="success">编辑</el-button>
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
    <common-dialog v-model="skuvisible" title="编辑SKU信息">
      <div class="flex justify-between items-center">
        <div>商品货号</div>
        <common-input placeholder="请输入商品编号"></common-input>
      </div>
      <common-table
        class="h-80"
        :columns="SkuColumnList"
        :data="skudata"
      ></common-table>
    </common-dialog>
  </div>
</template>

<script setup lang="ts">
import {
  TypeList,
  ColumnList,
  SkuColumnList,
  FormList,
  CheckStatusMap,
} from './config'
import { INSTANCE_PREVIEW_KEY } from '@/constants'
import { getProductList } from '@/api/product'

const pagination = ref({
  page: 1,
  size: 10,
  total: 100,
})

const route = useRoute()
const model = computed(() =>
  Object.assign(
    { itemnumber: '', checkstatus: '', name: '', status: '', catalog: '' },
    route.query || {},
  ),
)

const {
  data: tableData,
  loading,
  run,
} = getProductList({
  onError(err) {
    if (err) {
      message({
        type: 'error',
        message: '请求失败',
      })
    }
  },
  onSuccess(data) {
    if (data) {
      tableData.value = data
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

function onSubmit(model: Record<string, string>) {
  console.log(model)
  getDataList()
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

const skudata = ref([])
const skuvisible = ref(false)

function onSkuEdit(data: Record<string, unknown>) {
  skuvisible.value = true
  console.log(data)
}

provide(INSTANCE_PREVIEW_KEY, new Set())
</script>
