<script setup lang="ts">
</script>

<template>
  <!-- 头部 -->
  <header>header</header>
  <!-- 导航 -->
  <aside>
    nav<br />
    <router-link to="/admin/dashboard">dashboard</router-link><br />
    <router-link to="/admin/settings">settings</router-link><br />
  </aside>
  <!-- 主体 -->
  <main><router-view /></main>
  <!-- 尾部 -->
  <footer>footer</footer>
</template>