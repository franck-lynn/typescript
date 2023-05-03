<script setup lang="ts">
// const people = [
//   { id: 1, imageUrl: "/images/pic1.jpg", name: "克里斯汀·拉莫斯", email: "kristen.ramos@example.com" },
//   { id: 4, imageUrl: "/images/pic4.jpg", name: "弗洛伊德·迈尔斯", email: "floyd.miles@example.com" },
//   { id: 2, imageUrl: "/images/pic3.jpg", name: "考特尼·亨利", email: "courtney.henry@example.com" },
//   { id: 3, imageUrl: "/images/pic2.jpg", name: "泰德·福克斯", email: "ted.fox@example.com" },
// ]
// 重用样式
// https://tailwindcss.com/docs/reusing-styles
// 定位
// https://tailwindcss.com/docs/position
</script>
<template>
  <div class="relative group w-60 h-20 bg-rose-500">
    <p>Relative parent</p>
    <div class="absolute top-0 left-full w-48 hidden group-hover:block">
      <p class="h-20 bg-purple-400">Absolute child1</p>
      <p class="h-20 bg-purple-400">Absolute child2</p>
      <p class="h-20 bg-purple-400">Absolute child3</p>
    </div>
  </div>
</template>

<style>
.logo {
  padding: 1.5em;
  height: 6em;
  transition: filter 300ms;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
