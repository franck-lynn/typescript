export interface Point {
  x: number
  y: number
}
export interface PathPoint extends Point {
  operator: string
}

export interface OptionsArc {
  xAxisRoatation: number // 椭圆的 x轴旋转角度
  largeArcFlag: 0 | 1 // 如果圆弧 < 180度, 其为0, 如果圆弧角度 >= 180°, 其为1
  sweepFlag: 0 | 1 // 弧以负角度绘制为0, 以正角度绘制为 1
  isCenter?: 0 | 1 // p2 点是否为圆弧中心
}
