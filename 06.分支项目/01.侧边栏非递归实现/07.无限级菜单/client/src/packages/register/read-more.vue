<script setup lang="ts">
const abouts = [
  { to: "/index", icon: "icon-home", title: "返回首页" },
  { to: "/register", icon: "icon-register", title: "注册" },
]
</script>
<template>
  <r3-layout>
    <template #r3-header> <about-header :abouts="abouts" /> </template>
    <template #r3-body>
      <h1>了解更多页面</h1>
      <h2>正在建设中, tailwindcss</h2>
    </template>

    <template #r3-footer> <sticky-footer /> </template>
  </r3-layout>
</template>

<style scoped></style>
