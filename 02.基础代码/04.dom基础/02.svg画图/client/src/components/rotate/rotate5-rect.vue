<script setup lang="ts">
// https://segmentfault.com/a/1190000041536375?utm_source=weekly
// https://github.com/deepmeena70/mouse-drag-and-rotate/blob/master/index.html
import { ref } from "vue"
import { makePath, moveAndRotatedPoints, useRotate } from "./useRotate"

const points1 = [
  { x: 4, y: 12, operator: "M" },
  { x: 4, y: 0, operator: "L" },

  { x: 1.8, y: -132, operator: "L" },
  { x: -1.8, y: -132, operator: "L" },

  { x: -4, y: 0, operator: "L" },
  { x: -4, y: 12, operator: "L" },
  { x: 4, y: 12, operator: " " },
]
// 把所有点移动到 {x: 200, y:200}的位置, 并绕这个点{x: 200, y:200}  旋转 90度
const point2 = moveAndRotatedPoints(points1, 200, 200, 0)

const d = makePath(point2)
console.log(d)

const el = ref()
const transform = useRotate(el, { initialValue: { x: 200, y: 200 } })
</script>
<template>
  <svg width="400px" height="400px">
    <g id="arrow">
      <path :d="d" fill="yellow" stroke="red" />
      <circle cx="200" cy="200" r="3"></circle>
    </g>

    <!-- <use ref="el" xlink:href="#arrow" :transform="`rotate(${angle ? angle : 0} , 200, 200)`" /> -->
    <use ref="el" xlink:href="#arrow" :transform="transform" />
  </svg>
</template>

<style scoped>
svg {
  position: absolute;
  border: 1px solid red;
}
</style>
