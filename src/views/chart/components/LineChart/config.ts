import { COLORLIST } from '../config'
import * as echarts from 'echarts'

export const LINE_SERIES_STYLE = (index: number) => {
  return {
    type: 'line',
    smooth: true,
    symbol: 'circle',
    symbolSize: 8,
    lineStyle: {
      color: COLORLIST[index],
      width: 3,
    },
    areaStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0,
          color: COLORLIST[index],
        },
        {
          offset: 1,
          color: 'rgba(106, 154, 253, 0)',
        },
      ]),
    },
  }
}

export const LINE_TOOLTIP = {
  trigger: 'axis',
  axisPointer: {
    type: 'shadow',
  },
}
