/*
 * @Author: cola
 * @Date: 2023-09-12 00:49:03
 * @LastEditors: cola
 * @Description:
 */
export default {
  name: 'Element',
  path: '/element',
  redirect: '/element/index',
  children: [
    {
      name: 'ElementIndex',
      path: 'index',
      component: () => import('@/views/element/index.vue'),
    },
  ],
}
