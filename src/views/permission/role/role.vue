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
            >添加角色</el-button
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
        <template #created_at="{ row }">
          <div>
            {{ formatTime(row.created_at) }}
          </div>
        </template>
        <template #status="{ row }">
          <div :class="StatusMap?.[row?.status]?.color">
            {{ StatusMap?.[row?.status]?.label }}
          </div>
        </template>

        <template #operate="{ row }">
          <div class="gap-2 flex-wrap center">
            <el-button size="small" class="m-0!" type="primary"
              >分配菜单
            </el-button>
            <el-button size="small" class="m-0!" type="primary"
              >分配资源
            </el-button>
            <el-button
              size="small"
              class="m-0!"
              type="primary"
              @click="onRowOperate('edit', row)"
              >编辑
            </el-button>
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
    <common-dialog
      v-model="roledialog.visible"
      title="编辑角色"
      @confirm="onRoleConfirm"
    >
      <common-form
        ref="roleformref"
        :rules="RoleFormRules"
        label-position="right"
        :label-width="80"
        :redirect="false"
        :header="false"
        form-class="px-4"
        component-class="w-full"
        class="border-0"
        :list="RoleFormList"
        :model="roledialog"
      ></common-form>
    </common-dialog>
    <common-dialog title="分配菜单" @confirm="onMenuConfirm">
      <common-transfer></common-transfer>
    </common-dialog>
    <common-dialog title="分配资源" @confirm="onResourceConfirm">
      <common-transfer></common-transfer>
    </common-dialog>
  </div>
</template>

<script setup lang="ts">
import {
  ColumnList,
  FormList,
  RoleFormList,
  StatusMap,
  RoleFormRules,
} from './config'
import {
  getRoleList,
  deleteRole,
  postRole,
  putRole,
} from '@/api/permission/role'
import { formatTime } from '@/utils'

const route = useRoute()
const model = computed(() => Object.assign({}, route.query || {}))
const tableData = ref<Record<string, unknown>[]>([])
const { loading, runAsync } = getRoleList({
  onError(error) {
    if (error) {
      message({
        type: 'error',
        message: '请求失败',
      })
      console.error(error)
    }
  },
})

getDataList()

const message = useMessage()

async function getDataList() {
  if (!loading.value) {
    const res = await runAsync(Object.assign({}, model.value))
    tableData.value = res
  }
}

const roledialog = ref({
  visible: false,
})

function onRowOperate(type: string, row: Record<string, unknown>) {
  switch (type) {
    case 'add':
      roledialog.value = {
        visible: true,
      }
      break
    case 'edit':
      roledialog.value = {
        visible: true,
        ...row,
      }
      break
    case 'delete':
      onDelete(row)
      break
  }
}

const confirm = useConfirm()
const { run: deleteRoleAPI } = deleteRole({
  onError(error) {
    message({
      type: 'error',
      message: '删除失败',
    })
    console.error(error)
  },
  onSuccess(data) {
    if (data) {
      message({
        type: 'success',
        message: '删除成功',
      })
    }
  },
})
async function onDelete(row: Record<string, unknown>) {
  confirm({
    title: '温馨提示',
    type: 'warning',
    content: `是否删除角色【${row.name}】`,
  })?.then(async () => {
    deleteRoleAPI(row?.id as string)
  })
}

const roleformref = ref()
const { run: putRoleAPI } = putRole({
  onSuccess() {
    message({
      type: 'success',
      message: '编辑成功',
    })
  },
  onError() {
    message({
      type: 'error',
      message: '操作失败',
    })
  },
})
const { run: postRoleAPI } = postRole({
  onSuccess() {
    message({
      type: 'success',
      message: '创建成功',
    })
  },
  onError() {
    message({
      type: 'error',
      message: '操作失败',
    })
  },
})
async function onRoleConfirm() {
  const model = await roleformref.value.submit()
  const { id, name, description, status } = model
  if (id) {
    putRoleAPI(id, {
      name,
      description,
      status,
    })
  } else {
    postRoleAPI({
      name: name,
      description,
      status,
    })
  }
}

async function onMenuConfirm() {
  // pass
}

async function onResourceConfirm() {
  // pass
}
</script>
