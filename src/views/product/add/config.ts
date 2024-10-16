export const InfoFormList = [
  {
    label: '商品类目',
    prop: 'catalog',
    component: 'CommonSelect',
    placeholder: '请选择商品类目',
  },
  {
    label: '商品名称',
    prop: 'name',
    component: 'CommonInput',
    placeholder: '请输入商品名称',
  },
  {
    label: '副标题',
    prop: 'subname',
    component: 'CommonInput',
    placeholder: '请输入副标题',
  },
  {
    label: '商品介绍',
    prop: 'motto',
    component: 'CommonInput',
    type: 'textarea',
    rows: 2,
    placeholder: '请输入商品介绍',
  },
  {
    label: '商品货号',
    prop: 'itemnumber',
    component: 'CommonInput',
    placeholder: '请输入商品货号',
  },
  {
    label: '商品售价',
    prop: 'sale',
    component: 'CommonInput',
    placeholder: '请输入商品售价',
  },
  {
    label: '市场价',
    prop: 'marketsale',
    component: 'CommonInput',
    placeholder: '请输入市场价',
  },
  {
    label: '商品库存',
    prop: 'stock',
    component: 'CommonInput',
    placeholder: '请输入商品库存',
  },
  {
    label: '计量单位',
    prop: 'unit',
    component: 'CommonInput',
    placeholder: '请输入计量单位',
  },
  {
    label: '商品重量',
    prop: 'weight',
    component: 'CommonInput',
    placeholder: '请输入商品重量',
  },
  {
    label: '商品排序',
    prop: 'sort',
    component: 'CommonInput',
    placeholder: '请输入商品排序',
  },
]

export const MarketFormList = [
  {
    label: '赠送积分',
    prop: 'givescore',
    component: 'CommonInput',
    placeholder: '请输入赠送积分',
    type: 'number',
  },
  {
    label: '积分购买限制',
    prop: 'limitscore',
    component: 'CommonInput',
    placeholder: '请输入积分购买限制',
    type: 'number',
  },
  {
    label: '商品上架',
    prop: 'status',
    component: 'CommonSwitch',
  },
  {
    label: '新品',
    prop: 'new',
    component: 'CommonSwitch',
  },
  {
    label: '推荐',
    prop: 'recommend',
    component: 'CommonSwitch',
  },
  {
    label: '服务保障',
    prop: 'serviceassure',
    component: 'CommonCheck',
    options: [
      {
        label: '无忧退货',
        value: '0',
      },
      {
        label: '快速退款',
        value: '1',
      },
      {
        label: '免费包邮',
        value: '2',
      },
    ],
  },
  {
    label: '详情页标题',
    prop: 'title',
    component: 'CommonInput',
    placeholder: '请输入详情页标题',
  },
  {
    label: '详情页描述',
    prop: 'description',
    component: 'CommonInput',
    placeholder: '请输入详情页描述',
  },
  {
    label: '商品关键字',
    prop: 'keywords',
    component: 'CommonInput',
    placeholder: '请输入商品关键字',
  },
  {
    label: '商品备注',
    prop: 'remark',
    component: 'CommonInput',
    type: 'textarea',
    rows: 2,
    placeholder: '请输入商品备注',
  },
  {
    label: '优惠方式',
    prop: 'vip',
    slot: 'vip',
    position: 'smtop',
  },
]

export const AttributeFormList = [
  {
    label: '商品类型',
    prop: 'type',
    component: 'CommonSelect',
  },
  {
    label: '商品规格',
    prop: 'specification',
    slot: 'specification',
    position: 'smtop',
  },
  {
    label: '规格图片',
    prop: 'image',
    slot: 'image',
  },
  {
    label: '商品属性',
    prop: 'params',
    slot: 'params',
  },
  {
    label: '商品相册',
    prop: 'album',
    slot: 'album',
    position: 'smtop',
  },
  {
    label: '商品详情',
    prop: 'detail',
    slot: 'detail',
    position: 'smtop',
  },
]

export const RelativeFormList = [
  {
    label: '关联专题',
    prop: 'topic',
    slot: 'topic',
    position: 'smtop',
  },
]
export const StepList = [
  {
    id: '1',
    title: '商品信息',
  },
  {
    id: '2',
    title: '商品促销',
  },
  {
    id: '3',
    title: '商品属性',
  },
  {
    id: '4',
    title: '商品关联',
  },
]

export const RankColumnList = [
  {
    label: '数量',
    prop: 'number',
    slot: true,
  },
  {
    label: '折扣',
    prop: 'discount',
    slot: true,
  },
  {
    label: '操作',
    prop: 'operate',
    slot: true,
  },
]

export const FullColumnList = [
  {
    label: '满',
    prop: 'full',
    slot: true,
  },
  {
    label: '立减',
    prop: 'discount',
    slot: true,
  },
  {
    label: '操作',
    prop: 'operate',
    slot: true,
  },
]

export const SkuColumnList = [
  {
    label: '销售价格',
    prop: 'sale',
    slot: true,
  },
  {
    label: '促销价格',
    prop: 'discount',
    slot: true,
  },
  {
    label: '商品库存',
    prop: 'stock',
    slot: true,
  },
  {
    label: '库存预警值',
    prop: 'stockalarm',
    slot: true,
  },
  {
    label: 'SKU编号(货号)',
    prop: 'itemnumber',
    slot: true,
  },
  {
    label: '操作',
    prop: 'operate',
    slot: true,
    width: 80,
    fixed: 'right',
  },
]
