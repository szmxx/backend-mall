/*
 * @Author: cola
 * @Date: 2023-09-12 00:49:03
 * @LastEditors: cola
 * @Description:
 */
export default {
  name: 'Demo',
  path: '/demo',
  redirect: '/demo/index',
  children: [
    {
      name: 'DemoIndex',
      path: 'index',
      component: () => import('@/views/demo/index.vue'),
    },
  ],
}
