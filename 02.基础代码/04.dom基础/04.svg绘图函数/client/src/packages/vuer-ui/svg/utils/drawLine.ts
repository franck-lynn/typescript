// import { fail } from "./message"
import type { PathPoint } from "./types"
// import { moveAndRotated } from "./matrixes"

/**
 *
 * @param points 要旋转平移的点的绝对坐标,
 * @param c0 要旋转的中心点, 不是绝对坐标原点,  如果dx, dy angle 没有, 则这个不需要
 * @param dx 从坐标原点 x 轴偏移量
 * @param dy 从坐标原点 y 轴偏移量
 * @param angle 旋转的角度, 输入的是角度 degree
 * @param z 是否封闭曲线?
 * @returns
 */
// export const drawLine = (points: Point[], c0: Point = { x: 0, y: 0 }, dx = 0, dy = 0, angle = 0, z = "") => {
//   if (!points) return fail("需要点坐标")
//   if (points.length < 1) return fail("画线至少需要2个点")
//   const pts = points.map((point) => moveAndRotated(point, c0, dx, dy, angle))
//   let s = ""
//   for (let i = 0; i < pts.length; i++) {
//     if (i === 0) {
//       s += "M" + " " + pts[i]!.x + " " + pts[i]!.y + " "
//     } else if (i === pts.length - 1) {
//       s += "L" + " " + pts[i]!.x + " " + pts[i]!.y
//     } else {
//       s += "L" + " " + pts[i]!.x + " " + pts[i]!.y + " "
//     }
//   }
//   return s + z
// }
export const drawLine = (p1: PathPoint) => {
  return p1.x + " " + p1.y
}
