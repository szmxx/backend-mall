import { GET, PUT, DELETE } from '../index'
import { IPaginationResult } from '@/types/http'
import { useRequest, Options } from 'vue-request'

export function getResourceGroupList(
  options: Options<IPaginationResult, [params: Record<string, unknown>]>,
) {
  return useRequest(
    (params: Record<string, unknown>) =>
      GET<IPaginationResult>('/permission/group', '获取资源组列表', params),
    options,
  )
}

export function putResourceGroup(
  options: Options<Record<string, unknown>, [data: Record<string, unknown>]>,
) {
  return useRequest(
    (data: Record<string, unknown>) =>
      PUT<Record<string, unknown>>(`/permission/group`, '修改资源组信息', data),
    options,
  )
}

export function deleteResourceGroup(
  options: Options<Record<string, unknown>, [id: string]>,
) {
  return useRequest(
    (id: string) =>
      DELETE<Record<string, unknown>>(`/permission/group/${id}`, '删除资源组'),
    options,
  )
}
