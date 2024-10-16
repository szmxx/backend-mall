export const ColumnList = [
  {
    label: '编号',
    prop: '',
    type: 'index',
    width: 80,
  },
  {
    label: '类型名称',
    prop: 'name',
  },
  {
    label: '属性数量',
    prop: 'attribute',
  },
  {
    label: '参数数量',
    prop: 'params',
  },
  {
    label: '设置',
    prop: 'setting',
    slot: true,
    'min-width': 120,
  },
  {
    label: '操作',
    prop: 'operate',
    slot: true,
    fixed: 'right',
  },
]

export const NameFormList = [
  {
    label: '类型名称',
    prop: 'name',
    component: 'CommonInput',
    placeholder: '请输入类型名称',
  },
]

export const NameFormRules = {
  name: [{ required: true, message: '请输入类型名称', trigger: 'blur' }],
}
