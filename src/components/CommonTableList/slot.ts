import { injectStrict } from '@/utils'
import { InstanceKey } from './constants'
interface PropTypeItem {
  scope: Record<string, Record<string, unknown>>
  columnData: Record<string, string>
}
export default function TableSlot(props: PropTypeItem) {
  const root = injectStrict(InstanceKey)
  return root?.slots?.[props?.columnData?.prop]?.(props.scope)
}

TableSlot.props = ['scope', 'columnData']
