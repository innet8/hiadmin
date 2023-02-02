<script setup lang="ts">
import Header from '../components/Header.vue'
import Navigation from '../components/Navigation.vue'
import Footer from '../components/Footer.vue'
</script>

<template>
  <!-- 头部 -->
  <Header />
  <!-- 导航 -->
  <Navigation />
  <!-- 主体 -->
  <main class="relative"><router-view /></main>
  <!-- 尾部 -->
  <Footer />
</template>