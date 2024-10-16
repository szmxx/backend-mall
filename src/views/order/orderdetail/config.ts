export const StepList = [
  {
    id: '1',
    title: '提交订单',
  },
  {
    id: '2',
    title: '支付订单',
  },
  {
    id: '3',
    title: '平台发货',
  },
  {
    id: '4',
    title: '确认收货',
  },
  {
    id: '5',
    title: '完成评价',
  },
]

export const BasicColumnList = [
  {
    label: '订单编号',
    prop: 'itemnumber',
  },
  {
    label: '发货单流水号',
    prop: 'number',
  },
  {
    label: '用户账户',
    prop: 'account',
  },
  {
    label: '支付方式',
    prop: 'payway',
  },
  {
    label: '订单来源',
    prop: 'origin',
  },
  {
    label: '订单类型',
    prop: 'type',
  },
  {
    label: '配送方式',
    prop: 'sendway',
  },
  {
    label: '物流单号',
    prop: 'sendnumber',
  },
  {
    label: '自动确认收货时间',
    prop: 'sendway',
  },
  {
    label: '订单可得优币',
    prop: 'sendway',
  },
  {
    label: '订单可得成长值',
    prop: 'sendway',
  },
  {
    label: '活动信息',
    prop: 'sendway',
  },
]

export const PayColumnList = [
  {
    label: '商品合计',
    prop: 'total',
  },
  {
    label: '运费',
    prop: 'send',
  },
  {
    label: '优惠券',
    prop: 'send',
  },
  {
    label: '积分抵扣',
    prop: 'send',
  },
  {
    label: '活动优惠',
    prop: 'send',
  },
  {
    label: '折扣金额',
    prop: 'send',
  },
  {
    label: '订单总金额',
    prop: 'send',
  },
  {
    label: '应付款金额',
    prop: 'send',
  },
]

export const ReceiverColumnList = [
  {
    label: '订单编号',
    prop: 'itemnumber',
  },
  {
    label: '发货单流水号',
    prop: 'itemnumber',
  },
]

export const CommodityColumnList = [
  {
    label: '商品图片',
    prop: 'image',
    slot: true,
  },
  {
    label: '商品名称',
    prop: 'name',
  },
  {
    label: '价格/货号',
    prop: 'name',
  },
  {
    label: '规格',
    prop: 'specification',
  },
  {
    label: '数量',
    prop: 'number',
  },
  {
    label: '价格',
    prop: 'price',
  },
]

export const OperateColumnList = [
  {
    label: '操作者',
    prop: 'user',
  },
  {
    label: '操作时间',
    prop: 'time',
  },
  {
    label: '订单状态',
    prop: 'status',
  },
  {
    label: '付款状态',
    prop: 'paystatus',
  },
  {
    label: '发货状态',
    prop: 'sendstatus',
  },
  {
    label: '备注',
    prop: 'remark',
  },
]
