<script setup lang="ts">
// import { isNarrow } from "../../stores/states"
const isNarrow = false
</script>
<template>
  <ul
    class="w-full bg-rose-500 group"
    :class="[isNarrow ? 'relative h-12' : 'static flex flex-col ']"
    style="width: 180px"
  >
    <!-- <li class="flex h-12 items-center justify-center relative"> -->
    <li class="flex items-center justify-center flex-col h-full">
      <div class="flex flex-1 h-20 items-center justify-center">
        <span class="flex-none w-8 flex justify-center iconfont icon-xin"> </span>
        <div class="flex flex-grow truncate overflow-hidden items-center justify-center">必选元素2</div>
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
      </div>
      <!-- <ul class="hidden group-hover:block" :class="[isNarrow ? 'absolute top-0 left-full w-48' : 'static w-full']"> -->
      <ul class="h-auto w-full">
        <!-- <ul class="hidden group-hover:block w-full absolute top-0 left-full"> 窄状态时 -->
        <!-- <ul class="hidden group-hover:block w-full absolute" :class="[isNarrow ? ' top-0 left-full' : 'top-full']"> -->
        <li class="flex items-center h-20 bg-purple-400">Absolute child1</li>
        <li class="flex items-center h-20 bg-purple-400">Absolute child2</li>
        <li class="flex items-center h-20 bg-purple-400">Absolute child3</li>
      </ul>
    </li>
  </ul>
</template>

<style scoped></style>
