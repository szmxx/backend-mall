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
    label: '菜单名称',
    prop: 'name',
  },
  {
    label: '菜单层级',
    prop: 'description',
  },
  {
    label: '菜单图标',
    prop: 'icon',
  },
  {
    label: '是否显示',
    prop: 'enabled',
    slot: true,
  },
  {
    label: '排序',
    prop: 'sort',
    slot: true,
  },
  {
    label: '操作',
    prop: 'operate',
    slot: true,
    width: 120,
    fixed: 'right',
  },
]

export const StatusList = [
  {
    label: '开启',
    value: 1,
  },
  {
    label: '关闭',
    value: 2,
  },
]

export const StatusMap = StatusList.reduce(
  (acc: Record<string, unknown>, cur) => {
    acc[cur.value] = cur
    return acc
  },
  {},
)

export const FormList = [
  {
    label: '名称',
    prop: 'name',
    component: 'CommonInput',
    placeholder: '请输入名称',
  },
  {
    label: '状态',
    prop: 'status',
    component: 'CommonSelect',
    options: StatusList,
  },
]
