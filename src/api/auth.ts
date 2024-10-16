import { POST } from './index'
import { IUser } from './user'

interface IAuth {
  token: string
  refreshToken: string
}

export function refreshToken(data: IAuth) {
  return POST<string>('/auth/refreshToken', '刷新 TOKEN', data)
}

export function sso() {
  return POST<IUser>('/auth/sso', '获取用户信息')
}

export function authorize(code: string) {
  return POST<IAuth>('/auth', '获取用户鉴权', {
    code: code,
  })
}
