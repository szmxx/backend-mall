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
    <div class="flex-1 rounded relative">
      <div
        class="flex justify-between items-center rounded-t p-4 bg-color border-x border-t"
      >
        <div class="flex items-center gap-x-2">
          <div class="i-ion-server"></div>
          <div>搜索结果</div>
        </div>
      </div>
      <common-table
        ref="tableRef"
        :loading="loading"
        :data="tableData"
        :columns="ColumnList"
        :max-height="-1"
        class="rounded-b"
      >
        <template #created_at="{ row }">
          <div>
            {{ formatTime(row.created_at) }}
          </div>
        </template>

        <template #lastlogintime="{ row }">
          <div>
            {{ formatTime(row.lastlogintime) }}
          </div>
        </template>
        <template #status="{ row }">
          <div :class="StatusMap?.[row?.status]?.color">
            {{ StatusMap?.[row?.status]?.label }}
          </div>
        </template>

        <template #operate="{ row }">
          <div class="gap-2 flex-wrap center">
            <el-button
              size="small"
              link
              class="m-0!"
              type="primary"
              data-type="role"
              @click="onRowOperate('role', row)"
              >分配角色
            </el-button>
            <el-button
              size="small"
              link
              class="m-0!"
              type="primary"
              @click="onRowOperate('edit', row)"
              >编辑
            </el-button>
            <el-button
              size="small"
              link
              class="m-0!"
              type="danger"
              @click="onRowOperate('delete', row)"
              >删除
            </el-button>
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
    <common-dialog
      v-model="roledialog.visible"
      title="分配角色"
      @confirm="onRoleConfirm"
    >
      <common-select
        v-model="roledialog.role"
        placeholder="请选择角色"
        :options="roledialog.list"
        :filterable="true"
        :loading="roledialog.loading"
        :number="true"
      ></common-select>
    </common-dialog>
    <common-dialog
      v-model="userdialog.visible"
      :title="userdialog.id ? '编辑用户' : '创建用户'"
      @confirm="onUserConfirm"
    >
      <common-form
        ref="formRef"
        :label-width="60"
        label-position="right"
        :rules="UserFormRules"
        :redirect="false"
        :header="false"
        form-class="px-4"
        class="border-0"
        component-class="w-full"
        :list="UserFormList"
        :model="userdialog"
      ></common-form>
    </common-dialog>
  </div>
</template>

<script setup lang="ts">
import {
  ColumnList,
  FormList,
  StatusMap,
  UserFormList,
  UserFormRules,
} from './config'
import { deleteUser, getUserList, putUser } from '@/api/permission/user'
import { getRoleList } from '@/api/permission/role'
import { formatTime } from '@/utils'

const pagination = ref({
  page: 1,
  size: 10,
  total: 0,
})

const route = useRoute()
const model = computed(() => Object.assign({}, route.query || {}))

const tableData = ref<Record<string, unknown>[]>([])
const { loading, run } = getUserList({
  onError(error) {
    message({
      type: 'error',
      message: '请求失败',
    })
    console.error(error)
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
    run(Object.assign({}, model.value, pagination.value))
  }
}

const roledialog = ref({
  visible: false,
  role: '',
  list: [] as Record<string, unknown>[],
  loaded: false,
  loading: false,
  id: '',
})

const userdialog = ref({
  visible: false,
  operatetype: '',
})

function onRowOperate(type: string, row: Record<string, unknown> = {}) {
  switch (type) {
    case 'role':
      getRoleDataList()
      roledialog.value.visible = true
      roledialog.value.id = row.id as string
      roledialog.value.role = row.role as string
      break
    case 'edit':
      userdialog.value = {
        ...row,
        visible: true,
        operatetype: type,
      }
      break
    case 'delete':
      onDelete(row)
      break
  }
}

const confirm = useConfirm()
const { run: deleteUserAPI } = deleteUser({
  onError() {
    message({
      type: 'error',
      message: '删除失败',
    })
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
    content: `是否删除用户【${row.username}】`,
  })?.then(async () => {
    deleteUserAPI(row?.id as string)
  })
}

const { runAsync: getRoleListAPI } = getRoleList({
  onError() {
    message({
      type: 'error',
      message: '获取角色列表失败',
    })
  },
})
async function getRoleDataList() {
  try {
    if (!roledialog.value.loaded) {
      roledialog.value.loading = true
      const data = await getRoleListAPI({
        status: 1,
      })
      roledialog.value.list = data.map((i) => {
        return {
          label: i.name,
          value: i.id,
        }
      })
      roledialog.value.loaded = true
    }
  } finally {
    roledialog.value.loading = false
  }
}

const { run: putUserAPI } = putUser({
  onError() {
    message({
      type: 'error',
      message: '分配角色失败',
    })
  },
  onSuccess() {
    message({
      type: 'success',
      message: '分配角色成功',
    })
  },
})
async function onRoleConfirm() {
  const { id, role } = roledialog.value
  if (!role) {
    return message({
      type: 'warning',
      message: '请选择用户角色',
    })
  }
  putUserAPI(id, {
    roleId: role,
  })
}

const formRef = ref()
async function onUserConfirm() {
  const model = await formRef.value.submit()
  const { id } = userdialog.value
  const { username, nickname, email, remark, status } = model
  putUserAPI(id, {
    username,
    nickname,
    email,
    remark,
    status,
  })
}
</script>
