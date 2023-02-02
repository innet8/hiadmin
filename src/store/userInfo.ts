import { defineStore } from 'pinia'

interface ListItem {
  name: string
  path: string
  title: string
}

export const useUserInfoStore = defineStore('userInfo', {
  state: () => {
    return {
      list: <ListItem[]>[]
    }
  },
  getters: {},
  actions: {
    setUserInfo(data: ListItem[]) {
      this.list = data
    }
  }
})
