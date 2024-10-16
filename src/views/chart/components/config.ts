export const COLORLIST = [
  '#FF6F61',
  '#0D92F4',
  '#00FF9C',
  '#FFE700',
  '#FF6600',
  '#A0D683',
  '#B7E0FF',
  '#A594F9',
]
export const X_AXIS = {
  // 坐标轴线，x轴默认显示
  axisLine: {
    show: false,
  },
  // 坐标刻度，x轴默认显示
  axisTick: {
    show: false,
  },
  // 纵网格线，默认隐藏
  splitLine: {},
  // 坐标刻度标签
  axisLabel: {
    interval: 0,
  },
}

export const Y_AXIS = {
  splitNumber: 4,
  // 坐标轴线，y轴默认显示
  axisLine: {
    show: false,
  },
  // 坐标刻度，y轴默认隐藏
  axisTick: {},
  // 横网格线，默认显示
  splitLine: {
    show: false,
  },
  // 坐标刻度标签
  axisLabel: {
    formatter(value: number, index: number) {
      if (index === 0) return ''
      return ~~(value / 100) * 100 * index
    },
  },
}

export const TOOLTIP = {
  backgroundColor: 'rgba(255,255,255,0.9)',
  borderColor: '#ccc',
  borderWidth: 1,
  textStyle: {
    color: '#333',
  },
}

export const LEGEND = {
  left: 'right', // 图例位置
  orient: 'vertical', // 垂直排列图例
  itemWidth: 20, // 图例标记的宽度
  itemHeight: 10, // 图例标记的高度
  textStyle: {
    color: '#333', // 图例文本颜色
    fontSize: 12, // 图例文本大小
  },
  // 使用自定义的 icon
  icon: 'rect', // 方块图例标记
}

export const GRID = {
  left: 0,
  right: '5%',
  top: '5%',
  bottom: 0,
  containLabel: true,
}

export const SERIES_STYLE = (index: number) => {
  return {
    itemStyle: {
      color: COLORLIST[index],
    },
  }
}
