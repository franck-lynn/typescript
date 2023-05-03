<script setup lang="ts">
// https://segmentfault.com/a/1190000041536375?utm_source=weekly
// https://github.com/deepmeena70/mouse-drag-and-rotate/blob/master/index.html

const points1 = [
  { x: 4, y: 12, operator: "M" },
  { x: 4, y: 0, operator: "L" },

  { x: 1.8, y: -132, operator: "L" },
  { x: -1.8, y: -132, operator: "L" },

  { x: -4, y: 0, operator: "L" },
  { x: -4, y: 12, operator: "L" },
  { x: 4, y: 12, operator: " " },
]
// 把所有点移动到 {x: 200, y:200}的位置, 并绕这个点{x: 200, y:200}  旋转 90度
const point2 = moveAndRotatedPoints(points1, 200, 200, 0)

const d = makePath(point2)
// 生成路径函数
function makePath(points: PathPoint[]) {
  let s = ""
  for (let i = 0; i < points.length; i++) {
    if (i === points.length - 1) {
      s += " " + points[i]?.x + " " + points[i]?.y + "" + points[i]?.operator + " "
    } else {
      s += points[i]?.operator + " " + points[i]?.x + " " + points[i]?.y
    }
  }
  console.log(s)
  return s
}

function moveAndRotatedPoints(points: PathPoint[], dx: number, dy: number, theta: number) {
  const newCenter = { x: dx, y: dy }
  return points.map((item) => {
    const translated = moveAndRotated(item, newCenter, dx, dy, theta)
    return Object.assign(translated, { operator: item.operator })
  })
}

function moveAndRotated(p1: Point, c0: Point, dx: number, dy: number, theta: number): Point {
  theta = (theta * Math.PI) / 180
  return {
    x: c0.x - (c0.x - dx - p1.x) * Math.cos(theta) + (c0.y - dy - p1.y) * Math.sin(theta),
    y: c0.y - (c0.y - dy - p1.y) * Math.cos(theta) - (c0.x - dx - p1.x) * Math.sin(theta),
  }
}
interface Point {
  x: number
  y: number
}
interface PathPoint extends Point {
  operator: string
}
</script>
<template>
  <svg width="400px" height="400px">
    <g id="arrow">
      <path :d="d" fill="yellow" stroke="red" />
      <circle cx="200" cy="200" r="3"></circle>
    </g>

    <use xlink:href="#arrow" transform="rotate(30, 200, 200)" />
  </svg>
</template>

<style scoped>
svg {
  position: absolute;
  border: 1px solid red;
}
</style>
