import { originGet, AxiosConfig } from './index'

export interface AppConfig {
  title: string
  development?: AxiosConfig
  production?: AxiosConfig
  [key: string]: unknown | AxiosConfig
}

export interface IMenu {
  id: string
  title: string
  name: string
  icon: string
  path: string
  type: string
  hidden: boolean
  children?: IMenu[]
}

export function getAppConfig() {
  return originGet<AppConfig>('/static/appConfig.json')
}

export function getMenuConfig() {
  return originGet<IMenu[]>('/static/menu.json')
}
