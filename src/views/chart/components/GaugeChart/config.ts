import { COLORLIST } from '../config'
const width = 20
export const GAUGE_SERIES_STYLE = (index: number) => {
  return {
    type: 'gauge',
    radius: '80%',
    title: {
      fontSize: 16,
    },
    detail: {
      formatter: '{value}',
      fontSize: 20,
    },
    axisTick: {
      distance: -width,
      length: 8,
      lineStyle: {
        color: '#fff',
        width: 2,
      },
    },
    axisLabel: {
      color: 'inherit',
      distance: width + 5,
      fontSize: 16,
    },
    splitLine: {
      distance: -width,
      length: width,
      lineStyle: {
        color: '#fff',
        width: 4,
      },
    },
    axisLine: {
      lineStyle: {
        width: width,
        color: [[1, COLORLIST[index]]], // 可以分段设置[[0.1, 'color'], [0.5, ''], [1, '']]
      },
    },
  }
}

export const GAUGE_TOOLTIP = {
  trigger: 'item',
}
