import { sin, cos, multiply, pi } from "mathjs"

import { zipObj } from "ramda"
// 单位矩阵 unitMatrix
const unitMatrix = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
]
// 2. 旋转矩阵函数
const rotationMatrix = (theta: number) => [
  [cos(theta), sin(theta), 0],
  [-sin(theta), cos(theta), 0],
  [0, 0, 1],
]

// 1.平移矩阵 moveMatrix
const moveMatrix = (dx: number, dy: number) => [
  [1, 0, 0],
  [0, 1, 0],
  [dx, dy, 1],
]

/* 
假设:
1. 旋转的中心点是 C0 (10, 5), 
2. 要旋转的点坐标为 p1(20, 5)
4. 旋转的角度为 π/3 即 60°
求 旋转后点的坐标 (绝对坐标和相对于旋转中心的坐标)
使用坐标的齐次变换
坐标点用 矢量*矩阵的方式求出
 */
// 则旋转的中心点坐标 c0 = { x: 10, y: 5 }
const c0 = { x: 10, y: 5 }
// 返回到坐标系原点
const O = moveMatrix(-c0.x, -c0.y)
// 旋转60度, 即 π/3, 旋转变换矩阵
const R = rotationMatrix(pi / 3)
// 返回到旋转中心
const B = moveMatrix(c0.x, c0.y)
// 平移到坐标系中心 -> 旋转 --> 平移到旋转中心后的矩阵
const A = [O, R, B].reduce((prev, current) => multiply(prev, current), unitMatrix)

const p1 = { x: 20, y: 5 }
const rotated = multiply([p1.x, p1.y, 1], A)
console.log(rotated)
const zipObject = zipObj(["x", "y"], rotated)
console.log(zipObject)
/*
[ 15, 13.660254037844386, 1 ]
{ x: 15, y: 13.660254037844386 }
*/
/*
绕坐标点 c0(a, b) 进行旋转的矩阵
[
  [cos(theta), sin(theta), 0],
  [-sin(theta), cos(theta), 0],
  [a - a* cos(theta) + b* sin(theta),  b - b* cos(theta) - a * sin(theta), 1]
]
得到的点的坐标为: 
x = a - (x-a) * cos(theta) - (y-b) * sin(theta)
y = b + (y-b) * cos(theta) - (x-a) * sin(theta)
*/
