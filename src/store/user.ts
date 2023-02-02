import { defineStore } from 'pinia'

export interface UserInfo {
  userId?: string | number
  username?: string
  realName?: string
  avatar?: string
}

interface UserState {
  userInfo: UserInfo
  token?: string
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    // user info
    userInfo: {},
    // token
    token: ''
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo
    },
    getToken(): string {
      return this.token || ''
    },
    hasToken(): boolean {
      return !!this.token
    }
  },
  actions: {
    setToken(token: string) {
      this.token = token
    },
    setUserInfo(info: UserInfo) {
      this.userInfo = info
    }
  }
})
