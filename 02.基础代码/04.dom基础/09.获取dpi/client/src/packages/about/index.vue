<script setup lang="ts">
import { ref } from "vue"
const dpi = ref(0)
const getDPI = () => {
  // 获取屏幕分辨率
  const width = window.screen.width
  const height = window.screen.height
  // 获取设备的像素比
  const devicePixelRatio = window.devicePixelRatio || 1
  // 计算 dpi
  const _dpi = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) / devicePixelRatio
  dpi.value = _dpi
}

// const pixelRatioBox = document.querySelector(".pixel-ratio")
const mqString = ref(`(resolution: ${window.devicePixelRatio}dppx)`)

const updatePixelRatio = () => {
  const pr = window.devicePixelRatio
  const prString = (pr * 100).toFixed(0)
  mqString.value = `${prString}% (${pr.toFixed(2)})`
}
window.addEventListener("updatePixelRatio", updatePixelRatio)
</script>
<template>
  <n-button @click="getDPI"> 获取dpi </n-button>
  {{ dpi }}

  <div class="pixel-ratio" @updatePixelRatio="updatePixelRatio">{{ mqString }}</div>
</template>

<style scoped>
.center-circle {
  border: 10px solid red;
  stroke: green;
  fill: none;
}
</style>
