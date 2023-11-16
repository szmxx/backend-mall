/*
 * @Author: cola
 * @Date: 2023-09-10 15:39:10
 * @LastEditors: cola
 * @Description:
 */
import { createI18n } from 'vue-i18n'
const files = import.meta.glob('./lang/*/index.ts')
import { IModule } from './types'

const currentLocale = localStorage.getItem('lang') || 'zh-CN'

const i18n = createI18n({
  globalInjection: true,
  mode: 'composition',
  allowComposition: true,
  legacy: false,
  fallbackLocale: 'zh-CN',
  locale: '',
})

setLocale(currentLocale, true)

export async function setLocale(locale: string, bool?: boolean) {
  if (!i18n.global.availableLocales.includes(locale) || bool)
    await loadAsyncLocale(locale)
  document.querySelector('html')?.setAttribute('lang', locale)
  // axios.defaults.headers.common['Accept-Language'] = locale
  localStorage.setItem('lang', locale)
  i18n.global.locale.value = locale
}

export async function loadAsyncLocale(locale: string) {
  const module = files[`./lang/${locale}/index.ts`]
  const messages = (await module()) as IModule
  i18n.global.setLocaleMessage(locale, messages.default)
}

export default i18n
