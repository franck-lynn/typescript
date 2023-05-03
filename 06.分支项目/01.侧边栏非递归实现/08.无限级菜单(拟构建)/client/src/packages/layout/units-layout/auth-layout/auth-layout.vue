<script setup lang="ts">
/**
 * 适用与注册, 登录, 忘记密码和密码重置的页面主体内容
 */
</script>
<template>
  <div class="flex flex-wrap h-full w-full">
    <div class="hidden md:block w-3/12 h-full">
      <slot name="left" />
    </div>

    <div class="flex flex-col flex-1 md:w-auto mx-2 items-center justify-center shadow-lg">
      <slot name="center" />
    </div>
    <div class="hidden md:block w-3/12 h-full">
      <slot name="right" />
    </div>
  </div>
</template>
