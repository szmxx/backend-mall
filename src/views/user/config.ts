export const FormList = [
  {
    label: '用户昵称',
    prop: 'nickname',
    component: 'CommonInput',
    placeholder: '请输入用户昵称',
  },
  {
    label: '用户角色',
    prop: 'role',
    slot: 'role',
  },
  {
    label: '安全设置',
    prop: 'security',
    slot: 'security',
  },
]

export const FormRules = {
  nickname: [{ required: true, message: '请输入用户昵称', trigger: 'blur' }],
  role: [{ required: true, message: '请选择用户角色', trigger: 'blur' }],
}

export const PwdFormList = [
  {
    label: '旧密码',
    prop: 'old',
    component: 'CommonInput',
    placeholder: '请输入旧密码',
  },
  {
    label: '新密码',
    prop: 'new',
    component: 'CommonInput',
    placeholder: '请输入新密码',
  },
  {
    label: '确认密码',
    prop: 'confirm',
    component: 'CommonInput',
    placeholder: '请输入确认密码',
  },
]

export const PwdFormRules = {
  old: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
  new: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
  confirm: [{ required: true, message: '请输入确认密码', trigger: 'blur' }],
}

export const EmailFormList = [
  {
    label: '新邮箱',
    prop: 'new',
    slot: 'new',
  },
  {
    label: '验证码',
    prop: 'code',
    component: 'CommonInput',
    placeholder: '请输入验证码',
  },
  {
    label: '当前密码',
    prop: 'password',
    component: 'CommonInput',
    placeholder: '请输入当前密码',
    type: 'password',
  },
]

export const EmailFormRules = {
  new: [{ required: true, message: '请输入新邮箱', trigger: 'blur' }],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
  password: [{ required: true, message: '请输入当前密码', trigger: 'blur' }],
}

export const UserList = [
  {
    name: '登录账户',
    key: 'username',
  },
  {
    name: '用户昵称',
    key: 'nickname',
  },
  {
    name: '用户角色',
    key: 'role',
  },
  {
    name: '用户邮箱',
    key: 'email',
  },
]
