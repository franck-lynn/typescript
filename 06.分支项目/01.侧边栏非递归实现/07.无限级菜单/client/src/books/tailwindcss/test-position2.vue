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
// 定位 -> 宽高 -> 背景色
</script>
<template>
  <div class="static flex flex-col w-full bg-purple-800 group" style="width: 180px">
    <span class="flex items-center h-16 bg-red-50">
      <span class="flex-none w-8 flex justify-center iconfont icon-xin"> </span>
      <div class="flex-grow truncate overflow-hidden flex items-center justify-center">必选元素2</div>
      <span
        class="flex-none inline-block ml-2 leading-tight text-gray-500"
        style="
          width: 0;
          height: 0;
          border-top: 8px solid transparent;
          border-bottom: 8px solid transparent;
          border-left: 8px solid currentcolor;
        "
      >
      </span>
    </span>
    <div class="static hidden group-hover:block">
      <div class="flex items-center h-20">子级菜单1</div>
      <div class="flex items-center h-20">子级菜单2</div>
    </div>
  </div>
</template>

<style scoped></style>
