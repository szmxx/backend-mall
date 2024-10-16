import { GET, POST, PUT, DELETE } from '../index'

import { useRequest, Options } from 'vue-request'

export function getRoleList(
  options: Options<
    Record<string, unknown>[],
    [params: Record<string, unknown>]
  >,
) {
  return useRequest(
    (params: Record<string, unknown>) =>
      GET<Record<string, unknown>[]>(
        '/permission/role',
        '获取角色列表',
        params,
      ),
    options,
  )
}

export function postRole(
  options: Options<Record<string, unknown>, [data: Record<string, unknown>]>,
) {
  return useRequest(
    (data: Record<string, unknown>) =>
      POST<Record<string, unknown>>(`/permission/role`, '添加角色信息', data),
    options,
  )
}

export function putRole(
  options: Options<
    Record<string, unknown>,
    [id: string, data: Record<string, unknown>]
  >,
) {
  return useRequest(
    (id: string, data: Record<string, unknown>) =>
      PUT<Record<string, unknown>>(
        `/permission/role/${id}`,
        '修改角色信息',
        data,
      ),
    options,
  )
}

export function deleteRole(
  options: Options<Record<string, unknown>, [id: string]>,
) {
  return useRequest(
    (id: string) =>
      DELETE<Record<string, unknown>>(`/permission/role/${id}`, '删除角色'),
    options,
  )
}
