<template>
  <div class="flex flex-col gap-y-2">
    <common-tree
      ref="treeRef"
      v-model="checknodes"
      :search="true"
      :data="data"
      :checkbox="true"
      :expand-keys="expandKeys"
      @edit="onEdit"
      @create="onCreate"
    >
      <template #item="{ data, node }">
        <div class="flex justify-between w-full">
          <div>{{ data.label }}</div>
          <div
            class="flex gap-x-2 text-white items-center"
            @click.stop="onOperate($event, data, node)"
          >
            <div data-type="edit" class="bg-info">编辑</div>
            <div data-type="add" class="bg-primary">添加</div>
            <div data-type="remove" class="bg-danger">删除</div>
          </div>
        </div>
      </template>
    </common-tree>
    <common-markdown-editor v-model="value"></common-markdown-editor>
  </div>
</template>

<script setup lang="ts">
const data = ref([
  {
    id: 1,
    label: '测试',
    slot: 'item',
    children: [
      {
        id: 2,
        label: '存储',
        slot: 'item',
      },
      {
        id: 3,
        label: '物流',
        slot: 'item',
        editing: true,
      },
      {
        id: 4,
        label: '烧烤',
        slot: 'item',
      },
    ],
  },
])
const value = ref('hello')
const checknodes = ref([4])
const expandKeys = ref([1])

const treeRef = ref()
function onOperate(
  evt: MouseEvent,
  data: Record<string, unknown>,
  node: Record<string, unknown>,
) {
  const { type } = (evt.target as HTMLElement).dataset
  switch (type) {
    case 'edit':
      data.editing = true
      break
    case 'remove':
      treeRef?.value?.remove?.(data.id)
      break
    case 'add':
      node.expanded = true
      treeRef?.value?.append?.(
        {
          id: 123,
          label: '新建',
          slot: 'item',
        },
        data.id,
      )
      break
  }
}

function onEdit(data: Record<string, unknown>, cb: (bool?: boolean) => void) {
  console.log(data)
  setTimeout(() => {
    cb?.(true)
  }, 3000)
}

function onCreate(data: Record<string, unknown>, cb: (bool?: boolean) => void) {
  console.log(data)
  setTimeout(() => {
    cb?.(true)
  }, 3000)
}
</script>
