<script setup lang="ts">
import {} from "vue"
import { makeArc } from "../utils"
const startAngle = -30
const endAngle = 30
const r = 165
const options = {
  dx: 200,
  dy: 200,
}

const d = makeArc(startAngle, endAngle, r, options)
</script>
<template>
  <g id="">
    <path id="around-text" :d="d" fill="none" stroke-width="1" stroke="red" />
  </g>
  <defs>
    <path id="around-text" :d="d" fill="none" stroke-width="1" stroke="red" />
  </defs>
  <defs>
    <!-- 定义环形文字的发光效果, 如提交, 审核等文件的发光效果, 如果没有激活, 文字变暗 -->
    <filter id="glow">
      <feColorMatrix
        type="matrix"
        values="0 0 0 0 0
                                                     0 0 0 0.9 0
                                                     0 0 0 0.9 0
                                                     0 0 0 1 0"
      />
      <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
      <feMerge>
        <feMergeNode in="coloredBlur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
  <text>
    <textPath
      class="around-text"
      xlink:href="#around-text"
      style="text-anchor: middle"
      startOffset="50%"
      filter="url(#glow)"
    >
      弧上文字
    </textPath>
  </text>
</template>

<style scoped></style>
