import { GET, POST, PUT, DELETE } from '../index'

interface IReasonList {
  list: Record<string, unknown>[]
  total: number
}

import { useRequest, Options } from 'vue-request'

export function getReasonList(
  options: Options<IReasonList, [params: Record<string, unknown>]>,
) {
  return useRequest(
    (params: Record<string, unknown>) =>
      GET<IReasonList>('/reason/list', '获取退货原因列表', params),
    options,
  )
}

export function postReason(
  options: Options<Record<string, unknown>, [data: Record<string, unknown>]>,
) {
  return useRequest(
    (data: Record<string, unknown>) =>
      POST<Record<string, unknown>>(`/reason`, '创建退货原因', data),
    options,
  )
}

export function putReason(
  options: Options<Record<string, unknown>, [data: Record<string, unknown>]>,
) {
  return useRequest(
    (data: Record<string, unknown>) =>
      PUT<Record<string, unknown>>(`/reason`, '修改退货原因', data),
    options,
  )
}

export function deleteReturn(
  options: Options<Record<string, unknown>, [id: string]>,
) {
  return useRequest(
    (id: string) =>
      DELETE<Record<string, unknown>>(`/reason/${id}`, '删除退货原因'),
    options,
  )
}
