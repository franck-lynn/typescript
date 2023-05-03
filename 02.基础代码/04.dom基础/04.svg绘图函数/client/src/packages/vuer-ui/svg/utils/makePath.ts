import type { PathPoint } from "./types"
import { fail } from "./message"
import { drawArc } from "./drawArc"
import { drawLine } from "./drawLine"

export const makePath = (pts: PathPoint[], suffix = " Z ") => {
  if (!pts) fail("需要点坐标")
  if (pts.length < 1) return fail("画线至少需要2个点")
  if (pts[0]!.operator !== "M") fail("第1个点必须是 M")

  let s = ""

  for (let i = 0; i < pts.length; i++) {
    if (i > 0 && i < pts.length - 1 && pts[i]?.operator.startsWith("A")) {
      const operator = pts[i]?.operator.split("")
      s += drawArc(pts[i - 1]!, pts[i]!, pts[i + 1]!, {
        xAxisRoatation: parseFloat(operator![1]!),
        largeArcFlag: parseInt(operator![2]!) as 0 | 1,
        sweepFlag: parseInt(operator![3]!) as 0 | 1,
        isCenter: parseInt(operator![4]!) as 0 | 1,
      })
    } else {
      if (i === 0) {
        // 是第1个前面加 M
        s += "M " + drawLine(pts[i]!)
      } else if (i === pts.length - 1) {
        s += " L " + drawLine(pts[i]!) + suffix
      } else {
        s += " L " + drawLine(pts[i]!)
      }
    }
  }
  return s
}
