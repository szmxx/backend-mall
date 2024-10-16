import { injectStrict } from '@/utils'
import { InstanceKey } from './constants'
import { IFormItem } from './types'

interface PropTypeItem {
  data: IFormItem
  model: Record<string, unknown>
}
export default function FormSlot(props: PropTypeItem) {
  const root = injectStrict(InstanceKey)
  return root?.slots?.[props?.data?.slot as string]?.({
    data: props.data,
    model: props.model,
  })
}

FormSlot.props = ['data', 'model']
