<script setup lang="ts">
import {} from "vue"
</script>
<template>
  <div class="flex flex-col justify-between w-full h-full bg-background-color-top-nav text-font-color">
    <div class="r2-up">
      <slot name="r2-up"></slot>
    </div>
    <div class="r2-down">
      <slot name="r2-down"></slot>
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
