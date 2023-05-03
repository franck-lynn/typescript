<script setup lang="ts">
// import { ref, onMounted } from "vue"
defineProps<{
  size: number
}>()
</script>
<template>
  <svg :width="`${size}px`" :height="`${size}px`">
    <circle id="rotatable-circle" cx="50" cy="50" r="3" style="fill: red"></circle>
    <!-- 未旋转的箭头 -->
    <g id="arrow" style="stroke: black">
      <line x1="60" y1="50" x2="90" y2="50" />
      <polygon points="90 50 85 45 85 55" />
    </g>
    <!-- 角度, 中心点 x, 中心点 y -->
    <use xlink:href="#arrow" transform="rotate(60, 50, 50)" />
    <use xlink:href="#arrow" transform="rotate(-60, 50, 50)" />
    <use xlink:href="#arrow" transform="rotate(-150, 50, 50)" />
  </svg>
</template>

<style scoped>
svg {
  border: 10px solid red;
}
</style>
