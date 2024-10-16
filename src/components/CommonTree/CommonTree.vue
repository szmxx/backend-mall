<template>
  <el-input v-if="search" v-model="inputVal" :placeholder="placeholder" />
  <el-tree
    v-if="data.length"
    ref="treeRef"
    :load="load"
    :lazy="lazy"
    node-key="id"
    :data="data"
    :empty-text="empty"
    :highlight-current="highlight"
    :show-checkbox="checkbox"
    :default-expanded-keys="expandKeys"
    :default-checked-keys="modelValue"
    v-bind="$attrs"
    :filter-node-method="filterNode"
    @check-change="onCheckChange"
    @node-click="onNodeClick"
  >
    <template #default="{ node, data }">
      <template v-if="data.editing">
        <el-input
          v-model="data.label"
          v-focus="data.editing"
          size="small"
          placeholder="请输入内容"
          @blur="onBlur(data)"
          @keyup.enter="onEnter(data)"
          @focus="onFocus(data)"
        >
          <template #suffix>
            <el-button :loading="data.loading" link></el-button>
          </template>
        </el-input>
      </template>
      <template v-else-if="'slot' in data">
        <tree-slot :data="data" :node="node"></tree-slot>
      </template>
      <template v-else>
        <div>{{ node.label }}</div>
      </template>
    </template>
  </el-tree>
  <slot v-else name="empty">
    <el-empty :image-size="150" :description="empty" />
  </slot>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import TreeSlot from './slot'
import { ITree } from './types'
import { InstanceKey } from './constants'
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: Array as PropType<number[] | string[]>,
    default: () => [],
  },
  expandKeys: {
    type: Array as PropType<string[] | number[]>,
    default: () => [],
  },
  checkbox: {
    type: Boolean,
    default: false,
  },
  lazy: {
    type: Boolean,
    default: false,
  },
  highlight: {
    type: Boolean,
    default: true,
  },
  search: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: '请输入搜索内容',
  },
  empty: {
    type: String,
    default: '暂无数据',
  },
  load: {
    type: Function as PropType<
      (node: any, resolve: (data: any[]) => void) => void
    >,
    default: async () => {
      return {}
    },
  },
})
defineOptions({
  name: 'CommonTree',
  inheritAttrs: false,
})

const inputVal = ref('')
const treeRef = ref()

watch(inputVal, (val) => {
  treeRef.value!.filter(val)
})
provide(InstanceKey, getCurrentInstance()!)
const filterNode = (value: string, data: ITree) => {
  if (!value) return true
  return data.label.includes(value)
}

const emit = defineEmits(['update:modelValue', 'node', 'edit', 'create'])
const checkNodes = computed({
  get() {
    return props.modelValue
  },
  set(newVal) {
    emit('update:modelValue', newVal)
  },
})

function onCheckChange() {
  const nodes = treeRef?.value?.getCheckedNodes() || []
  checkNodes.value = nodes.map((i: { id: string }) => i.id)
}

function onNodeClick(node: Record<string, unknown>) {
  emit('node', node)
}

const map: Record<string, unknown> = {}
function onFocus(data: Record<string, unknown>) {
  if (!data.creating) {
    map[data.id as string] = data.label
  }
}
function onBlur(data: Record<string, unknown>) {
  if (!data.loading) {
    const value = map[data.id as string]
    delete map[data.id as string]
    if (value || data.creating) {
      if (value !== data.label) {
        data.loading = true
        return emit(
          data.creating ? 'create' : 'edit',
          data,
          (bool: boolean) => {
            if (bool) {
              data.editing = false
            }
            data.loading = false
            if (data.creating) {
              data.creating = false
            }
          },
        )
      }
    }
    data.editing = false
  }
}
function onEnter(data: Record<string, unknown>) {
  if (!data.loading) {
    const value = map[data.id as string]
    delete map[data.id as string]
    if (value || data.creating) {
      if (value !== data.label) {
        data.loading = true
        return emit(
          data.creating ? 'create' : 'edit',
          data,
          (bool: boolean) => {
            if (bool) {
              data.editing = false
            }
            data.loading = false
            if (data.creating) {
              data.creating = false
            }
          },
        )
      }
    }
    data.editing = false
  }
}

function append(data: Record<string, unknown>, parent: string) {
  treeRef?.value?.append?.(
    Object.assign({ creating: true, editing: true }, data),
    parent,
  )
}
function remove(id: string | number) {
  treeRef?.value?.remove?.(id)
}
defineExpose({
  append: append,
  remove: remove,
})
</script>
