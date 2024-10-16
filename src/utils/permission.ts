import { IMenu } from '@/api/public'
import { RouteRecordRaw } from 'vue-router'
import LayoutPage from '@/layout'
export function buildMenuList(list: IMenu[], parent?: Record<string, unknown>) {
  const res: RouteRecordRaw[] = []
  list.map((item) => {
    if (!item.hidden) {
      const { id, name, icon, title, type } = item
      const route = {
        name: parent ? `${parent.name}-${name}` : name,
        path: parent ? name : `/${name}`,
        redirect: computeRedirect(item, parent),
        component: computeComponent(item, parent),
        meta: {
          id,
          icon,
          type,
          title,
        },
        children: [] as RouteRecordRaw[],
      }
      res.push(route)
      if (item?.children?.length) {
        route.children = buildMenuList(item.children, {
          ...item,
          parent: parent,
        })
      }
    }
  })
  return res
}

export function buildRoutesList(
  list: IMenu[],
  parent?: Record<string, unknown>,
) {
  const res: RouteRecordRaw[] = []
  list.map((item) => {
    const { id, name, icon, title, type } = item
    const route = {
      name: parent ? `${parent.name}-${name}` : name,
      path: parent ? name : `/${name}`,
      redirect: computeRedirect(item, parent),
      component: computeComponent(item, parent),
      meta: {
        id,
        icon,
        type,
        title,
      },
      children: [] as RouteRecordRaw[],
    }
    res.push(route)
    if (item?.children?.length) {
      route.children = buildRoutesList(item.children, {
        ...item,
        parent: parent,
      })
    }
  })
  return res
}

function computeComponent(item: IMenu, parent?: Record<string, unknown>) {
  const { name, type } = item
  if (parent) {
    const pathList: string[] = []
    while (parent) {
      pathList.unshift(parent.name as string)
      parent = parent.parent as Record<string, unknown>
    }
    if (type === 'route') {
      return () =>
        import(/* @vite-ignore */ `../views/${pathList.join('/')}/${name}`)
    } else {
      return LayoutPage
    }
  } else {
    return LayoutPage
  }
}

function computeRedirect(item: IMenu, parent?: Record<string, unknown>) {
  const { name, type, children } = item
  if (!parent) {
    if (type === 'route') {
      if (children?.length) {
        return `/${name}/${children[0].name}`
      }
    }
  }
  return ''
}
