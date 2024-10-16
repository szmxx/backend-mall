export default {
  name: 'Notify',
  path: '/notify',
  redirect: '/notify/index',
  children: [
    {
      name: 'NotifyIndex',
      path: 'index',
      component: () => import('@/views/notify'),
      meta: {
        title: '我的通知',
      },
    },
  ],
}
