import { dayjs } from 'element-plus'
import { InjectionKey } from 'vue'

export function getUrlParams(url = location.href) {
  const search = url.split('?')[1]
  return [...new URLSearchParams(search)].reduce(
    (a: Record<string, string>, [k, v]) => ((a[k] = v), a),
    {},
  )
}
export function toRawType(value: unknown): string {
  return Object.prototype.toString.call(value).slice(8, -1)
}
export function cached(fn: (str: string) => unknown): (str: string) => unknown {
  const cache = Object.create(null)
  return function cachedFn(str: string) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }
}

export function formatMoney(amount: number) {
  return new Intl.NumberFormat('en-US').format(amount)
}

export function injectStrict<T>(key: InjectionKey<T>, fallback?: T) {
  const resolved = inject(key, fallback)
  if (!resolved) {
    console.error(`Could not resolve ${key.description}`)
  }
  return resolved
}

export function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  )
}

export function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export const mixColor = function (
  color1: string,
  color2: string,
  opacity: number,
) {
  let [red1, green1, blue1] = color1.split(',').map(Number) as number[]
  if (opacity === 0) {
    return `rgb(${[red1, green1, blue1].toString()})`
  }
  const red2 = parseInt(color2.slice(1, 3), 16)
  const green2 = parseInt(color2.slice(3, 5), 16)
  const blue2 = parseInt(color2.slice(5, 7), 16)
  red1 += Math.round(opacity * (red2 - red1))
  green1 += Math.round(opacity * (green2 - green1))
  blue1 += Math.round(opacity * (blue2 - blue1))
  return '#' + red1.toString(16) + green1.toString(16) + blue1.toString(16)
}

export function formatTime(
  date: Date | number,
  format = 'YYYY-MM-DD HH:mm:ss',
) {
  return dayjs(date).format(format)
}
