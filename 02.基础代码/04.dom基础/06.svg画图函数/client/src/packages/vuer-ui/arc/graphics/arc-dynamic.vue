<script setup lang="ts">
import { ref } from "vue"
import { makeArc, dynamicArc } from "../../svg/utils"

const el = ref()
// 画圆弧的数据
const r = 80
const startAngle = 210 // 度数
const endAngle = ref(30)

// 根据上述数据计算出圆弧需要的坐标, 起始点, 半径, 结束点
// let startPoint = { x: r * Math.cos((startAngle * Math.PI) / 180), y: r * Math.sin((startAngle * Math.PI) / 180) } // 开始点
// let endPoint = { x: r * Math.cos((endAngle * Math.PI) / 180), y: r * Math.sin((endAngle * Math.PI) / 180) } // 结束点

// // 这是以指定中心后要画的圆的坐标
// startPoint = moveAndRotated(startPoint, { x: 200, y: 200 }, 200, 200, 0)
// endPoint = moveAndRotated(endPoint, { x: 200, y: 200 }, 200, 200, 0)
// console.log(startPoint)
// // 开始以转换后的坐标画圆
// function makeArc(startPoint: Point, endPoint: Point, options: any) {
//   const d = `M ${startPoint.x} ${startPoint.y} A ${r} ${r}  ${options.xAxisRoatation}, ${options.largeArcFlag}, ${options.sweepFlag}, ${endPoint.x} ${endPoint.y}`
//   return d
// }
// 已知2点和 r, 求圆心坐标,
// const angle = dynamicArc(el, {
//   initialValue: { x: 200, y: 200 },
// })
const dd = dynamicArc(el, {
  initialValue: { x: 200, y: 200 },
})
// endAngle.value = angle.value!
console.log(endAngle.value)
const d = makeArc(startAngle, endAngle.value, r, { xAxisRoatation: 0, largeArcFlag: 0, sweepFlag: 1 })
console.log("返回的值----> ", dd.value)
</script>
<template>
  <g id="arc-dynamic">
    <path ref="el" :d="dd" fill="none" stroke="green" stroke-width="8" />
  </g>
</template>

<style scoped></style>
