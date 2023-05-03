<script setup lang="ts">
import { ref, Ref, inject, onMounted } from "vue"
import { Point, PathPoint, useRotate } from "../utils"
import { makePath, translatePathPoints } from "../utils"

// 注入类型加断言确定
// 注入的中心点作为指针的中心, r 作为指针的参照参数
const gaugeboardInject = inject("gaugeboard") as { center: Ref<Point>; r: Ref<number>; strokeWidth: Ref<number> }

const pin = {
  h: 0.618 * (gaugeboardInject.r.value + gaugeboardInject.strokeWidth.value), // 指针的高度
  r: 20,
}

// 根据圆半径和针尖高度计算 圆弧起始点的x坐标, 取整是为了保证一下精度
const startX = Math.round((pin.r * Math.sqrt(Math.pow(pin.h, 2) - Math.pow(pin.r, 2))) / pin.h)
const startY = Math.sqrt(Math.pow(pin.r, 2) - Math.pow(startX, 2))

// 一种表针的数据, 按照屏幕坐标系的符合常规思路的坐标
const points1: PathPoint[] = [
  { x: 0, y: -pin.h, operator: "M" }, // 线段起始点
  { x: startX, y: -startY, operator: "S" }, // 圆弧起始点
  { x: 0, y: 0, operator: "A0011" }, // 圆心坐标
  { x: -startX, y: -startY, operator: "E" }, // 圆弧结束点
  { x: 0, y: -pin.h, operator: "Z" }, // 线段结束点
]

const dx = gaugeboardInject.center.value.x
const dy = gaugeboardInject.center.value.y
const d = makePath(translatePathPoints(points1, dx, dy))

const el = ref()
const defaultAngle = ref<number>(45)
const transform = useRotate(el, {
  initialValue: { x: dx, y: dy },
  defaultAngle,
})

const angle = ref(0)
onMounted(() => {
  const perDegree = 0.06 // 60格每隔6度
  let n = 0
  setInterval(() => {
    // 设置分度
    angle.value = perDegree * n
    if (n > 360 / perDegree) n = 0
    n++
  }, 1)
})
</script>
<template>
  <defs>
    <filter id="drop-shadow">
      <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
      <feOffset in="blur" dx="4" dy="4" result="offsetBlur" />
      <feMerge>
        <feMergeNode in="offsetBlur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>

  <g id="gauge" filter="url(#drop-shadow)">
    <path ref="el" :d="d!" fill="yellow" stroke="red" :transform="transform" />
    <path
      ref="el2"
      :d="d!"
      fill="gold"
      stroke="red"
      :transform="`rotate(${angle}, 200, 200)`"
      filter="url(#fdiff-light)"
    />
    <circle cx="200" cy="200" r="10"></circle>
  </g>
</template>

<style scoped>
svg {
  stroke-linejoin: round;

  /* stroke-width: 4px; */
}
#gauge {
  fill: #d7d7d7;
}
</style>
