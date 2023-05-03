import { sin, cos, multiply, pi } from "mathjs"
// 这是绕着点 c0(a, b)旋转 theta 角的矩阵
const rotateMatrix = (a: number, b: number, theta: number) => [
  [cos(theta), sin(theta), 0],
  [-sin(theta), cos(theta), 0],
  [a - a * cos(theta) + b * sin(theta), b - b * cos(theta) - a * sin(theta), 1],
]
const RM = rotateMatrix(10, 5, pi / 3)
// 求点 p1{ x: 20, y: 5 } 绕 c0(10, 5) 旋转后的坐标
const p1 = { x: 20, y: 5 }
const rotated = multiply([p1.x, p1.y, 1], RM)
console.log(rotated)

// 直接返回旋转后的坐标
const rotate = (a: number, b: number, theta: number, px: number, py: number) => ({
  x: a + (px - a) * cos(theta) - (py - b) * sin(theta),
  y: b + (py - b) * cos(theta) + (px - a) * sin(theta),
})

console.log(rotate(10, 5, pi / 3, 20, 5))
