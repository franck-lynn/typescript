import type { Point } from "./types"
/**
 * 给内部使用的画线函数, 一条直线需要2个点
 * 这里一个点是表面需要和其他函数一起使用
 * @param p1
 * @returns
 */
export function _createLine(p1: Point) {
  return p1.x + " " + p1.y
}
