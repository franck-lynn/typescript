<script setup lang="ts">
import {} from "vue"
</script>
<template>
  <ul
    class="flex justify-between items-center h-height-top-nav bg-background-color-top-nav text-font-color px-padding-right-top-nav px-padding-left-top-nav"
  >
    <li class="c2-left">
      <slot name="c2-left"></slot>
    </li>
    <li class="c2-right">
      <slot name="c2-right"></slot>
    </li>
  </ul>
</template>

<style scoped>
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
