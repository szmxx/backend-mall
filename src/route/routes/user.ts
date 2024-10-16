export default {
  name: 'User',
  path: '/user',
  redirect: '/user/index',
  children: [
    {
      name: 'UserIndex',
      path: 'index',
      component: () => import('@/views/user'),
      meta: {
        title: '个人中心',
      },
    },
  ],
}
