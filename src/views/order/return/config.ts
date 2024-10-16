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
    label: '服务单号',
    prop: 'number',
  },
  {
    label: '创建时间',
    prop: 'created_at',
  },
  {
    label: '用户账号',
    prop: 'account',
  },
  {
    label: '退款金额',
    prop: 'price',
    slot: true,
  },
  {
    label: '申请状态',
    prop: 'status',
    slot: true,
  },
  {
    label: '处理时间',
    prop: 'time',
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

export const ReturnStatusList = [
  {
    label: '待处理',
    value: '0',
  },
  {
    label: '退货中',
    value: '1',
  },
  {
    label: '已完成',
    value: '2',
  },
  {
    label: '已拒绝',
    value: '3',
  },
]

export const ReturnStatusMap = ReturnStatusList.reduce(
  (acc: Record<string, unknown>, cur) => {
    acc[cur.value] = cur
    return acc
  },
  {},
)

export const FormList = [
  {
    label: '服务单号',
    prop: 'number',
    component: 'CommonInput',
    placeholder: '请输入服务单号',
  },
  {
    label: '退货状态',
    prop: 'status',
    component: 'CommonSelect',
    options: ReturnStatusList,
  },
  {
    label: '创建时间',
    prop: 'created_at',
    component: 'CommonDate',
  },
  {
    label: '处理人员',
    prop: 'user',
    component: 'CommonInput',
  },
  {
    label: '处理时间',
    prop: 'time',
    component: 'CommonDate',
  },
]
