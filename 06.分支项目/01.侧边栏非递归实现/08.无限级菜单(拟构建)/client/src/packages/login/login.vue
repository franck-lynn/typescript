<script setup lang="ts">
import {} from "vue"

const abouts = [
  { to: "/index", icon: "icon-home", title: "返回首页" },
  { to: "/register", icon: "icon-register", title: "注册" },
]
</script>
<template>
  <r3-layout>
    <template #r3-header> <about-header :abouts="abouts" /> </template>
    <template #r3-body> <login-body /> </template>
    <template #r3-footer> <sticky-footer /> </template>
  </r3-layout>
</template>

<style scoped></style>
