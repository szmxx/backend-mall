// @unocss-include
export const CoreList = [
  {
    name: '订单总数',
    icon: 'i-ion-podium',
    key: 'total_order',
    y_key: 'y_total_order',
    color: 'text-primary',
  },
  {
    name: '销售总额',
    icon: 'i-ion-golf',
    key: 'total_sale',
    y_key: 'y_total_sale',
    unit: '¥',
    color: 'text-danger',
    decimal: 2,
  },
  {
    name: '用户总数',
    icon: 'i-ion-person',
    key: 'total_user',
    y_key: 'y_total_user',
    color: 'text-success',
  },
  {
    name: '访问总量',
    icon: 'i-ion-eye',
    key: 'total_visit',
    y_key: 'y_total_visit',
    color: 'text-warning',
  },
]

export const DealList = [
  {
    name: '用户',
    key: 'user',
    children: [
      {
        name: '待付款订单',
        key: 'penging_pay',
      },
      {
        name: '待确认收货订单',
        key: 'penging_confirm_receipt',
      },
      {
        name: '待评价订单',
        key: 'penging_evalute',
      },
    ],
  },
  {
    name: '商家',
    key: 'merchant',
    children: [
      {
        name: '待发货订单',
        key: 'penging_send',
      },

      {
        name: '待处理退货申请',
        key: 'penging_return_all',
      },
      {
        name: '待处理退款申请',
        key: 'penging_return_pay',
      },
    ],
  },
  {
    name: '物流',
    key: 'logistics',
    children: [
      {
        name: '运输中订单',
        key: 'running_send',
      },
      {
        name: '物流异常订单',
        key: 'running_error',
      },
    ],
  },
]

export const CommodityOverview = [
  {
    name: '已下架',
    key: 'up',
  },
  {
    name: '已上架',
    key: 'down',
  },
  {
    name: '库存紧张',
    key: 'lack',
  },
  {
    name: '全部商品',
    key: 'all',
  },
]

export const UserOverview = [
  {
    name: '已购用户',
    key: 'payed',
  },
  {
    name: '已退用户',
    key: 'returned',
  },
  {
    name: '会员总数',
    key: 'vip',
  },
  {
    name: '用户总数',
    key: 'all',
  },
]

export const ShortCuts = [
  {
    text: '最近一周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: '最近一月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
]
