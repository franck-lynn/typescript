<script setup lang="ts">
// https://segmentfault.com/a/1190000041536375?utm_source=weekly
// https://github.com/deepmeena70/mouse-drag-and-rotate/blob/master/index.html
import { onMounted, ref } from "vue"
import { sin, cos, pi } from "mathjs"
const xx = ref(300)
const yy = ref(200)
onMounted(() => {

  // 计算旋转中心坐标点
  const shapeControlls = document.querySelector("#dynamic_circle") as HTMLElement
  let rotating = false
  let aVector
  let bVector
  let deltaTheta = 0
  // 旋转中心的绝对坐标点
  const origin = { x: 200, y: 200 }
  shapeControlls.addEventListener("mousedown", (e) => {
    rotating = true
    // 鼠标位置
    const { clientX, clientY } = e
    // const { left, top, width, height } = shapeControlls!.getBoundingClientRect()
    // 计算当前鼠标点与原点之间的向量
    aVector = [clientX - origin.x, clientY - origin.y]
    console.log(aVector)
    document.addEventListener("mousemove", (e) => {
      const { clientX, clientY } = e
      // 新的向量
      bVector = [clientX - origin.x, clientY - origin.y]
      // 根据2个向量计算出旋转的弧度
      const theta = deltaTheta + Math.atan2(-aVector[1]!, aVector[0]!) + Math.atan2(bVector[1]!, bVector[0]!)
      // 旋转时计算的是2个向量的之间的夹角, 旋转的点坐标是给定的值
      const newPoint = { x: 300, y: 200 }
      if (rotating) {
        const { x, y } = rotated(origin, newPoint, theta)
        // prevRotateMatrix = multiply(prevRotateMatrix, rotationMatrix(theta))
        // setElementTranformMatrix(shapeControlls, prevRotateMatrix)
        // console.log(prevRotateMatrix)
        xx.value = x
        yy.value = y
        // aVector = bVector
        console.log("角度---> ", (theta * 180) / pi)
        deltaTheta = theta > 2 * pi ? theta - pi : theta
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
    x: c0.x + (p1.x - c0.x) * cos(theta) - (p1.y - c0.y) * sin(theta),
    y: c0.y + (p1.y - c0.y) * cos(theta) + (p1.x - c0.x) * sin(theta),
  }
}
</script>
<template>
  <svg width="400px" height="400px">
    <g id="dynamic_circle">
      <circle :cx="`${xx}px`" :cy="`${yy}px`" r="30px" style="stroke-width: 4px; stroke: red; fill: red" />
    </g>
    <g id="dynamic_circle">
      <circle cx="200px" cy="200px" r="100px" style="stroke-width: 2px; stroke: purple; fill: none" />
    </g>
    <g id="center-circle">
      <circle cx="200px" cy="200px" r="4px" style="stroke-width: 2px; stroke: greenyellow; fill: greenyellow" />
    </g>
  </svg>
</template>

<style scoped>
svg {
  position: absolute;
  border: 1px solid red;
}
</style>
