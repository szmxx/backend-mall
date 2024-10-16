export default {
  name: 'Echart',
  path: '/chart',
  redirect: '/chart/index',
  children: [
    {
      name: 'EchartIndex',
      path: 'index',
      component: () => import('@/views/chart'),
      meta: {
        title: '我的图表',
      },
    },
  ],
}
