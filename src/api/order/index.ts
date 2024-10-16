import { GET, PUT, DELETE } from '../index'

interface IOrderList {
  list: Record<string, unknown>[]
  total: number
}

import { useRequest, Options } from 'vue-request'

export function getOrderList(
  options: Options<IOrderList, [params: Record<string, unknown>]>,
) {
  return useRequest(
    (params: Record<string, unknown>) =>
      GET<IOrderList>('/order/list', '获取订单列表', params),
    options,
  )
}
export function getOrderInfo(
  options: Options<Record<string, unknown>, [id: string]>,
) {
  return useRequest(
    (id: string) =>
      GET<Record<string, unknown>>(`/order/${id}/`, '获取订单详情'),
    options,
  )
}

export function putOrder(
  options: Options<Record<string, unknown>, [data: Record<string, unknown>]>,
) {
  return useRequest(
    (data: Record<string, unknown>) =>
      PUT<Record<string, unknown>>(`/order`, '修改订单', data),
    options,
  )
}

export function deleteOrder(
  options: Options<Record<string, unknown>, [id: string]>,
) {
  return useRequest(
    (id: string) => DELETE<Record<string, unknown>>(`/order/${id}`, '删除订单'),
    options,
  )
}
