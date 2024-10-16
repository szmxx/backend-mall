<template>
  <div class="bg-default w-full h-full rounded flex flex-col gap-y-4 p-4">
    <div class="flex-1">
      <common-table :loading="loading" :columns="ColumnList" :data="tableData">
        <template #setting="{ row }">
          <div class="center gap-2 <sm:flex-col">
            <el-button class="m-0!" @click="onRoute('specification', row)"
              >规格列表</el-button
            >
            <el-button class="m-0!" @click="onRoute('attribute', row)"
              >属性列表</el-button
            >
          </div>
        </template>
        <template #operate="{ row }">
          <div class="center gap-2 <sm:flex-col">
            <el-button class="m-0!" @click="onEdit(row)">编辑</el-button>
            <el-button type="danger" class="m-0!" @click="onRemove(row)"
              >删除</el-button
            >
          </div>
        </template>
      </common-table>
    </div>
    <div class="flex justify-between gap-4 <sm:(flex-col-reverse)">
      <common-pagination
        v-model:page="pagination.page"
        v-model:size="pagination.size"
        :total="pagination.total"
        @pagination="getDataList"
      ></common-pagination>
      <div
        class="text-white w-fit cursor-pointer text-medium p-3 rounded-1/2 shadow bg-primary"
        @click="onAdd"
      >
        <div class="i-ion-plus"></div>
      </div>
    </div>

    <common-dialog
      v-model="current.visible"
      :loading="current.loading"
      :title="current.id ? '编辑类型' : '创建类型'"
      @confirm="onSubmit"
    >
      <common-form
        ref="formRef"
        :footer="false"
        :redirect="false"
        :model="current"
        :list="NameFormList"
        :rules="NameFormRules"
      ></common-form>
    </common-dialog>
  </div>
</template>

<script setup lang="ts">
import { ColumnList, NameFormList, NameFormRules } from './config'
import { getTypeList, deleteType } from '@/api/product/type'

const pagination = ref({
  page: 1,
  size: 10,
  total: 100,
})

const tableData = ref<Record<string, unknown>[]>([])
const { run, loading } = getTypeList({
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

async function getDataList() {
  if (!loading.value) {
    run(pagination.value)
  }
}

const current = ref({
  visible: false,
  loading: false,
})

function onEdit(row: Record<string, unknown>) {
  current.value = Object.assign({}, row, { visible: true, loading: false })
}

const confirm = useConfirm()
const message = useMessage()
const { runAsync: deleteTypeAPI } = deleteType({
  onError() {
    message({
      type: 'error',
      message: '删除失败',
    })
  },
})
async function onRemove(row: Record<string, unknown>) {
  const bool = await confirm({
    title: '温馨提示',
    content: '确定删除',
    type: 'warning',
  })
  if (bool) {
    const data = await deleteTypeAPI(row?.id as string)
    if (data) {
      const index =
        tableData?.value?.findIndex((item) => item.id === row.id) || -1
      if (index !== -1) {
        tableData?.value?.splice(index)
      }
      message({
        type: 'success',
        message: '删除成功',
      })
    }
  }
}
function onAdd() {
  current.value = Object.assign({}, { visible: true, loading: false })
}
const formRef = ref()
async function onSubmit() {
  const model = await formRef.value.submit()
  if (current?.value?.id) {
    Object.assign(current.value, model.value)
  } else {
    tableData?.value?.push(current.value)
  }
  current.value = {
    visible: false,
    loading: false,
  }
}

const router = useRouter()
function onRoute(type: string, row: Record<string, unknown>) {
  if (type) {
    router.push({
      path: `/product/${type}?id=${row.id}`,
    })
  }
}
</script>
