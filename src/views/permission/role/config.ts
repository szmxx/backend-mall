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
    label: '角色名称',
    prop: 'name',
  },
  {
    label: '角色描述',
    prop: 'description',
  },
  {
    label: '用户数',
    prop: 'number',
  },
  {
    label: '创建时间',
    prop: 'created_at',
    slot: true,
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
    width: 180,
    fixed: 'right',
  },
]

export const StatusList = [
  {
    label: '正常',
    value: 1,
  },
  {
    label: '关闭',
    value: 2,
  },
]

export const StatusMap = StatusList.reduce(
  (acc: Record<string, unknown>, cur) => {
    acc[cur.value] = cur
    return acc
  },
  {},
)

export const FormList = [
  {
    label: '角色名称',
    prop: 'name',
    component: 'CommonInput',
    placeholder: '请输入角色名称',
  },
  {
    label: '角色状态',
    prop: 'status',
    component: 'CommonSelect',
    options: StatusList,
  },
]

export const RoleFormList = [
  {
    label: '角色名称',
    prop: 'name',
    component: 'CommonInput',
    placeholder: '请输入角色名称',
  },
  {
    label: '角色描述',
    prop: 'description',
    component: 'CommonInput',
    placeholder: '请输入角色描述',
    type: 'textarea',
    row: 4,
  },
  {
    label: '角色状态',
    prop: 'status',
    component: 'CommonSwitch',
    options: [1, 2],
  },
]

export const RoleFormRules = {
  name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
}
