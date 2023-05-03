<script setup lang="ts">
// https://segmentfault.com/a/1190000041536375?utm_source=weekly
// https://github.com/deepmeena70/mouse-drag-and-rotate/blob/master/index.html
import { onMounted, ref } from "vue"

const xx = ref(300)
const yy = ref(200)
onMounted(() => {
  // 计算旋转中心坐标点
  const shapeControlls = document.querySelector("#dynamic_circle") as HTMLElement
  let rotating = false
  // let aVector
  // let bVector
  // const deltaTheta = 0
  // 旋转中心的绝对坐标点
  const origin = { x: 200, y: 200 }
  shapeControlls.addEventListener("mousedown", () => {
    rotating = true

    document.addEventListener("mousemove", (e) => {
      const a = e.clientX - 200
      const b = e.clientY - 200
      // 根据2个向量计算出旋转的弧度
      const theta = Math.atan2(b, a)
      // 旋转时计算的是2个向量的之间的夹角, 旋转的点坐标是给定的值
      const newPoint = { x: 300, y: 200 }
      if (rotating) {
        const { x, y } = rotated(origin, newPoint, theta)
        // prevRotateMatrix = multiply(prevRotateMatrix, rotationMatrix(theta))
        // setElementTranformMatrix(shapeControlls, prevRotateMatrix)
        // console.log(prevRotateMatrix)
        xx.value = x
        yy.value = y
        // console.log("角度---> ", (theta * 180) / pi)
        // deltaTheta = theta > 2 * pi ? theta - pi : theta
      }
      document.addEventListener("mouseup", () => {
        rotating = false
      })
    })
  })
})

type Point = {
  x: number
  y: number
}
function rotated(c0: Point, p1: Point, theta: number) {
  return {
    x: c0.x + (p1.x - c0.x) * Math.cos(theta) - (p1.y - c0.y) * Math.sin(theta),
    y: c0.y + (p1.y - c0.y) * Math.cos(theta) + (p1.x - c0.x) * Math.sin(theta),
  }
}
</script>
<template>
  <svg width="400px" height="400px">
    <g id="s_circle">
      <circle cx="200px" cy="200px" r="100px" style="stroke-width: 2px; stroke: purple; fill: none" />
    </g>
    <g id="dynamic_circle">
      <circle :cx="`${xx}px`" :cy="`${yy}px`" r="30px" style="stroke-width: 4px; stroke: red; fill: red" />
    </g>
    <g id="center-circle">
      <circle cx="200px" cy="200px" r="4px" style="stroke-width: 2px; stroke: greenyellow; fill: greenyellow" />
    </g>
  </svg>
</template>

<style scoped>
svg {
  position: absolute;
  margin: 20px;
  border: 1px solid red;
}
</style>
