<script setup lang="ts">
import {} from "vue"
</script>
<template>
  <div
    class="flex justify-between items-center h-height-top-nav bg-background-color-top-nav text-font-color px-padding-right-top-nav px-padding-left-top-nav"
  >
    <div class="c3-left">
      <slot name="c3-left"></slot>
    </div>
    <div class="c3-center">
      <slot name="c3-center"></slot>
    </div>
    <div class="c3-right">
      <slot name="c3-right"></slot>
    </div>
  </div>
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
