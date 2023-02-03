import { defineStore } from 'pinia'

export interface UserInfo {
  userId?: string | number
  username?: string
  realName?: string
  avatar?: string
}

export interface UserState {
  userInfo: UserInfo
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    // user info
    userInfo: {}
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo
    }
  },
  actions: {
    setUserInfo(info: UserInfo) {
      this.userInfo = info
    }
  }
})
