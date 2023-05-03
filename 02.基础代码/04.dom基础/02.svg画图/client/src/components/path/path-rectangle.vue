<script setup lang="ts">
import {} from "vue"
defineProps<{
  size: number
}>()
</script>
<template>
  <svg :width="`${size}px`" :height="`${size}px`">
    <g style="stroke: black; fill: none">
      <!-- 起始点坐标, L 结束点坐标 -->
      <path d="M 10 10 L 50 10 L 50 40 Z" />
    </g>
  </svg>
</template>

<style scoped>
svg {
  border: 10px solid red;
}
</style>
