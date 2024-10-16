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
    label: '账户',
    prop: 'username',
  },
  {
    label: '昵称',
    prop: 'nickname',
  },
  {
    label: '邮箱',
    prop: 'email',
  },
  {
    label: '创建时间',
    prop: 'created_at',
    slot: true,
  },
  {
    label: '最后登录',
    prop: 'lastlogintime',
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
    fixed: 'right',
    width: 160,
  },
]

export const StatusList = [
  {
    label: '正常',
    value: 1,
  },
  {
    label: '屏蔽',
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
    label: '账户/昵称',
    prop: 'name',
    component: 'CommonInput',
    placeholder: '请输入账户/昵称',
  },
  {
    label: '用户状态',
    prop: 'status',
    component: 'CommonSelect',
    options: StatusList,
    number: true,
  },
]

export const UserFormList = [
  {
    label: '账户',
    prop: 'username',
    component: 'CommonInput',
    placeholder: '请输入账户',
  },
  {
    label: '昵称',
    prop: 'nickname',
    component: 'CommonInput',
    placeholder: '请输入昵称',
  },
  {
    label: '邮箱',
    prop: 'email',
    component: 'CommonInput',
    placeholder: '请输入邮箱',
    type: 'email',
  },
  {
    label: '备注',
    prop: 'remark',
    component: 'CommonInput',
    placeholder: '请输入备注',
    type: 'textarea',
    row: 2,
  },
  {
    label: '状态',
    prop: 'status',
    component: 'CommonSelect',
    options: StatusList,
  },
]

export const UserFormRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    {
      type: 'email',
      message: '请输入正确的邮箱',
      trigger: ['blur', 'change'],
    },
  ],
}
