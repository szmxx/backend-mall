import { GET, POST, PUT, DELETE } from '../index'

import { useRequest, Options } from 'vue-request'

export function getSpecificationList(
  options: Options<
    Record<string, unknown>[],
    [params: Record<string, unknown>]
  >,
) {
  return useRequest(
    (params: Record<string, unknown>) =>
      GET<Record<string, unknown>[]>(
        `/product/specification/list`,
        '获取商品规格列表',
        params,
      ),
    options,
  )
}

export function getSpecificationInfo(
  options: Options<Record<string, unknown>, [id: string]>,
) {
  return useRequest(
    (id: string) =>
      GET<Record<string, unknown>>(
        `/product/specification/${id}`,
        '获取商品规格详情',
      ),
    options,
  )
}

export function postSpecification(
  options: Options<Record<string, unknown>, [data: Record<string, unknown>]>,
) {
  return useRequest(
    (data: Record<string, unknown>) =>
      POST<Record<string, unknown>>(
        `/product/specification`,
        '创建商品规格',
        data,
      ),
    options,
  )
}

export function putSpecification(
  options: Options<Record<string, unknown>, [data: Record<string, unknown>]>,
) {
  return useRequest(
    (data: Record<string, unknown>) =>
      PUT<Record<string, unknown>>(
        `/product/specification`,
        '修改商品规格',
        data,
      ),
    options,
  )
}

export function deleteSpecification(
  options: Options<Record<string, unknown>, [id: string]>,
) {
  return useRequest(
    (id: string) =>
      DELETE<Record<string, unknown>>(
        `/product/specification/${id}`,
        '删除商品规格',
      ),
    options,
  )
}
