export const TypeList = [
  {
    label: '设为推荐',
    value: 'recommend',
  },
  {
    label: '取消推荐',
    value: 'unrecommend',
  },
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
    label: '专题名称',
    prop: 'name',
  },
  {
    label: '是否推荐',
    prop: 'enabled',
    slot: true,
  },
  {
    label: '排序',
    prop: 'sort',
  },
  {
    label: '状态',
    prop: 'status',
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
    label: '全部',
    value: '0',
  },
  {
    label: '未推荐',
    value: '1',
  },
  {
    label: '推荐中',
    value: '2',
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
    label: '专题名称',
    prop: 'name',
    component: 'CommonInput',
    placeholder: '请输入专题名称',
  },
  {
    label: '推荐状态',
    prop: 'status',
    component: 'CommonSelect',
    options: StatusList,
  },
]
