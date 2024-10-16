export interface ITree {
  [key: string]: any
}

export interface ITreeItem {
  id: string
  label: string
  slot?: boolean
  editing?: boolean
  disabled?: boolean
  loading?: boolean
  creating?: boolean
  children?: ITreeItem[]
}
