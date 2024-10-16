export const FormList = [
  {
    label: '分类名称',
    prop: 'name',
    component: 'CommonInput',
    placeholder: '请输入分类名称',
  },
  {
    label: '上级分类',
    prop: 'parent',
    component: 'CommonSelect',
  },
  {
    label: '数量单位',
    prop: 'unit',
    component: 'CommonInput',
  },
  {
    label: '排序',
    prop: 'sort',
    component: 'CommonInput',
    type: 'number',
  },
  {
    label: '是否显示',
    prop: 'enabled',
    component: 'CommonSwitch',
  },
  {
    label: '分类图标',
    prop: 'logo',
    slot: 'logo',
  },
  {
    label: '关联属性',
    prop: 'relation',
    slot: 'relation',
  },
  {
    label: '关键词',
    prop: 'keywords',
    component: 'CommonInput',
  },
  {
    label: '分类描述',
    prop: 'description',
    component: 'CommonInput',
  },
]
