import { injectStrict } from '@/utils'
import { InstanceKey } from './constants'
interface PropTypeItem {
  node: Record<string, Record<string, unknown>>
  data: Record<string, string>
}
export default function TreeSlot(props: PropTypeItem) {
  const root = injectStrict(InstanceKey)
  return root?.slots?.[props?.data?.slot]?.({
    data: props.data,
    node: props.node,
  })
}

TreeSlot.props = ['data', 'node']
