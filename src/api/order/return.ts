import { GET, DELETE } from '../index'

interface IReturnList {
  list: Record<string, unknown>[]
  total: number
}

import { useRequest, Options } from 'vue-request'

export function getReturnList(
  options: Options<IReturnList, [params: Record<string, unknown>]>,
) {
  return useRequest(
    (params: Record<string, unknown>) =>
      GET<IReturnList>('/return/list', '获取退货申请列表', params),
    options,
  )
}

export function getReturnInfo(
  options: Options<Record<string, unknown>, [id: string]>,
) {
  return useRequest(
    (id: string) =>
      GET<Record<string, unknown>>(`/return/${id}/`, '获取退货申请详情'),
    options,
  )
}

export function deleteReturn(
  options: Options<Record<string, unknown>, [id: string]>,
) {
  return useRequest(
    (id: string) =>
      DELETE<Record<string, unknown>>(`/return/${id}`, '删除退货申请'),
    options,
  )
}
