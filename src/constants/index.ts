import { InjectionKey } from 'vue'

export const APP_SETTING = 'APP_SETTING'

export const TOKEN_KEY = 'token'
export const REFRESH_KEY = 'refresh_token'

export const INSTANCE_PREVIEW_KEY: InjectionKey<InstanceType<typeof Set>> =
  Symbol('InstancePreviewKey')

export const CHART_MODE = {
  NORMAL: 'NORMAL',
  PERFORMANCE: 'PERFORMANCE',
}
