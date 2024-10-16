<template>
  <template v-if="column.children?.length">
    <el-table-column
      v-show="column.show !== false"
      :align="align"
      v-bind="omit(column, 'children')"
    >
      <column-item
        v-for="item in column.children"
        :key="item.prop"
        :column="item"
        :align="align"
      ></column-item>
    </el-table-column>
  </template>
  <template v-else>
    <el-table-column
      v-show="column.show !== false"
      :align="align"
      v-bind="column"
    >
      <template v-if="!column.type" #default="scope">
        <template v-if="'render' in column">
          <table-render
            :scope="scope"
            :render="column.render as any"
          ></table-render>
        </template>
        <template v-else-if="'slot' in column">
          <table-slot :scope="scope" :column="column"></table-slot>
        </template>
        <template v-else>{{ scope.row[column?.prop as string] }}</template>
      </template>
    </el-table-column>
  </template>
</template>

<script setup lang="ts">
import TableRender from './render'
import TableSlot from './slot'
import { IColumnItem } from './types'
import { omit } from 'lodash-es'

defineProps({
  column: {
    type: Object as PropType<IColumnItem>,
    default: () => {
      return {}
    },
  },
  align: {
    type: String,
    default: 'center',
  },
})
</script>
