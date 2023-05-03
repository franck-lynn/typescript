<script setup lang="ts">
import { ref, Ref, inject } from "vue"
import { Point, PathPoint, useRotate } from "../utils"
import { makePath, translatePathPoints } from "../utils"

// // 注入的中心点作为指针的中心, r 作为指针的参照参数
const gaugeboardInject = inject("gaugeboard") as { center: Ref<Point>; r: Ref<number>; strokeWidth: Ref<number> }

const pin = {
  rootW: 4,
  rootH: 12,
  topW: 1.8,
  topH: 0.618 * (gaugeboardInject.r.value + gaugeboardInject.strokeWidth.value), // 指针的高度
}

const points3: PathPoint[] = [
  { x: pin.rootW, y: 12, operator: "M" },
  { x: pin.rootW, y: 0, operator: "L" },

  { x: pin.topW, y: -pin.topH, operator: "L" },
  { x: -pin.topW, y: -pin.topH, operator: "L" },

  { x: -pin.rootW, y: 0, operator: "L" },
  { x: -pin.rootW, y: 12, operator: "Z" },
]

const dx = gaugeboardInject.center.value.x
const dy = gaugeboardInject.center.value.y
const d = makePath(translatePathPoints(points3, dx, dy))

const el = ref()
const defaultAngle = ref<number>(90)
const transform = useRotate(el, {
  initialValue: { x: dx, y: dy },
  defaultAngle,
})
</script>
<template>
  <!-- <defs>
    <filter id="drop-shadow">
      <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
      <feOffset in="blur" dx="-2" dy="2" result="offsetBlur" />
      <feMerge>
        <feMergeNode in="offsetBlur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs> -->

  <g id="gauge" filter="url(#drop-shadow)">
    <path ref="el" :d="d!" fill="yellow" stroke="red" :transform="transform" />
    <circle :cx="dx" :cy="dy" r="6"></circle>
  </g>
</template>

<style scoped>
#gauge {
  fill: #d7d7d7;
}
</style>
