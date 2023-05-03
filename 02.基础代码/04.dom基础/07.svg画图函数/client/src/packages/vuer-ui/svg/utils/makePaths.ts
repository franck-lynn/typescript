import type { Point, PathPoint, OptionsArc } from "./types"
import { fail } from "./errors"
import { moveAndRotated } from "./matrixes"
import { _createArc } from "./createArc"
import { _createLine } from "./createLine"

/**
 *
 * @param pts 是一系列的点的坐标和操作符
 * x: number
 * y: number
 * operator: string
 * @returns svg path 需要的字符串
 * 点的坐标一般是原始坐标经过平移, 旋转后的坐标点.
 * 没有变换之前, 坐标原点一般在 {x: 0, y: 0} 位置
 * 如果只有2个点, 则只能画一条直线
 * 如果有3个点, 可以画一个圆
 * 如果多于3个点, 可以画直线和圆
 */
export function makePath(pts: PathPoint[]) {
  if (!pts) fail("需要点坐标")
  if (pts.length < 1) return fail("画线至少需要2个点")
  if (pts[0]!.operator !== "M") fail("第1个点必须是 M")

  let s = ""

  for (let i = 0; i < pts.length; i++) {
    if (i > 0 && i < pts.length - 1 && pts[i]?.operator.startsWith("A")) {
      const operator = pts[i]?.operator.split("")
      s += _createArc(pts[i - 1]!, pts[i]!, pts[i + 1]!, {
        xAxisRoatation: parseFloat(operator![1]!),
        largeArcFlag: parseInt(operator![2]!) as 0 | 1,
        sweepFlag: parseInt(operator![3]!) as 0 | 1,
        isCenter: parseInt(operator![4]!) as 0 | 1,
      })
    } else {
      if (i === 0) {
        // 是第1个前面加 M
        s += "M " + _createLine(pts[i]!)
      } else if (i === pts.length - 1) {
        s += " L " + _createLine(pts[i]!) + pts[i]?.operator
      } else {
        s += " L " + _createLine(pts[i]!)
      }
    }
  }
  return s
}

interface OptionsCircle {
  // 偏移的坐标
  dx: number
  dy: number
  rotatingCenter?: Point
  theta?: number
  // 绕哪个点旋转多少度角
}

interface OptionsMakeArc extends OptionsArc, OptionsCircle {}

/**
 *  单独画一段圆弧
 * @param startAngle 起始角
 * @param endAngle 结束角
 * @param r  半径
 * @param options 有下面的一些选项
 *  dx: number  平移位移
 *  dy: number
 *  rotatingCenter?: Point 绕哪个点旋转, 程序根据 r 和 startAngle, endAngle
 *                   计算出点的坐标, 坐标原点是在 {x: 0, y: 0} 的位置.
 *                   需要将这个点进行平移和旋转到需要的位置,
 *                   起始点和结束点是相对于哪个点旋转呢? 这就是
 *                   rotatingCenter 需要指定的
 *  theta?: number 旋转角度,  绕 rotatingCenter 旋转多少°
 *
 *  xAxisRoatation?: number // 椭圆的 x轴旋转角度 默认值为 0, 不旋转
 *  largeArcFlag?: 0 | 1 // 如果圆弧 < 180度, 其为0, 如果圆弧角度 >= 180°, 其为1, 默认大弧
 *  sweepFlag?: 0 | 1 // 弧以负角度绘制为0, 以正角度绘制为 1, 默认正角度, web坐标系下是顺时针
 *  isCenter?: 0 | 1 // p2 点是否为圆弧中心, p2默认为圆弧中心点1
 * @returns
 */
export function makeArc(startAngle: number, endAngle: number, r: number, options: OptionsMakeArc) {
  // 根据上述数据计算出圆弧需要的坐标, 起始点, 半径, 结束点
  let startPoint = { x: r * Math.cos((startAngle * Math.PI) / 180), y: r * Math.sin((startAngle * Math.PI) / 180) } // 开始点
  let endPoint = { x: r * Math.cos((endAngle * Math.PI) / 180), y: r * Math.sin((endAngle * Math.PI) / 180) } // 结束点
  // 这是以指定中心后要画的圆的坐标
  const rotatingCenter = options.rotatingCenter ?? { x: 0, y: 0 }
  const theta = options.theta ?? 0
  const dx = options.dx
  const dy = options.dy

  // 在画圆之前要把坐标移动或旋转到需要的位置
  startPoint = moveAndRotated(startPoint, rotatingCenter, dx, dy, theta)
  endPoint = moveAndRotated(endPoint, rotatingCenter, dx, dy, theta)

  const xAxisRoatation = options.xAxisRoatation ?? 0
  let largeArcFlag = options.largeArcFlag ?? 1
  const sweepFlag = options.sweepFlag ?? 1 // 目前, 只以顺时针转动为默认
  // 有 4种组合情况, 分别是:
  // 1. 大弧, 正向
  // 2. 大弧, 负向
  // 3. 小狐, 正向
  // 4. 小弧, 负向
  largeArcFlag = Math.abs(endAngle - startAngle) < 180 ? (endAngle > startAngle ? 0 : 1) : endAngle > startAngle ? 1 : 0
  return `M ${startPoint.x} ${startPoint.y} A ${r} ${r}  ${xAxisRoatation}, ${largeArcFlag}, ${sweepFlag}, ${endPoint.x} ${endPoint.y}`
}
