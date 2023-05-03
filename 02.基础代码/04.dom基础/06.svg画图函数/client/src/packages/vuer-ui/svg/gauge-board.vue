<script setup lang="ts">
import { ref, onMounted, provide } from "vue"
import { Point } from "./utils"

const loaded = ref(false)

const strokeWidth = ref(40)

const center = ref<Point>({ x: 0, y: 0 }) // 这里需要设置一个默认值
const r = ref<number>()

onMounted(() => {
  loaded.value = true
  const gaugeBoard = document.querySelector("#gauge")! as HTMLElement
  const { width, height } = gaugeBoard.getBoundingClientRect()
  center.value = { x: width / 2, y: height / 2 } // {200, 200}
  strokeWidth.value = 0.1 * width // 40
  // const gap = 4 =  0.02 * width
  // r.value = Math.min(width / 2, height / 2) - 0.02 * width - 0.05 * width
  r.value = Math.min(width / 2, height / 2) - 0.07 * width

  // 父组件注入的数据, 等这个父组件加载完成后再向后代注入
  provide("gaugeboard", { r, center, strokeWidth })
})
</script>
<template>
  <!-- <defs>
    <filter id="innershadow">
      <feGaussianBlur in="SourceAlpha" stdDeviation="15" result="blur"></feGaussianBlur>
      <feOffset in="blur" dx="4" dy="4" result="offsetBlur"></feOffset>
      <feMerge>
        <feMergeNode in="offsetBlur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs> -->

  <svg id="gauge" width="400" height="400">
    <g id="center-circle" filter="url(#innershadow)">
      <circle :cx="center.x" :cy="center.y" :r="r" :style="`stroke-width: ${strokeWidth}`"></circle>
    </g>
    <pin-pear v-if="loaded"></pin-pear>
    <pin-pengant v-if="loaded"></pin-pengant>
    <pin-rect v-if="loaded"></pin-rect>
    <arc-dynamic v-if="loaded"></arc-dynamic>
  </svg>
</template>

<style scoped>
svg {
  border: 1px solid #eeeeee;
  box-shadow: 4px 4px 12px rgb(0 0 0 / 50%);
  user-select: none;
  box-sizing: border-box;
}
circle {
  fill: none;

  /* fill: #eaeced; */
  stroke: #021f33;
}
</style>
