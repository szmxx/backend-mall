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
    label: '广告名称',
    prop: 'name',
  },
  {
    label: '广告位置',
    prop: 'position',
    slot: true,
  },
  {
    label: '广告图片',
    prop: 'image',
    slot: true,
  },
  {
    label: '广告时间',
    prop: 'time',
    slot: true,
  },
  {
    label: '上线/下线',
    prop: 'enabled',
    slot: true,
  },
  {
    label: '点击次数',
    prop: 'number',
  },
  {
    label: '生成订单',
    prop: 'order',
  },
  {
    label: '操作',
    prop: 'operate',
    slot: true,
    width: 120,
    fixed: 'right',
  },
]

export const PositionList = [
  {
    label: '全部',
    value: '0',
  },
  {
    label: 'PC首页轮播',
    value: '1',
  },
  {
    label: 'APP首页轮播',
    value: '2',
  },
]

export const PositionMap = PositionList.reduce(
  (acc: Record<string, unknown>, cur) => {
    acc[cur.value] = cur
    return acc
  },
  {},
)

export const FormList = [
  {
    label: '广告名称',
    prop: 'name',
    component: 'CommonInput',
    placeholder: '请输入广告名称',
  },
  {
    label: '广告位置',
    prop: 'position',
    component: 'CommonSelect',
    options: PositionList,
  },
  {
    label: '广告时间',
    prop: 'time',
    component: 'CommonDate',
  },
]
