import { GET, POST, PUT, DELETE } from '../index'
import { useRequest, Options } from 'vue-request'
import { IPaginationResult } from '@/types/http'
export function getTypeList(
  options: Options<IPaginationResult, [params: Record<string, unknown>]>,
) {
  return useRequest(
    (params: Record<string, unknown>) =>
      GET<IPaginationResult>(`/product/type/list`, '获取商品所有类型', params),
    options,
  )
}

export function postType(
  options: Options<Record<string, unknown>, [data: Record<string, unknown>]>,
) {
  return useRequest(
    (data: Record<string, unknown>) =>
      POST<Record<string, unknown>>(`/product/type`, '创建商品类型', data),
    options,
  )
}

export function putType(
  options: Options<Record<string, unknown>, [data: Record<string, unknown>]>,
) {
  return useRequest(
    (data: Record<string, unknown>) =>
      PUT<Record<string, unknown>>(`/product/type`, '修改商品类型', data),
    options,
  )
}

export function deleteType(
  options: Options<Record<string, unknown>, [id: string]>,
) {
  return useRequest(
    (id: string) =>
      DELETE<Record<string, unknown>>(`/product/type/${id}`, '删除商品类型'),
    options,
  )
}
