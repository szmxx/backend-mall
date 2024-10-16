import { GET, PUT, DELETE } from '../index'
import { IPaginationResult } from '@/types/http'
import { useRequest, Options } from 'vue-request'

export function getUserList(
  options: Options<IPaginationResult, [params: Record<string, unknown>]>,
) {
  return useRequest(
    (params: Record<string, unknown>) =>
      GET<IPaginationResult>('/permission/user', '获取用户列表', params),
    options,
  )
}
export function getUserInfo(
  options: Options<Record<string, unknown>, [id: string]>,
) {
  return useRequest(
    (id: string) =>
      GET<Record<string, unknown>>(`/permission/user/${id}/`, '获取用户详情'),
    options,
  )
}

export function putUser(
  options: Options<
    Record<string, unknown>,
    [id: string, data: Record<string, unknown>]
  >,
) {
  return useRequest(
    (id: string, data: Record<string, unknown>) =>
      PUT<Record<string, unknown>>(
        `/permission/user/${id}`,
        '修改用户信息',
        data,
      ),
    options,
  )
}

export function deleteUser(
  options: Options<Record<string, unknown>, [id: string]>,
) {
  return useRequest(
    (id: string) =>
      DELETE<Record<string, unknown>>(`/permission/user/${id}`, '删除用户'),
    options,
  )
}
