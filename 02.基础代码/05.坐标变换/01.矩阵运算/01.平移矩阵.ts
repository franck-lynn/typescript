/*
假设有一个点 p1(x, y), 需要进行平移 dx, dy, 求平移后新的坐标点
*/
import { multiply } from "mathjs"
import { zipObj } from "ramda"

export type Point = {
  x: number
  y: number
}
// 单位矩阵 unitMatrix
const unitMatrix = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
]
// 1.平移矩阵 moveMatrix
const moveMatrix = (dx: number, dy: number) => [
  [1, 0, 0],
  [0, 1, 0],
  [dx, dy, 1],
]

// 移动 30, 12 的距离
const M = moveMatrix(30, 12)
const p1 = { x: 10, y: 5 }
const moved = multiply([p1.x, p1.y, 1], M) // [ 40, 17, 1 ]
console.log(moved)
const zipObject = zipObj(["x", "y"], moved) // { x: 40, y: 17 }
console.log(zipObject)
/*
移动了 (30, 12)
[ 40, 17, 1 ]
{ x: 40, y: 17 }
*/
