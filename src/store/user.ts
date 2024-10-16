import { defineStore } from 'pinia'
import { IUser } from '@/api/user'
import { sso } from '@/api/auth'
export default defineStore('user', {
  state: () => {
    return {
      _user: {} as IUser,
    }
  },
  getters: {
    user: (state) => state._user,
  },
  actions: {
    setUser(user: IUser) {
      this._user = user
    },
    async sso() {
      const user = await sso()
      if (user) {
        this._user = user
      }
    },
  },
})
