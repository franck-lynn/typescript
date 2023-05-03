import type { Point, OptionsArc } from "./types"

/**
 * 给内部使用, 不单独使用, 与其他函数配合使用
 * 3 点画圆弧
 * @param p1 开始点
 * @param p2 中心点或者弧上的点
 * 如果 isCenter = 0 , 就是弧上的点
 * 如果 isCenter = 1 , 就是圆心, 默认值是 1
 * @param p3 结束点
 * @param options 有下面这些选项(可选的)
 *        xAxisRoatation?: number // 椭圆的 x轴旋转角度 默认值为 0, 不旋转
 *        largeArcFlag?: 0 | 1 // 如果圆弧 < 180度, 其为0, 如果圆弧角度 >= 180°, 其为1, 默认大弧
 *        sweepFlag?: 0 | 1 // 弧以负角度绘制为0, 以正角度绘制为 1, 默认正角度, web坐标系下是顺时针
 *        isCenter?: 0 | 1 // p2 点是否为圆弧中心, p2默认为圆弧中心点1
 * @returns 返回svg path 需要的字符串
 */
export function _createArc(p1: Point, p2: Point, p3: Point, options: OptionsArc) {
  const isCenter = options.isCenter
  let r = 0
  if (isCenter) {
    // p2 点是圆弧中心, 点必须能构成一个等腰三角形
    r = Math.sqrt(Math.pow(p2.y - p1.y, 2) + Math.pow(p2.x - p1.x, 2))
  } else {
    // p2 点不是圆弧中心,在弧上, 求出此时的半径 r
    // 下面 r = 是已知3点求圆的半径公式
    r =
      0.5 *
      Math.sqrt(
        ((Math.pow(p1.x, 2) - 2 * p1.x * p2.x + Math.pow(p2.x, 2) + Math.pow(p1.y - p2.y, 2)) *
          (Math.pow(p1.x, 2) - 2 * p1.x * p3.x + Math.pow(p3.x, 2) + Math.pow(p1.y - p3.y, 2)) *
          (Math.pow(p2.x, 2) - 2 * p2.x * p3.x + Math.pow(p3.x, 2) + Math.pow(p2.y - p3.y, 2))) /
          Math.pow(p3.x * (-p1.y + p2.y) + p2.x * (p1.y - p3.y) + p1.x * (-p2.y + p3.y), 2)
      )
  }
  const xAxisRoatation = options.xAxisRoatation ?? 0 // x 轴默认不旋转角度
  const largeArcFlag = options.largeArcFlag ?? 1 // 默认选取优弧
  const sweepFlag = options.sweepFlag ?? 1
  return _createEllipse(p1, r, r, xAxisRoatation, largeArcFlag, sweepFlag, p3)
}

/**
 * 给内部使用, 不单独使用, 与其他函数配合使用
 * @param startPoint  开始点
 * @param major 椭圆长轴半径
 * @param minor 椭圆短轴半径
 * @param xAxisRoatation x轴旋转角度, 是角度制, 不是弧度制
 * @param largeArcFlag 是否为大弧
 * @param sweepFlag 正角度绘制为 1
 * @param endPoint 结束点
 * @returns String 返回结果是 svg path 路径字符串
 */
function _createEllipse(
  startPoint: Point, // 开始点
  major: number, // 椭圆长轴半径
  minor: number, // 椭圆短轴半径
  xAxisRoatation: number, // x轴旋转角度, 是角度制, 不是弧度制
  largeArcFlag: 1 | 0, // 大弧
  sweepFlag: 0 | 1, // 正角度绘制为 1
  endPoint: Point // 结束点
) {
  return ` M ${startPoint.x} ${startPoint.y} A ${major} ${minor}, ${xAxisRoatation} , ${largeArcFlag}, ${sweepFlag}, ${endPoint.x} ${endPoint.y} `
}
