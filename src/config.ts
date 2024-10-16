import {
  initAxiosInstance,
  initBusinessInstance,
  AxiosConfig,
} from '@/api/index'
import { getAppConfig, AppConfig } from '@/api/public'
import useStore from '@/store/app'

export const ENV_LIST = ['development', 'production']
export const AUTH_ROUTE_WHITELIST = ['/login']
export const REFRESH_API_WHITELIST = ['/api/auth/refreshToken']
export const AUTH_API_WHITELIST = ['/user/login', '/api/auth/refreshToken']

function getFullConfig(config: AppConfig): AppConfig {
  const res = Object.keys(config).reduce(
    (acc: Record<string, unknown>, cur: string) => {
      if (!ENV_LIST.includes(cur)) {
        acc[cur] = config[cur]
      }
      return acc
    },
    {},
  )
  Object.assign(res, config[import.meta.env.MODE])
  return res as AppConfig
}
export default async () => {
  const store = useStore()
  const config = await getAppConfig()
  const envConfig = config[import.meta.env.MODE] as AxiosConfig
  initAxiosInstance(envConfig)
  initBusinessInstance(envConfig)
  const fullConfig = getFullConfig(config)
  store.setConfig(fullConfig)
}
