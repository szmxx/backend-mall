import { setLocale } from '@/locales'
import { useI18n as i18n } from 'vue-i18n'

export const currentLocale = ref(localStorage.getItem('lang') || 'zh-CN')
export async function useLocale(locale: string) {
  currentLocale.value = locale
  await setLocale(locale)
}
export function useI18n() {
  return i18n()
}
