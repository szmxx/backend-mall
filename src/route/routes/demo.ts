export default {
  name: 'Demo',
  path: '/demo',
  redirect: '/demo/index',
  children: [
    {
      name: 'DemoIndex',
      path: 'index',
      component: () => import('@/views/demo'),
      meta: {
        title: '示例',
      },
    },
  ],
}
