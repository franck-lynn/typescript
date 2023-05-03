<script setup lang="ts">
import {} from "vue"
// import { createEllipse } from "../utils/drawArc"

// const d = createEllipse(302, 152, )
// <path d="M 302 152 A 150 120, 0, 1, 0, 2 152" fill="yellow" stroke="red" /> 说明
// M 302 152 是起始点
// A 开始画椭圆
// A 150 120 长轴和短轴
// A 150 120, 0 x轴不旋转
// A 150 120, 0, 1, 圆弧 < 180°
// A 150 120, 0, 1, 0, 负角度绘制
// A 150 120, 0, 1, 0, 2 152 终点坐标
</script>
<template>
  <h2>测试椭圆</h2>
  <svg width="400" height="400">
    <g id="">
      <path d="M 302 152 A 150 120, 0, 1, 0, 2 152" fill="yellow" stroke="red" />
    </g>
    <g fill="none" stroke="yellowgreen">
      <path d="M 125,75 A100,50 0 0,0 225,125" />

      <!-- <path d="M 125,75 A100,50 0 0,1 225,125" /> -->

      <!-- <path d="M 125,75 A100,50 0 1,0 225,125" /> -->

      <!-- <path d="M 125,75 A100,50 0 1,1 225,125" /> -->
    </g>
  </svg>
</template>

<style scoped>
svg {
  border: 1px solid red;
}
</style>
