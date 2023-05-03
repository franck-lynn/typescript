<script setup lang="ts">
import { ref, Ref, inject } from "vue"
import { Point, PathPoint, useRotate } from "../utils"
import { makePath, translatePathPoints } from "../utils"

// 注入类型加断言确定
// 注入的中心点作为指针的中心, r 作为指针的参照参数
const gaugeboardInject = inject("gaugeboard") as { center: Ref<Point>; r: Ref<number>; strokeWidth: Ref<number> }
const pin = {
  w: 16,
  base: gaugeboardInject.r.value, // 分度圆直径
  tip: gaugeboardInject.r.value + gaugeboardInject.strokeWidth.value / 2, // 齿顶圆直径
  root: gaugeboardInject.r.value - gaugeboardInject.strokeWidth.value / 2, // 齿根圆直径
}
// 已知半径, 半弦长, 计算弦的纵坐标
const chordY = Math.sqrt(Math.pow(pin.tip, 2) - Math.pow(pin.w, 2))
// 指针尖部的纵坐标
const pinTopH = pin.root + (0.618 * gaugeboardInject.strokeWidth.value) / 2
// 指针肩部的纵坐标, 肩部点落在分度圆上
const shoulderH = Math.sqrt(Math.pow(pin.base, 2) - Math.pow(pin.w, 2))

const points2: PathPoint[] = [
  { x: 0, y: -pinTopH, operator: "M" },
  // y 的高度要手工在绘图软件的修正才方便
  { x: pin.w, y: -shoulderH, operator: "L" },
  { x: pin.w, y: -chordY, operator: "S" },
  { x: 0, y: -pin.tip, operator: "A0000" }, // 过圆弧点
  { x: -pin.w, y: -chordY, operator: "E" },
  { x: -pin.w, y: -shoulderH, operator: "L" },
  { x: 0, y: -pinTopH, operator: " " },
]

const dx = gaugeboardInject.center.value.x
const dy = gaugeboardInject.center.value.y
const d = makePath(translatePathPoints(points2, dx, dy))

const el = ref()
const defaultAngle = ref<number>(270)
const transform = useRotate(el, {
  initialValue: { x: dx, y: dy },
  defaultAngle,
})
</script>
<template>
  <g id="gauge">
    <path ref="el" :d="d!" fill="yellow" stroke="red" :transform="transform" />
  </g>
</template>

<style scoped></style>
