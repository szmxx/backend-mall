<template>
  <div class="rounded border">
    <slot v-if="header" name="header">
      <div class="flex justify-between p-2 bg-color items-center border-b">
        <div class="flex gap-x-2 items-center">
          <div class="i-ion-search text-lg"></div>
          <div>筛选搜索</div>
        </div>
        <div>
          <el-button type="primary" @click="submitForm"
            >{{ confirmText }}
          </el-button>
          <el-button @click="resetForm">重置</el-button>
        </div>
      </div>
    </slot>
    <el-form
      ref="formRef"
      :label-position="labelPosition as any"
      :label-width="labelWidth"
      :model="data"
      :size="size as any"
      status-icon
      :inline="inline"
      :rules="rules as any"
      :class="[
        { 'flex gap-4 flex-col': !inline, 'flex gap-4 flex-wrap': inline },
        formClass,
      ]"
    >
      <el-form-item
        v-for="item in list"
        :key="item.prop"
        :label="item.label"
        :label-width="item.width"
        :prop="item.prop"
        :class="[
          {
            'flex-col flex': item.position === 'top',
            '<sm:(flex-col flex)': item.position === 'smtop',
          },
        ]"
      >
        <form-slot v-if="item.slot" :data="item" :model="data"></form-slot>
        <component
          v-bind="item"
          :is="item.component"
          v-else-if="item['v-focus-next'] !== void 0"
          v-model="data[item.prop]"
          v-focus-next="item['v-focus-next']"
          :class="componentClass"
        ></component>
        <component
          v-bind="item"
          :is="item.component"
          v-else
          v-model="data[item.prop]"
          :class="componentClass"
        ></component>
      </el-form-item>
    </el-form>
    <slot v-if="footer" name="footer">
      <div class="px-4 pb-4">
        <el-button type="primary" @click="submitForm"
          >{{ confirmText }}
        </el-button>
        <el-button @click="resetForm">重置</el-button>
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { IFormItem } from './types'
import FormSlot from './slot'
import { InstanceKey } from './constants'
import { PropType } from 'vue'
const props = defineProps({
  labelPosition: {
    type: String,
    default: 'left',
  },
  labelWidth: {
    type: [String, Number],
    default: '',
  },
  inline: {
    type: Boolean,
    default: false,
  },
  redirect: {
    type: Boolean,
    default: true,
  },
  header: { type: Boolean, default: true },
  footer: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: '',
  },
  confirmText: {
    type: String,
    default: '搜索',
  },
  list: {
    type: Array as PropType<IFormItem[]>,
    default: () => [],
  },
  model: {
    type: Object as PropType<Record<string, unknown>>,
    default: () => {
      return {}
    },
  },
  rules: {
    type: Object as PropType<Record<string, unknown>>,
    default: () => {
      return {}
    },
  },
  componentClass: {
    type: String,
    // @unocss-include
    default: '<sm:w-60! w-50!',
  },
  formClass: {
    type: String,
    // @unocss-include
    default: 'p-4',
  },
})

const data = ref<Record<string, unknown>>({})
onMounted(() => {
  data.value = props.model
  watch(
    () => props.model,
    (newVal) => {
      data.value = newVal || {}
    },
  )
})

const emit = defineEmits(['submit', 'reset'])

const router = useRouter()
const route = useRoute()

const formRef = ref()
const submitForm = () => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    if (!formRef.value) return reject({})
    await formRef?.value?.validate?.((valid: boolean) => {
      if (valid) {
        if (props.redirect) {
          router.push({
            path: route.path,
            query: Object.assign({}, route.query, { ...data.value }),
          })
        }
        emit('submit', data.value)
        resolve(data.value)
      } else {
        reject({})
      }
    })
  })
}

const resetForm = () => {
  if (!formRef.value) return
  formRef?.value?.resetFields?.()
  emit('reset', {})
}

provide(InstanceKey, getCurrentInstance()!)
defineExpose({
  submit: submitForm,
  reset: resetForm,
})
</script>

<style lang="scss" scoped>
:deep(.el-form-item) {
  margin: 0;
}
</style>
