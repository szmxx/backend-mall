<template>
  <div class="flex gap-4 <sm:flex-col">
    <div class="bg-default w-30% <sm:w-full flex flex-col gap-y-8 p-8 rounded">
      <div>基础信息</div>
      <div class="center">
        <el-upload>
          <CommonImage
            class="center w-40 h-40 rounded-50%"
            :src="user.avatar"
          ></CommonImage>
        </el-upload>
      </div>
      <div
        v-for="item in UserList"
        :key="item.key"
        class="flex justify-between"
      >
        <div>{{ item.name }}</div>
        <template v-if="item.key === 'role'">
          <div>{{ user[item.key]?.name }}</div>
        </template>
        <template v-else>
          <div>{{ user[item.key] }}</div>
        </template>
      </div>
    </div>
    <div class="bg-default flex-1 p-4">
      <el-tabs v-model="current">
        <el-tab-pane label="用户资料" name="user">
          <common-form
            :redirect="false"
            :header="false"
            :footer="true"
            :list="FormList"
            :model="model"
            class="border-0"
            label-position="right"
            :label-width="80"
            confirm-text="保存"
            :rules="FormRules"
            @submit="onSubmit"
          >
            <template #role>
              <div>{{ model?.role?.name }}</div>
            </template>
            <template #security>
              <el-button link type="primary" @click="onEmail"
                >修改邮箱
              </el-button>
              <el-button link type="primary" @click="onPwd">修改密码</el-button>
            </template>
          </common-form>
        </el-tab-pane>
        <el-tab-pane label="行为日志" name="log">Config</el-tab-pane>
      </el-tabs>
    </div>
    <common-dialog
      v-model="dialog.visible"
      :title="'修改' + dialog.title"
      @confirm="onConfirm"
    >
      <common-form
        ref="formRef"
        :header="false"
        :redirect="false"
        :label-width="80"
        class="border-0"
        form-class="px-4"
        component-class="w-full"
        :list="dialog.type === 'email' ? EmailFormList : PwdFormList"
        :rules="dialog.type === 'email' ? EmailFormRules : PwdFormRules"
        :model="dialogmodel"
      >
        <template #new="{ model }">
          <div class="flex gap-x-2 items-center">
            <common-input
              v-model="model.new"
              placeholder="请输入新邮箱"
            ></common-input>
            <el-button>获取验证码</el-button>
          </div>
        </template>
      </common-form>
    </common-dialog>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/user'
const { setUser } = useUserStore()
const { user } = storeToRefs(useUserStore())
import {
  FormList,
  FormRules,
  UserList,
  PwdFormList,
  PwdFormRules,
  EmailFormList,
  EmailFormRules,
} from './config'

const current = ref('user')
const model = ref({ ...user.value })

function onSubmit() {
  setUser(model.value)
}
const dialog = ref({
  visible: false,
  type: '',
  title: '',
})

const dialogmodel = ref({})

function onEmail() {
  dialog.value = {
    visible: true,
    type: 'email',
    title: '邮箱',
  }
  dialogmodel.value = {}
}

function onPwd() {
  dialog.value = {
    visible: true,
    type: 'password',
    title: '密码',
  }
  dialogmodel.value = {}
}

const formRef = ref()
async function onConfirm() {
  const model = await formRef?.value?.submit()
  console.log(model)
}
</script>
