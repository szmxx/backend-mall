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
    label: '资源名称',
    prop: 'name',
  },
  {
    label: '资源路径',
    prop: 'path',
  },
  {
    label: '资源描述',
    prop: 'description',
  },
  {
    label: '创建时间',
    prop: 'created_at',
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
    label: '正常',
    value: '1',
  },
  {
    label: '屏蔽',
    value: '2',
  },
]

export const StatusMap = StatusList.reduce(
  (acc: Record<string, Record<string, unknown>>, cur) => {
    acc[cur.value] = cur
    return acc
  },
  {},
)

export const FormList = [
  {
    label: '资源名称',
    prop: 'name',
    component: 'CommonInput',
    placeholder: '请输入资源名称',
  },
  {
    label: '资源路径',
    prop: 'path',
    component: 'CommonInput',
    placeholder: '请输入资源路径',
  },
  {
    label: '资源分类',
    prop: 'catalog',
    component: 'CommonSelect',
    placeholder: '请输入资源分类',
  },
]
