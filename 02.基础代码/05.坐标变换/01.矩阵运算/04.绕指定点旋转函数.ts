import { sin, cos,  pi } from "mathjs"

export type Point = {
  x: number
  y: number
}
const rotated = (c0: Point, p1: Point, theta: number) => ({
  x: c0.x + (p1.x - c0.x) * cos(theta) - (p1.y - c0.y) * sin(theta),
  y: c0.y + (p1.y - c0.y) * cos(theta) + (p1.x - c0.x) * sin(theta),
})
// 坐标变换后
console.log(rotated({ x: 10, y: 5 }, { x: 20, y: 5 }, pi / 3))
