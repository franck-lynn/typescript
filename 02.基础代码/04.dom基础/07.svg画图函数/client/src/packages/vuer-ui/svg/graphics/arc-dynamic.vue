<script setup lang="ts">
import { ref, Ref, inject } from "vue"
import type { Point } from "../utils"
import { useDynamicArc } from "../utils"

// 注入类型加断言确定
// 注入的中心点作为指针的中心, r 作为指针的参照参数
const gaugeboardInject = inject("gaugeboard") as { center: Ref<Point>; r: Ref<number>; strokeWidth: Ref<number> }
const center = gaugeboardInject.center

// const pin = {
//   h: 0.618 * (gaugeboardInject.r.value + gaugeboardInject.strokeWidth.value), // 指针的高度
// }
// 根据高度计算圆弧的中心点
// const center = { x: 80 + 200, y: 0 + 200 } // 换成 宽, 高

const el = ref()

const { d, transform } = useDynamicArc(el, {
  radius: 80,
  rotatingCenter: { x: 200, y: 200 },
  dx: 200,
  dy: 200,
  startAngle: 0,
})
</script>
<template>
  <g id="">
    <circle :cx="center.x + 80" :cy="center.y" r="8" fill="red"></circle>
    <circle :cx="center.x + 80" :cy="center.y" r="8" fill="red" :transform="transform"></circle>
  </g>
  <g id="arc-dynamic">
    <path ref="el" :d="d" fill="none" stroke="green" stroke-width="10" />
  </g>
</template>

<style scoped>
#arc-dynamic {
  /* stroke-linejoin: round; */
  stroke-linecap: round;
}
</style>
