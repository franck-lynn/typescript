<script setup lang="ts">
import { MaybeRef } from "@vueuse/shared"

defineProps<{
  icon?: string
  isDeepOne?: MaybeRef<boolean>
  deep?: MaybeRef<boolean>
}>()
/**
 * 这里设置一个简单的组件是为了设置样式, 样式的维护是非常复杂的
 */
</script>
<template>
  <span :class="[icon ?? `iconfont ${icon}`, isDeepOne ?? 'icon-all-fill', deep ?? `iconfont-${deep}`]" />
</template>

<style scoped>
.iconfont {
  display: flex;
  justify-content: center;
  align-items: center;

  /* margin-right: 6px; */
  width: 45px;
  height: 45px;
  font-size: 30px;

  /* border: 1px solid yellow; */
  color: #d2e810;
}
</style>
