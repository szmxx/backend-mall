import { TOKEN_KEY, REFRESH_KEY } from '@/constants/index'

export function getToken(): string {
  return localStorage.getItem(TOKEN_KEY) || ''
}

export function setToken(value: string) {
  return localStorage.setItem(TOKEN_KEY, value)
}

export function removeToken() {
  return localStorage.removeItem(TOKEN_KEY)
}

export function getRefreshToken(): string {
  return localStorage.getItem(REFRESH_KEY) || ''
}

export function setRefreshToken(value: string) {
  return localStorage.setItem(REFRESH_KEY, value)
}

export function removeRefreshToken() {
  return localStorage.removeItem(REFRESH_KEY)
}
