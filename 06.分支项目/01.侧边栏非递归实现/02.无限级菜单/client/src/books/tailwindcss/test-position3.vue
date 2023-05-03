<script setup lang="ts">
import {} from "vue"
</script>
<template>
  <div class="w-40 h-16 bg-purple-500">
    <span class="flex items-center justify-center">
      <span class="flex-none w-8 h-16 flex items-center justify-center iconfont icon-xin"> </span>
      <div class="flex-grow truncate overflow-hidden flex items-center justify-center">必选元素2</div>
      <!-- <span class="flex-none w-16 h-16 flex items-center justify-center"></span> -->
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
  </div>
</template>

<style scoped></style>
