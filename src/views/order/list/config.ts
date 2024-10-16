export const TypeList = [
  {
    label: '批量发货',
    value: 'send',
  },
  {
    label: '关闭订单',
    value: 'close',
  },
  {
    label: '删除订单',
    value: 'remove',
  },
]

export const ColumnList = [
  {
    type: 'selection',
  },
  {
    type: 'index',
    label: '编号',
    width: 80,
  },
  {
    label: '订单编号',
    prop: 'itemnumber',
    slot: true,
  },
  {
    label: '创建时间',
    prop: 'time',
  },
  {
    label: '用户账号',
    prop: 'account',
  },
  {
    label: '订单金额',
    prop: 'price',
    slot: true,
  },
  {
    label: '支付方式',
    prop: 'payway',
    slot: true,
  },
  {
    label: '订单来源',
    prop: 'origin',
    slot: true,
  },
  {
    label: '订单状态',
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

export const OrderStatusList = [
  {
    label: '待付款',
    value: '0',
  },
  {
    label: '待发货',
    value: '1',
  },
  {
    label: '已发货',
    value: '2',
  },
  {
    label: '已完成',
    value: '3',
  },
  {
    label: '已关闭',
    value: '4',
  },
]

export const OrderStatusMap = OrderStatusList.reduce(
  (acc: Record<string, unknown>, cur) => {
    acc[cur.value] = cur
    return acc
  },
  {},
)

export const OrderOriginList = [
  {
    label: 'PC订单',
    value: '0',
  },
  {
    label: 'APP订单',
    value: '1',
  },
]

export const OrderTypeList = [
  {
    label: '正常订单',
    value: '0',
  },
  {
    label: '秒杀订单',
    value: '1',
  },
]

export const FormList = [
  {
    label: '订单编号',
    prop: 'itemnumber',
    component: 'CommonInput',
    placeholder: '请输入订单编号',
  },
  {
    label: '收货人账户',
    prop: 'target',
    component: 'CommonInput',
    placeholder: '请输入收货人账户',
  },
  {
    label: '创建时间',
    prop: 'created_at',
    component: 'CommonDate',
  },
  {
    label: '订单状态',
    prop: 'status',
    component: 'CommonSelect',
    options: OrderStatusList,
  },
  {
    label: '订单分类',
    prop: 'type',
    component: 'CommonSelect',
    options: OrderTypeList,
  },
  {
    label: '订单来源',
    prop: 'origin',
    component: 'CommonSelect',
    options: OrderOriginList,
  },
]
