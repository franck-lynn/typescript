<script setup lang="ts">
import {} from "vue"

import type { Point, OptionsArc } from "../utils/types"
import { drawArc } from "../utils/drawArc"

const p1: Point = { x: 10, y: 10 }
const p2 = { x: 60, y: 26 }
const p3 = { x: 100, y: 60 }

const optionsArc: OptionsArc = {
  xAxisRoatation: 1,
  largeArcFlag: 0,
  sweepFlag: 0,
  isCenter: true,
}

const d = drawArc(p1, p2, p3, optionsArc)


const points = [
  { x: 50, y: 50 },
  { x: 92, y: 115 },
  { x: 195, y: 88 },
] // 用这个参数计算出来的半径应该是 78.886
const dd = drawArc(points[0]!, points[1]!, points[2]!, {
  xAxisRoatation: 0,
  largeArcFlag: 0,
  sweepFlag: 0,
})
</script>
<template>
  <h1>测试 drawArc</h1>
  <svg width="400" height="400">
    <g id="">
      <path :d="d" fill="yellow" stroke="red" />
    </g>

    <g id="">
      <path :d="dd" fill="purple" stroke="red" />
    </g>
  </svg>
</template>

<style scoped></style>
