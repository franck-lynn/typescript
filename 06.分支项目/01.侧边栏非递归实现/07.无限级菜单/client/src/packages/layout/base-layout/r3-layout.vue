<script setup lang="ts">
import {} from "vue"
/**
 * 1. 上 中 下结构
 * 2. 页头, 页脚固定高度. 中间自适应
 * 3. 页脚无论放大缩小都居于底部
 * 4. 用 tailwindcss 实现
 */
</script>
<template>
  <div class="flex flex-col h-full">
    <div class="flex justify-end h-10 bg-gray-100">
      <slot name="r3-header"> </slot>
    </div>

    <div class="flex-grow items-center">
      <slot name="r3-body"> </slot>
    </div>

    <div class="h-10 bg-gray-200 flex items-center justify-center">
      <slot name="r3-footer"></slot>
    </div>
  </div>
</template>

<style scoped>
.r3-body {
  height: calc(100% - 3rem -3rem);
}

/* 媒体查询定义 */
@screen sm {
  :root {
    --font-size-top-nav: 1rem;
  }
}

/* 移动端字体大小适当减小一些 */
@media (width <= 576px) {
  :root {
    --font-size-top-nav: 0.8rem;
  }
}
</style>
