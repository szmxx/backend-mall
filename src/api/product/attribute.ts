import { GET, POST, PUT, DELETE } from '../index'

import { useRequest, Options } from 'vue-request'

export function getAttributeList(
  options: Options<
    Record<string, unknown>[],
    [params: Record<string, unknown>]
  >,
) {
  return useRequest(
    (params: Record<string, unknown>) =>
      GET<Record<string, unknown>[]>(
        `/product/attribute/list`,
        '获取商品属性列表',
        params,
      ),
    options,
  )
}

export function getAttributeInfo(
  options: Options<Record<string, unknown>, [id: string]>,
) {
  return useRequest(
    (id: string) =>
      GET<Record<string, unknown>>(
        `/product/attribute/${id}`,
        '获取商品属性详情',
      ),
    options,
  )
}

export function postAttribute(
  options: Options<Record<string, unknown>, [data: Record<string, unknown>]>,
) {
  return useRequest(
    (data: Record<string, unknown>) =>
      POST<Record<string, unknown>>(`/product/attribute`, '创建商品属性', data),
    options,
  )
}

export function putAttribute(
  options: Options<Record<string, unknown>, [data: Record<string, unknown>]>,
) {
  return useRequest(
    (data: Record<string, unknown>) =>
      PUT<Record<string, unknown>>(`/product/attribute`, '修改商品属性', data),
    options,
  )
}

export function deleteAttribute(
  options: Options<Record<string, unknown>, [id: string]>,
) {
  return useRequest(
    (id: string) =>
      DELETE<Record<string, unknown>>(
        `/product/attribute/${id}`,
        '删除商品属性',
      ),
    options,
  )
}
