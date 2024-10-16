import { GET, PUT, DELETE } from '../index'
import { IPaginationResult } from '@/types/http'
import { useRequest, Options } from 'vue-request'

export function getResourceList(
  options: Options<IPaginationResult, [params: Record<string, unknown>]>,
) {
  return useRequest(
    (params: Record<string, unknown>) =>
      GET<IPaginationResult>('/permission/resource', '获取资源列表', params),
    options,
  )
}

export function putResource(
  options: Options<Record<string, unknown>, [data: Record<string, unknown>]>,
) {
  return useRequest(
    (data: Record<string, unknown>) =>
      PUT<Record<string, unknown>>(
        `/permission/resource`,
        '修改资源信息',
        data,
      ),
    options,
  )
}

export function deleteResource(
  options: Options<Record<string, unknown>, [id: string]>,
) {
  return useRequest(
    (id: string) =>
      DELETE<Record<string, unknown>>(`/permission/resource/${id}`, '删除资源'),
    options,
  )
}
