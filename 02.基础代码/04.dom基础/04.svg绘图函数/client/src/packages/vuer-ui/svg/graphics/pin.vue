<script setup lang="ts">
import { onMounted } from "vue"
import { PathPoint } from "../utils/types"
import { makePath } from "../utils/makePath"
import { moveAndRotated } from "../utils/matrixes"
// 一种表针的数据
const pinPoints: PathPoint[] = [
  { x: 0, y: 100, operator: "M" }, // 线段起始点
  { x: 10, y: 1.01, operator: "S" }, // 圆弧起始点
  { x: 0, y: 0, operator: "A0001" }, // 圆心坐标
  { x: -10, y: 1.01, operator: "E" }, // 圆弧结束点
  { x: 0, y: 100, operator: "Z" }, // 线段结束点
]
// 要移动的
const data = pinPoints.map((item) => {
  const temp = moveAndRotated(item, { x: 100, y: 100 }, 100, 80, -180)
  return Object.assign(temp, { operator: item.operator })
})

const d = makePath(data)
console.log("路径---> ", d)
onMounted(() => {
  const gauge = document.querySelector("#gauge") as HTMLElement
  const css = gauge.getBoundingClientRect()
  console.log(css.width, css.left)
})
</script>
<template>
  <svg width="400" height="400">
    <g id="gauge">
      <path :d="d" fill="yellow" stroke="red" />
    </g>
  </svg>
</template>

<style scoped>
svg {
  stroke-linejoin: round;

  /* stroke-width: 4px; */
}
</style>
