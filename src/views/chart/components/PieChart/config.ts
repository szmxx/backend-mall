export const PIE_SERIES_STYLE = {
  type: 'pie',
  radius: '60%', // 可以为数组形式（需两项）
  roseType: true, // 玫瑰图
  avoidLabelOverlap: true, // 默认true，标签防重叠，放中央设置false
  label: {},
  labelLine: {
    smooth: 0.2,
    length: 10,
    length2: 20,
  },
}

export const PIE_TOOLTIP = {
  trigger: 'item',
}
