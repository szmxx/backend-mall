<template>
  <el-transfer
    v-model="value"
    :titles="titles as any"
    :data="data"
    :filterable="filterable"
    :filter-method="onFilter"
    :filter-placeholder="placeholder"
  />
</template>

<script setup lang="ts">
interface Option {
  key: number
  label: string
  disabled: boolean
}

const props = defineProps({
  data: {
    type: Array as PropType<Option[]>,
    default: () => [],
  },
  modelValue: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: '请输入搜索内容',
  },
  filterable: {
    type: Boolean,
    default: true,
  },
  titles: {
    type: Array as PropType<string[]>,
    default: () => ['待选择', '已选择'],
  },
})

defineOptions({
  name: 'CommonTransfer',
  inheritAttrs: true,
})
const emit = defineEmits(['update:modelValue'])
const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

function onFilter(query: string, item: Record<string, string>) {
  return item?.label?.toLowerCase()?.includes(query?.toLowerCase?.())
}
</script>
