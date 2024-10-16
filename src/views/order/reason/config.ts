export const TypeList = [
  {
    label: '批量删除',
    value: 'remove',
  },
]

export const ColumnList = [
  {
    type: 'selection',
  },
  {
    label: '编号',
    type: 'index',
    width: 80,
  },
  {
    label: '原因设置',
    prop: 'name',
  },
  {
    label: '排序',
    prop: 'sort',
  },
  {
    label: '是否启用',
    prop: 'enabled',
    slot: true,
  },
  {
    label: '创建时间',
    prop: 'created_at',
  },
  {
    label: '操作',
    prop: 'operate',
    slot: true,
    width: 120,
    fixed: 'right',
  },
]
