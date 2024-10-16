<template>
  <div ref="containeRef" class="w-full bg-red/10">
    <div
      v-show="isShowChart && !isLoadFail"
      ref="chartRef"
      class="w-full h-full"
    ></div>
    <template v-if="isLoadFail">
      <div class="center w-full h-full text-lg text-primary">
        <slot name="error">加载失败!</slot>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { GRID, TOOLTIP, LEGEND, COLORLIST } from '../config'
import { RADAR_SERIES_STYLE, RADAR_TOOLTIP, RADAR_STYLE } from './config'
import { CHART_MODE } from '@/constants'
import { PropType } from 'vue'

defineOptions({
  name: 'RadarChart',
})

const props = defineProps({
  mode: {
    type: String,
    default: CHART_MODE.PERFORMANCE,
  },
  isWatchResize: {
    type: Boolean,
    default: true,
  },
  option: {
    type: Object as PropType<Record<string, unknown>>,
    default: () => {
      return {}
    },
  },
  load: {
    type: Function,
    default: null,
  },
})

const chartInstance = shallowRef()
const chartRef = ref(null)
const containeRef = ref(null)
const isLoadFail = ref(false)

const isShowChart = ref(props.mode === CHART_MODE.PERFORMANCE ? false : true)
const isFirstLoad = ref(true)

const initChart = useEChart({
  isWatchResize: props.isWatchResize,
  resizecallback() {
    onResize()
  },
})

function onResize() {
  if (chartInstance?.value && isShowChart.value) {
    chartInstance?.value?.resize?.({
      animation: {
        duration: 200,
      },
    })
  }
}
function onLoadChart() {
  if (isFirstLoad.value) {
    isFirstLoad.value = false
    const option = props.load ? {} : onOption(props.option)
    chartInstance.value = initChart(chartRef.value, option)
    onLoad()
  }
}
function onDraw(_option: Record<string, unknown>) {
  const option = onOption(_option)
  chartInstance?.value?.setOption?.(option)
}

async function onLoad() {
  if (props.load) {
    try {
      chartInstance?.value?.showLoading?.()
      const _option = await props?.load?.()
      onDraw(_option)
      isLoadFail.value = false
    } catch {
      console.error('图表加载失败')
      isLoadFail.value = true
    } finally {
      chartInstance?.value?.hideLoading?.()
    }
  }
}

defineExpose({
  onLoad,
  onDraw,
})
const onDebounceIntersect = useDebounceFn(
  (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      // 相交
      if (entry.isIntersecting) {
        // 不可见到可见需要resize一下
        if (!isShowChart.value && !isFirstLoad.value) {
          setTimeout(() => {
            onResize()
          })
        }
        isShowChart.value = true
        // 可见才加载图表
        requestAnimationFrame(() => {
          onLoadChart()
        })
      } else {
        isShowChart.value = false
      }
    })
  },
  300,
  { maxWait: 500 },
)
function onIntersect() {
  if (containeRef.value) {
    const observer = new IntersectionObserver(onDebounceIntersect, {
      threshold: 0,
    })
    // 开始观察元素
    observer.observe(containeRef.value)
    onUnmounted(() => {
      observer?.disconnect?.()
    })
  }
}
function onOption(_option: Record<string, unknown>) {
  let {
    tooltip = {},
    legend = {},
    grid = {},
    series = [],
    radar = [],
  } = _option || {}
  tooltip = Object.assign({}, TOOLTIP, RADAR_TOOLTIP, tooltip || {})
  legend = Object.assign({}, LEGEND, legend || {})
  grid = Object.assign({}, GRID, grid || {})
  series = Array.isArray(series)
    ? series.map((item) => Object.assign({}, RADAR_SERIES_STYLE, item || {}))
    : [Object.assign({}, RADAR_SERIES_STYLE, series || {})]

  radar = Array.isArray(radar)
    ? radar.map((item) => Object.assign({}, RADAR_STYLE, item || {}))
    : [Object.assign({}, RADAR_STYLE, radar || {})]

  const option = {
    color: COLORLIST,
    ..._option,
    tooltip: tooltip,
    legend: legend,
    grid: grid,
    series: series,
    radar: radar,
  }

  return option
}
onMounted(() => {
  switch (props.mode) {
    case CHART_MODE.PERFORMANCE:
      onIntersect()
      break
    default:
      onLoadChart()
      break
  }
})
</script>
