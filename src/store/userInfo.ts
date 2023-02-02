import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserInfoStore = defineStore('userInfo', () => {
  const userInfo = ref({})

  function setUserInfo(name: object) {
    userInfo.value = name
  }

  return {
    userInfo
  }
})
