interface IListItem {
  label: string
  value: string | number
  children?: IListItem[]
}
export interface IFormItem {
  prop: string
  component?: string
  label?: string
  value?: unknown
  width?: string
  options?: IListItem[]
  slot?: string
  [key: string]: unknown
}
