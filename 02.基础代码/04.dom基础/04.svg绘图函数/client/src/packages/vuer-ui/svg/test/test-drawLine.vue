<script setup lang="ts">
import {} from "vue"
import { drawLine } from "../utils/drawLine"

const points = [
  { x: 0, y: 0 },
  { x: 150, y: 150 },
  { x: 200, y: 70 },
]
const d = drawLine(points)
console.log(d)
</script>
<template>
  <h1>测试 drawLine</h1>
  <svg width="200" height="200">
    <g id="">
      <path :d="d" fill="yellow" stroke="red" />
    </g>
  </svg>
</template>

<style scoped></style>
