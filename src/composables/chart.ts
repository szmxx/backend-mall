import * as echarts from 'echarts'
import { type ECharts } from 'echarts'
import ResizeObserverAPI from '@/utils/ResizeObserver'
interface IEchartOption {
  isWatchResize?: boolean
  dobounceTime?: number
  resizecallback?: () => void
}

export function useEChart(params: IEchartOption) {
  const { resizecallback, isWatchResize = true, dobounceTime = 200 } = params
  const chartInstance = shallowRef<ECharts>()
  const onResizeCallback = resizecallback
    ? useDebounceFn(resizecallback, dobounceTime, {
        maxWait: dobounceTime + 300,
      })
    : null
  let observer: ResizeObserverAPI

  function initChart(
    container: string | HTMLElement | null,
    option?: Record<string, unknown>,
  ) {
    container =
      typeof container === 'string'
        ? document.getElementById(container)
        : container

    if (container) {
      chartInstance.value = echarts.getInstanceByDom(container)
      if (!chartInstance.value) {
        chartInstance.value = echarts.init(container)
      }
      // 启动监听
      if (isWatchResize) {
        const element = container.parentElement
        element && onResize(element)
      }
    } else {
      console.error('echarts container not found')
    }
    option && chartInstance?.value?.setOption?.(option)
    return chartInstance.value
  }

  onUnmounted(() => {
    chartInstance?.value?.dispose?.()
    observer?.disconnect?.()
    chartInstance.value = undefined
  })

  function onResize(element: HTMLElement) {
    observer = new ResizeObserverAPI({
      callback() {
        onResizeCallback?.()
      },
    })
    observer.observe(element)
  }

  return initChart
}
