import type { Point, OptionsArc } from "./types"

export const createEllipse = (
  startPoint: Point, // 开始点
  major: number, // 椭圆长轴半径
  minor: number, // 椭圆短轴半径
  xAxisRoatation: number, // x轴旋转角度, 是角度制, 不是弧度制
  largeArcFlag: 1 | 0, // 大弧
  sweepFlag: 0 | 1, // 正角度绘制为 1
  endPoint: Point // 结束点
) => {
  return ` M ${startPoint.x} ${startPoint.y} A ${major} ${minor}, ${xAxisRoatation} , ${largeArcFlag}, ${sweepFlag}, ${endPoint.x} ${endPoint.y} `
}
// 3点画圆弧
export const drawArc = (p1: Point, p2: Point, p3: Point, options: OptionsArc) => {
  const isCenter = options.isCenter
  let r = 0
  if (isCenter) {
    // p2 点是圆弧中心, 点必须能构成一个等腰三角形
    r = Math.sqrt(Math.pow(p2.y - p1.y, 2) + Math.pow(p2.x - p1.x, 2))
  } else {
    // p2 点不是圆弧中心,在弧上, 求出此时的半径 r
    // 这是已知3点求圆的半径公式
    r =
      0.5 *
      Math.sqrt(
        ((Math.pow(p1.x, 2) - 2 * p1.x * p2.x + Math.pow(p2.x, 2) + Math.pow(p1.y - p2.y, 2)) *
          (Math.pow(p1.x, 2) - 2 * p1.x * p3.x + Math.pow(p3.x, 2) + Math.pow(p1.y - p3.y, 2)) *
          (Math.pow(p2.x, 2) - 2 * p2.x * p3.x + Math.pow(p3.x, 2) + Math.pow(p2.y - p3.y, 2))) /
          Math.pow(p3.x * (-p1.y + p2.y) + p2.x * (p1.y - p3.y) + p1.x * (-p2.y + p3.y), 2)
      )
  }
  return createEllipse(p1, r, r, options.xAxisRoatation, options.largeArcFlag, options.sweepFlag, p3)
}
