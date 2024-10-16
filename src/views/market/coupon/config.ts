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
    label: '优惠券名称',
    prop: 'name',
  },
  {
    label: '优惠券类型',
    prop: 'type',
    slot: true,
  },
  {
    label: '可使用商品',
    prop: 'enabled',
    slot: true,
  },
  {
    label: '使用门槛',
    prop: 'enabled',
  },
  {
    label: '面值',
    prop: 'enabled',
  },
  {
    label: '适用平台',
    prop: 'enabled',
  },
  {
    label: '有效期',
    prop: 'time',
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

export const CouponTypeList = [
  {
    label: '全场赠券',
    value: '1',
  },
  {
    label: '会员赠券',
    value: '2',
  },
  {
    label: '购物赠券',
    value: '3',
  },
  {
    label: '注册赠券',
    value: '4',
  },
]

export const CouponTypeMap = CouponTypeList.reduce(
  (acc: Record<string, unknown>, cur) => {
    acc[cur.value] = cur
    return acc
  },
  {},
)

export const FormList = [
  {
    label: '优惠券名称',
    prop: 'name',
    component: 'CommonInput',
    placeholder: '请输入优惠券名称',
  },
  {
    label: '优惠券类型',
    prop: 'type',
    component: 'CommonSelect',
    options: CouponTypeList,
  },
  {
    label: '优惠券状态',
    prop: 'status',
    component: 'CommonSelect',
    options: StatusList,
  },
]
