import { IMenu, getMenuConfig } from '@/api/public'
import { buildMenuList, buildRoutesList } from '@/utils/permission'
import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'
export default defineStore('permission', {
  state: () => {
    return {
      _permissionList: [] as IMenu[],
      _menuList: [] as RouteRecordRaw[],
    }
  },
  getters: {
    permissionList: (state) => state._permissionList,
    menuList: (state) => state._menuList,
  },
  actions: {
    async getPermissionList() {
      const list = await getMenuConfig()
      const res = buildMenuList(list)
      const routes = buildRoutesList(list)
      this._permissionList = list
      this._menuList = res
      return routes
    },
  },
})
