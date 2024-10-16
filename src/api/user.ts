import { POST, PUT } from './index'
import { useRequest, Options } from 'vue-request'

interface ILoginParams {
  username: string
  password?: string
  email?: string
}

export interface IUser {
  username: string
  avatar: string
  [key: string]: string
}

export function login(data: ILoginParams) {
  return POST<string>(`/user/login`, '登录账户', data)
}

export function register(
  options: Options<Record<string, unknown>, [data: ILoginParams]>,
) {
  return useRequest(
    (data: ILoginParams) =>
      POST<Record<string, unknown>>(`/user/register`, '注册账户', data),
    options,
  )
}

export function forget(
  options: Options<Record<string, unknown>, [data: ILoginParams]>,
) {
  return useRequest(
    (data: ILoginParams) =>
      POST<Record<string, unknown>>(`/user/forget`, '忘记密码', data),
    options,
  )
}

export function putUserInfo(
  options: Options<Record<string, unknown>, [data: IUser]>,
) {
  return useRequest(
    (data: IUser) =>
      PUT<Record<string, unknown>>('/user/info', '修改用户信息', data),
    options,
  )
}
