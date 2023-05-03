<script setup lang="ts">
/**
 * 上 中 下 结构
 */
const abouts = [
  { to: "/test", icon: "icon-test", title: "测试" },
  { to: "/login", icon: "icon-log-in", title: "登录" },
]
</script>
<template>
  <r3-layout>
    <template #r3-header> <about-header :abouts="abouts" /> </template>
    <template #r3-body> <about-body /> </template>
    <template #r3-footer> <sticky-footer /> </template>
  </r3-layout>
</template>
