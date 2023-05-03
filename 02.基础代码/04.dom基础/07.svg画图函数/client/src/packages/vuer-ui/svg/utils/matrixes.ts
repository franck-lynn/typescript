import type { Point } from "./types"
/**
 *
 * @param p1 要移动的点的绝对坐标
 * @param dx 移动的距离
 * @param dy
 * @returns Point 相对于绝对坐标的新的坐标
 *
 * 由平移矩阵推导出来的公式
 *
 * 矩阵公式使用:
 * 1. 首先在web 坐标系下给出点的坐标数组, 相对于绝对坐标系的原点标注
 * 2. 再通过变换公式移动到需要的位置
 * 3. 这样图形的中心位置也由原来的绝对坐标变成了新的坐标. 但是绝对坐标
 *    系保持不变
 */
export function moved(p1: Point, dx: number, dy: number) {
  return { x: p1.x + dx, y: p1.y + dy }
}
/**
 *
 * @param c0 要旋转的中心点
 * @param p1 要旋转的点
 * @param theta 旋转的角度, 角度输入的是度数
 * @returns Point 旋转后的坐标点
 * 由旋转矩阵推导出来的公式
 */
export function rotated(c0: Point, p1: Point, theta: number) {
  theta = (theta * Math.PI) / 180
  return {
    x: c0.x + (p1.x - c0.x) * Math.cos(theta) - (p1.y - c0.y) * Math.sin(theta),
    y: c0.y + (p1.y - c0.y) * Math.cos(theta) + (p1.x - c0.x) * Math.sin(theta),
  }
}
/**
 * @param p1 要旋转平移的点的绝对坐标
 * @param c0 要旋转的中心点, 不是绝对坐标原点
 * @param dx 从坐标原点 x 轴偏移量
 * @param dy 从坐标原点 y 轴偏移量
 * @param theta 旋转的角度, 输入的是角度 degree
 * @returns Point 返回变换后的点的坐标
 *
 * rotated 函数的平移和旋转矩阵的复合矩阵推导出来的公式
 * 首先在原始的浏览器坐标系下画点, 再将这个点平移 dx, dy, 在将这个点绕
 * c0 做旋转, c0 可以看作是图形的中心点.
 * 逆时针是 负值, 顺时针是正值
 * 当不旋转时, theta=0, 退化为 平移, c0 点不起作用
 */
export function moveAndRotated(p1: Point, c0: Point, dx: number, dy: number, theta: number): Point {
  theta = (theta * Math.PI) / 180
  return {
    x: c0.x - (c0.x - dx - p1.x) * Math.cos(theta) + (c0.y - dy - p1.y) * Math.sin(theta),
    y: c0.y - (c0.y - dy - p1.y) * Math.cos(theta) - (c0.x - dx - p1.x) * Math.sin(theta),
  }
}
