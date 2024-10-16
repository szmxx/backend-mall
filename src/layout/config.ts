export const ColorList = ['255, 165, 0', '255, 102, 102']

export const SettingList = [
  {
    name: '模式',
    key: 'mode',
  },
  {
    name: '主题',
    key: 'color',
  },
  {
    name: '大小',
    key: 'size',
  },
  {
    name: '语言（切换将会刷新页面）',
    key: 'lang',
  },
]

export const SizeList = [
  {
    name: '特大号',
    value: '18px',
  },
  {
    name: '大号',
    value: '16px',
  },
  {
    name: '默认',
    value: '14px',
  },
  {
    name: '小号',
    value: '13px',
  },
  {
    name: '特小号',
    value: '12px',
  },
]

export const LangList = [
  {
    name: '中文',
    value: 'zh-CN',
  },
  {
    name: '英文',
    value: 'en-US',
  },
]

// @unocss-include
export const ModeList = [
  {
    name: '白天',
    value: 'light',
    icon: 'i-ion-sunny',
  },
  {
    name: '系统',
    value: 'auto',
    icon: 'i-ion-desktop-outline',
  },
  {
    name: '夜晚',
    value: 'dark',
    icon: 'i-ion-moon',
  },
]

export const FuncList = [
  {
    name: '个人中心',
    path: 'UserIndex',
  },
  {
    name: '系统设置',
    path: '/setting',
  },
  {
    name: '退出登录',
    path: '/login',
  },
]

export const ToolList = [
  {
    name: '重新加载页面',
    path: 'reload',
    icon: 'i-ion-md-refresh',
  },
  {
    name: '关闭当前页面',
    path: 'current',
    icon: 'i-ion-close',
  },
  {
    name: '关闭左侧页面',
    path: 'left',
    icon: 'i-ion-arrow-left-c',
  },
  {
    name: '关闭右侧页面',
    path: 'right',
    icon: 'i-ion-arrow-right-c',
  },
  {
    name: '关闭全部页面',
    path: 'all',
    icon: 'i-ion-md-remove-circle-outline',
  },
]
