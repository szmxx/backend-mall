<template>
  <el-form
    ref="formRef"
    :rules="rules"
    :model="model"
    class="bg-color px-8 py-4 rounded-2 flex flex-col gap-y-2 min-w-80"
  >
    <div class="py-4 center w-full relative">
      <div class="i-carbon-arrow-left absolute left-0" @click="onBack"></div>
      <div>注册账户</div>
    </div>
    <el-form-item prop="username">
      <el-input v-model="model.username" placeholder="请输入用户名">
        <template #prepend>
          <div class="i-carbon-user"></div>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="model.password"
        placeholder="请输入密码"
        type="password"
        show-password
      >
        <template #prepend> <div class="i-carbon-password"></div> </template
      ></el-input>
    </el-form-item>
    <el-form-item prop="email">
      <el-input v-model="model.email" type="email" placeholder="请输入邮箱">
        <template #prepend> <div class="i-carbon-email"></div> </template
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        :loading="loading"
        class="w-full"
        type="primary"
        @click="onSubmit(formRef)"
        >提交</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { register } from '@/api/user'
import { FormInstance } from 'element-plus'
import encrypt from '@/utils/encrypt'

const model = ref({
  username: '',
  password: '',
  email: '',
})
const rules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '长度不小于6位', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    {
      type: 'email',
      message: '请输入正确的邮箱',
      trigger: ['blur'],
    },
  ],
})
const formRef = ref<FormInstance>()
const proxy = getCurrentInstance()?.proxy
const { run, loading } = register({
  onError(error) {
    proxy?.$message.error('注册失败')
    console.error(error)
    loading.value = false
  },
  onSuccess(data) {
    loading.value = false
    if (data) {
      proxy?.$message.success('注册成功')
      onBack()
    }
  },
})
async function onSubmit(formEl: FormInstance | undefined) {
  if (!formEl || loading.value) return
  await formEl.validate(async (valid: boolean) => {
    if (valid) {
      loading.value = true
      encrypt.setPublicKey(import.meta.env?.VITE_PUBLIC_KEY)
      const password = encrypt.encrypt(model.value.password)
      if (password) {
        run({
          username: model.value.username,
          password: password,
          email: model.value.email,
        })
      }
    }
  })
}

function onReset() {
  formRef.value?.resetFields()
}

const emit = defineEmits(['action'])
function onBack() {
  onReset()
  emit('action', 'home')
}
</script>
