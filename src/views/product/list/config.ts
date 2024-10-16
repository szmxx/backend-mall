export const TypeList = [
  {
    label: '商品上架',
    value: 'up',
  },
  {
    label: '商品下架',
    value: 'down',
  },
  {
    label: '设为推荐',
    value: 'recommend',
  },
  {
    label: '取消推荐',
    value: 'unrecommend',
  },
  {
    label: '设为新品',
    value: 'new',
  },
  {
    label: '取消新品',
    value: 'unnew',
  },
  {
    label: '商品删除',
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
    label: '商品名称',
    prop: 'name',
    slot: true,
  },
  {
    label: '价格',
    prop: 'price',
  },
  {
    label: '销量',
    prop: 'sale',
  },
  {
    label: '商品图片',
    prop: 'image',
    slot: true,
  },
  {
    label: '标签',
    prop: 'label',
    slot: true,
  },
  {
    label: 'SKU库存',
    prop: 'sku',
    slot: true,
  },
  {
    label: '审核状态',
    prop: 'checkstatus',
    slot: true,
  },
  {
    label: '排序',
    prop: 'sort',
  },
  {
    label: '操作',
    prop: 'operate',
    slot: true,
    width: 120,
    fixed: 'right',
  },
]

export const CheckStatusList = [
  {
    label: '全部',
    value: '0',
  },
  {
    label: '未审核',
    value: '1',
    color: 'text-primary',
  },
  {
    label: '通过',
    value: '2',
    color: 'text-success',
  },
  {
    label: '不通过',
    value: '3',
    color: 'text-danger',
  },
]

export const CheckStatusMap = CheckStatusList.reduce(
  (acc: Record<string, unknown>, cur) => {
    acc[cur.value] = cur
    return acc
  },
  {},
)

export const FormList = [
  {
    label: '商品名称',
    prop: 'name',
    component: 'CommonInput',
    placeholder: '请输入商品名称',
  },
  {
    label: '商品货号',
    prop: 'itemnumber',
    component: 'CommonInput',
    placeholder: '请输入商品货号',
  },
  {
    label: '商品分类',
    prop: 'catalog',
    component: 'CommonSelect',
  },
  {
    label: '上架状态',
    prop: 'status',
    component: 'CommonSelect',
    options: [
      {
        label: '全部',
        value: '0',
      },
      {
        label: '上架',
        value: '1',
      },
      {
        label: '下架',
        value: '2',
      },
    ],
  },
  {
    label: '审核状态',
    prop: 'checkstatus',
    component: 'CommonSelect',
    options: CheckStatusList,
  },
]

export const SkuColumnList = [
  {
    label: 'sku编号',
    prop: 'skunumber',
  },
  {
    label: '头部',
    prop: 'head',
  },
  {
    label: '身体',
    prop: 'body',
  },
  {
    label: '销售价格',
    prop: 'sale',
  },
  {
    label: '商品库存',
    prop: 'stock',
  },
  {
    label: '库存预警值',
    prop: 'alarm',
  },
]
