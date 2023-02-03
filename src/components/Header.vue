<script setup lang="ts">
import { useRouter } from 'vue-router'
import { delToken } from '../utils'

const router = useRouter()
const handleLogOut = () => {
  delToken()
  router.replace('/login')
}
</script>

<template>
  <header>
    <hr />
    header<br />
    <a href="javascript:;" rel="noopener noreferrer" class="text-blue-500" @click="handleLogOut">退出登录</a>
    <hr />
  </header>
</template>