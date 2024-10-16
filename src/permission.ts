import router, { addRoutes } from './route'
import NProgress from 'nprogress'
import { getToken } from './utils/auth'
import { AUTH_ROUTE_WHITELIST } from '@/config'
import usePermissionStore from '@/store/permission'
import useUserStore from '@/store/user'
NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, from, next) => {
  console.log('to', to)
  console.log('from', from)
  NProgress.start()
  if (!AUTH_ROUTE_WHITELIST.includes(to.path)) {
    const authToken = getToken()
    // 没有 token 直接先登录
    if (!authToken) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath,
        },
      })
    } else {
      const message = useMessage()
      const { user, sso } = useUserStore()
      // 没有用户信息需要sso获取，获取失败重新登陆
      if (!user.id) {
        try {
          await sso()
        } catch (error) {
          message({
            type: 'error',
            message: '获取用户信息失败',
          })
          return next({
            path: '/login',
            query: {
              redirect: to.fullPath,
            },
          })
        }
      }
      const { getPermissionList, permissionList } = usePermissionStore()
      // 没有权限路由需要先获取权限路由，获取失败需要重新登录
      if (permissionList.length === 0) {
        try {
          const routes = await getPermissionList()
          addRoutes(routes || [])
          return next({ ...to, replace: true })
        } catch {
          message({
            type: 'error',
            message: '获取权限信息失败',
          })
          return next({
            path: '/login',
            query: {
              redirect: to.fullPath,
            },
          })
        }
      }
    }
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})
