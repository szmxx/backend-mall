export interface IColumnItem {
  label?: string
  prop?: string
  type?: string
  slot?: boolean
  render?: (arg: Record<string, Record<string, unknown>>) => unknown
  children?: IColumnItem[]
  [key: string]: unknown
}
