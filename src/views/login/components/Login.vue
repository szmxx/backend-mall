<template>
  <el-form
    ref="formRef"
    :rules="rules"
    :model="model"
    class="bg-color px-8 py-4 rounded-2 flex flex-col gap-y-2 min-w-80"
  >
    <div class="w-full center mt-4">
      <img src="@/assets/logo.jpeg" class="w-15 rounded" />
    </div>
    <h1 class="w-full py-4 text-center text-medium">{{ title }}</h1>
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
    <div
      class="flex text-primary text-sm w-full pb-2 justify-between items-center"
      @click="onAction"
    >
      <div data-type="forget" class="cursor-pointer">忘记密码</div>
      <div data-type="register" class="cursor-pointer">注册账户</div>
    </div>
    <el-form-item>
      <el-button
        :loading="loading"
        class="w-full"
        type="primary"
        @click="onSubmit(formRef)"
        >登录</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { FormInstance } from 'element-plus'
import { login } from '@/api/user'
import { authorize } from '@/api/auth'
import useAppStore from '@/store/app'
import encrypt from '@/utils/encrypt'
import { setRefreshToken, setToken } from '@/utils/auth'
const { config } = useAppStore()

const title = config?.title
const model = ref({
  username: '',
  password: '',
})
const rules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})
const formRef = ref<FormInstance>()

const proxy = getCurrentInstance()?.proxy
const loading = ref(false)
const router = useRouter()
const route = useRoute()

async function onSubmit(formEl: FormInstance | undefined) {
  if (!formEl) return
  await formEl.validate(async (valid: boolean) => {
    if (valid) {
      try {
        loading.value = true
        encrypt.setPublicKey(import.meta.env?.VITE_PUBLIC_KEY)
        const password = encrypt.encrypt(model.value.password)
        if (password) {
          const code = await login({
            username: model.value.username,
            password: password,
          })
          if (code) {
            const res = await authorize(code)
            setToken(res.token)
            setRefreshToken(res.refreshToken)
            if (res) {
              proxy?.$message.success('登录成功')
              onRedirect()
            }
          }
        }
      } catch (error) {
        proxy?.$message.error('登录失败')
        console.error(error)
      } finally {
        loading.value = false
      }
    }
  })
}

function onReset() {
  formRef.value?.resetFields()
}

const emit = defineEmits(['action'])
function onAction(evt: MouseEvent) {
  const { type } = (evt?.target as HTMLElement)?.dataset || {}
  if (type) {
    onReset()
    emit('action', type)
  }
}

function onRedirect() {
  const redirect = (route?.query?.redirect as string) || '/'
  if (redirect.startsWith('http')) {
    location.href = redirect
  } else {
    setTimeout(() => {
      router.replace({
        path: redirect,
      })
    }, 500)
  }
}
</script>
