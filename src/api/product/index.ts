import { GET, POST, PUT, DELETE } from '../index'
import { useRequest, Options } from 'vue-request'

export function getProductList(
  options: Options<
    Record<string, unknown>[],
    [params: Record<string, unknown>]
  >,
) {
  return useRequest(
    (params: Record<string, unknown>) =>
      GET<Record<string, unknown>[]>('/product/list', '获取商品列表', params),
    options,
  )
}

export function getProductInfo(
  options: Options<Record<string, unknown>, [id: string]>,
) {
  return useRequest(
    (id: string) =>
      GET<Record<string, unknown>>(`/product/${id}/`, '获取商品详情'),
    options,
  )
}

export function postProduct(
  options: Options<Record<string, unknown>, [data: Record<string, unknown>]>,
) {
  return useRequest(
    (data: Record<string, unknown>) =>
      POST<Record<string, unknown>>(`/product`, '创建商品', data),
    options,
  )
}

export function putProduct(
  options: Options<Record<string, unknown>, [data: Record<string, unknown>]>,
) {
  return useRequest(
    (data: Record<string, unknown>) =>
      PUT<Record<string, unknown>>(`/product`, '修改商品', data),
    options,
  )
}

export function deleteProduct(
  options: Options<Record<string, unknown>, [id: string]>,
) {
  return useRequest(
    (id: string) =>
      DELETE<Record<string, unknown>>(`/product/${id}`, '删除商品'),
    options,
  )
}
