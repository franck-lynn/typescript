/*
绕指定点旋转 theta 并平移 dx, dy 的矩阵
[
  [cos(theta), sin(theta), 0],
  [-sin(theta), cos(theta), 0],
  [a - (a -dx)* cos(theta) + (b-dy)* sin(theta), b - (b -dy)*cos(theta) -(a -dx)* sin(theta), 1]
]
绕指定点旋转 theta 并平移 dx, dy 的公式
{
  x: a - a cos(theta) + dx cos(theta) + x cos(theta) +  b sin(theta) - dy sin(theta) - y sin(theta)
  y: b - b cos(theta) + dy cos(theta) + y cos(theta) -  a sin(theta) + dx sin(theta) + x sin(theta)
}
{
  x: a - (a - dx -x) * cos(theta) +  (b - dy - y) * sin(theta)
  y: b -( b -dy - y ) * cos(theta) -  (a - dx -x ) * sin(theta)
}
*/
import { sin, cos, multiply, pi } from "mathjs"
export type Point = {
  x: number
  y: number
}
const moveAndRotate = (c0: Point, p1: Point, theta: number, dx: number, dy: number) => ({
  x: c0.x - (c0.x - dx - p1.x) * cos(theta) + (c0.y - dy - p1.y) * sin(theta),
  y: c0.y - (c0.y - dy - p1.y) * cos(theta) - (c0.x - dx - p1.x) * sin(theta),
})
/* 点c0 (10, 5), 旋转 60度, 平移 0 */
console.log(moveAndRotate({ x: 10, y: 5 }, { x: 20, y: 5 }, pi / 3, 0, 0))
/* 点c0 (10, 5), 旋转  0度, 平移 20, 12 */
console.log(moveAndRotate({ x: 10, y: 5 }, { x: 20, y: 5 }, 0, 30, 12))
