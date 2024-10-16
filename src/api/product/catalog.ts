import { GET, POST, PUT, DELETE } from '../index'
import { useRequest, Options } from 'vue-request'
import { IPaginationResult } from '@/types/http'
export function getCatalogList(
  options: Options<IPaginationResult, [params: Record<string, unknown>]>,
) {
  return useRequest(
    (params: Record<string, unknown>) =>
      GET<IPaginationResult>(
        `/product/catalog/list`,
        '获取商品所有分类',
        params,
      ),
    options,
  )
}

export function getCatalogInfo(
  options: Options<Record<string, unknown>, [id: string]>,
) {
  return useRequest(
    (id: string) =>
      GET<Record<string, unknown>>(
        `/product/catalog/${id}`,
        '获取商品分类详情',
      ),
    options,
  )
}

export function postCatalog(
  options: Options<Record<string, unknown>, [data: Record<string, unknown>]>,
) {
  return useRequest(
    (data: Record<string, unknown>) =>
      POST<Record<string, unknown>>(`/product/catalog`, '创建商品分类', data),
    options,
  )
}

export function putCatalog(
  options: Options<Record<string, unknown>, [data: Record<string, unknown>]>,
) {
  return useRequest(
    (data: Record<string, unknown>) =>
      PUT<Record<string, unknown>>(`/product/catalog`, '修改商品分类', data),
    options,
  )
}

export function deleteCatalog(
  options: Options<Record<string, unknown>, [id: string]>,
) {
  return useRequest(
    (id: string) =>
      DELETE<Record<string, unknown>>(`/product/catalog/${id}`, '删除商品分类'),
    options,
  )
}
