import type { PathPoint } from "./types"
import { moveAndRotated } from "./matrixes"
/**
 *
 * @param points 要转换的数据点
 * @param newCenter 新的旋转中心, 一般而言, 要移动的目标位置就是旋转的中心,
 *                  即 dx = newCenter.x, dy = newCenter.y
 * 程序简化了旋转中心, 默认的情况是0°, 退化成了平移, 并没有旋转
 * @param dx  移动的距离
 * @param dy
 * @param theta 旋转的角度, 
 * @returns
 */
export function translatePathPoints(points: PathPoint[], dx: number, dy: number, theta = 0) {
  const newCenter = { x: dx, y: dy }
  return points.map((item) => {
    const translated = moveAndRotated(item, newCenter, dx, dy, theta)
    return Object.assign(translated, { operator: item.operator })
  })
}
