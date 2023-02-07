<script setup lang="ts">
import Header from '../components/Header.vue'
import Menu from '../components/Menu.vue'
// import Footer from '../components/Footer.vue'
</script>

<template>
  <!-- 头部 -->
  <Header />
  <!-- 导航 -->
  <Menu />
  <!-- 主体 -->
  <main class="relative"><router-view /></main>
  <!-- 尾部 -->
  <!-- <Footer /> -->
</template>