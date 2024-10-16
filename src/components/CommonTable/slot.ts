import { injectStrict } from '@/utils'
import { InstanceKey } from './constants'
import { IColumnItem } from './types'
interface PropTypeItem {
  scope: Record<string, Record<string, unknown>>
  column: IColumnItem
}
export default function TableSlot(props: PropTypeItem) {
  const root = injectStrict(InstanceKey)
  return root?.slots?.[props?.column?.prop as string]?.(props.scope)
}

TableSlot.props = ['scope', 'column']
