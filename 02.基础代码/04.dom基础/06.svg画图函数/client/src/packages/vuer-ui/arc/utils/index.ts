import { ref } from "vue"
import type { MaybeComputedRef } from "@vueuse/shared"
import { isClient, resolveUnref } from "@vueuse/shared"
import { useEventListener, defaultWindow, PointerType, Position } from "@vueuse/core"

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

/**
 *
 * @param points 要转换的数据点
 * @param newCenter 新的旋转中心, 一般而言, 要移动的目标位置就是旋转的中心,
 *                  即 dx = newCenter.x, dy = newCenter.y
 * @param dx  移动的距离
 * @param dy
 * @param theta 旋转的角度, 逆时针
 * @returns
 */
export function translatePathPoints(points: PathPoint[], dx: number, dy: number, theta = 0) {
  const newCenter = { x: dx, y: dy }
  return points.map((item) => {
    const translated = moveAndRotated(item, newCenter, dx, dy, theta)
    return Object.assign(translated, { operator: item.operator })
  })
}

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

/**
 * 给内部使用, 不单独使用, 与其他函数配合使用
 * 3 点画圆弧
 * @param p1  开始点
 * @param p2 中心点或者弧上的点, 如果 isCenter = 0 , 就是弧上的点
 * @param p3
 * @param options
 * @returns
 */
export function _createArc(p1: Point, p2: Point, p3: Point, options: OptionsArc) {
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
  return _createEllipse(p1, r, r, options.xAxisRoatation, options.largeArcFlag, options.sweepFlag, p3)
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

/**
 * 给内部使用的画线函数, 一条直线需要2个点
 * 这里一个点是表面需要和其他函数一起使用
 * @param p1
 * @returns
 */
function _createLine(p1: Point) {
  return p1.x + " " + p1.y
}

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

/**
 *
 * @param thing 错误处理
 */
export function fail(thing: string) {
  throw new Error(thing)
}
/**
 *
 * @param thing 警告处理
 */
export function warn(thing: string) {
  console.log(["Warning: ", thing].join(" "))
}
/**
 *
 * @param thing 注意处理
 */
export function note(thing: string) {
  console.log(["Note: ", thing].join(" "))
}

// 指针旋转的函数
type UseRotateOptions = {
  exact?: MaybeComputedRef<boolean>
  preventDefault?: MaybeComputedRef<boolean>

  draggingElement?: MaybeComputedRef<HTMLElement | SVGElement | Window | Document | null | undefined>
  handle?: MaybeComputedRef<HTMLElement | SVGElement | null | undefined>
  pointerTypes?: PointerType[]
  stopPropagation?: MaybeComputedRef<boolean>

  // 必须传入旋转中心坐标
  initialValue: MaybeComputedRef<Position>
  defaultAngle?: MaybeComputedRef<number>
  rangeAngle?: MaybeComputedRef<{ startAngle: number; endAngle: number }>

  // 开始移动要干的事情
  onStart?: (event: PointerEvent) => void | false
  onMove?: (event: PointerEvent) => void
  onEnd?: (event: PointerEvent) => void
}
export function useRotate(
  target: MaybeComputedRef<HTMLElement | SVGElement | null | undefined>,
  options: UseRotateOptions
) {
  const movableElement = options.draggingElement ?? defaultWindow // window 下调用监听
  const draggingHandle = options.handle ?? target
  const filterEvent = (e: PointerEvent) => {
    if (options.pointerTypes) return options.pointerTypes.includes(e.pointerType as PointerType)
    return true // 过滤鼠标事件
  }
  const handleEvent = (e: PointerEvent) => {
    if (resolveUnref(options.preventDefault)) e.preventDefault() // 阻止鼠标的默认行为
    if (resolveUnref(options.stopPropagation)) e.stopPropagation()
  }
  let flag = false
  const center = resolveUnref(options.initialValue)
  // 动态的rotate(${angle ? angle : 0} , 200, 200)` 文本, 要导出
  const transform = ref<string>()

  const defaultAngle = resolveUnref(options.defaultAngle) ?? 0
  const rangeAngle = resolveUnref(options.rangeAngle) ?? null

  let theta = 0
  onMounted(() => {
    transform.value = `rotate(${defaultAngle} , ${center.x}, ${center.y})`
  })

  const start = (e: PointerEvent) => {
    if (!filterEvent(e)) return // 如果不是这3个鼠标行为就返回
    if (resolveUnref(options.exact) && e.target !== resolveUnref(target)) return
    flag = true
    // 计算出此时向量的角度
    options.onStart?.(e)
    handleEvent(e) // 阻止鼠标默认行为
  }

  const move = (e: PointerEvent) => {
    if (!filterEvent(e)) return
    if (!flag) return
    // 鼠标值 - 旋转中心 保存这个值
    const a = e.clientX - center.x
    const b = e.clientY - center.y
    // 根据2个向量计算出旋转的弧度
    // :transform="`rotate(${angle ? angle : 0} , 200, 200)`"s
    // 需要角度, 所以要转化下角度
    // 由于竖直向上是 -90 度, 要从 0 度开始, 还要加上 90度
    theta = (Math.atan2(b, a) * 180) / Math.PI + 90
    // θ角范围 从 -90 ~ 270度,
    // 假设要求角度范围为 [-60, 60]

    // 当θ < 0 时,
    if (rangeAngle) {
      theta = Math.min(Math.max(theta, rangeAngle.startAngle), rangeAngle.endAngle)
    }

    transform.value = `rotate(${theta ? theta : 0} , ${center.x}, ${center.y})`
    options.onMove?.(e)
    handleEvent(e)
  }
  const end = (e: PointerEvent) => {
    if (!filterEvent(e)) return
    flag = false
    options.onEnd?.(e)
    handleEvent(e)
  }
  if (isClient) {
    useEventListener(draggingHandle, "pointerdown", start, true)
    useEventListener(movableElement, "pointermove", move, true)
    useEventListener(movableElement, "pointerup", end, true)
  }
  return transform
}

// 动态圆弧函数
type dynamicArcOptions = {
  exact?: MaybeComputedRef<boolean>
  preventDefault?: MaybeComputedRef<boolean>

  draggingElement?: MaybeComputedRef<HTMLElement | SVGElement | Window | Document | null | undefined>
  handle?: MaybeComputedRef<HTMLElement | SVGElement | null | undefined>
  pointerTypes?: PointerType[]
  stopPropagation?: MaybeComputedRef<boolean>

  // 必须传入旋转中心坐标
  initialValue: MaybeComputedRef<Position>
  startAngle?: MaybeComputedRef<number>
  // endAngle?: MaybeComputedRef<number>
  radius?: MaybeComputedRef<number>

  // 开始移动要干的事情
  onStart?: (event: PointerEvent) => void | false
  onMove?: (event: PointerEvent) => void
  onEnd?: (event: PointerEvent) => void
}
export function dynamicArc(
  target: MaybeComputedRef<HTMLElement | SVGElement | null | undefined>,
  options: dynamicArcOptions
) {
  const movableElement = options.draggingElement ?? defaultWindow // window 下调用监听
  const draggingHandle = options.handle ?? target
  const filterEvent = (e: PointerEvent) => {
    if (options.pointerTypes) return options.pointerTypes.includes(e.pointerType as PointerType)
    return true // 过滤鼠标事件
  }
  const handleEvent = (e: PointerEvent) => {
    if (resolveUnref(options.preventDefault)) e.preventDefault() // 阻止鼠标的默认行为
    if (resolveUnref(options.stopPropagation)) e.stopPropagation()
  }

  const center = resolveUnref(options.initialValue)

  let flag = false

  const transform = ref<string>()
  // const startAngle = resolveUnref(options.startAngle)
  // const endAngle = resolveUnref(options.endAngle)
  const startAngle = 210
  const endAngle = ref(30)
  // const radius = resolveUnref(options.radius)
  const radius = 80

  let theta = 10
  onMounted(() => {
    transform.value = makeArc(startAngle!, endAngle!.value, radius!, {
      xAxisRoatation: 0,
      largeArcFlag: 0,
      sweepFlag: 1,
    })
    console.log("加载时 ---> ", transform.value)
  })
  const start = (e: PointerEvent) => {
    if (!filterEvent(e)) return // 如果不是这3个鼠标行为就返回
    if (resolveUnref(options.exact) && e.target !== resolveUnref(target)) return
    flag = true
    // 计算出此时向量的角度
    options.onStart?.(e)
    handleEvent(e) // 阻止鼠标默认行为
  }

  const move = (e: PointerEvent) => {
    if (!filterEvent(e)) return
    if (!flag) return
    // 鼠标值 - 旋转中心 保存这个值
    const a = e.clientX - center.x
    const b = e.clientY - center.y
    // 根据2个向量计算出旋转的弧度
    // :transform="`rotate(${angle ? angle : 0} , 200, 200)`"s
    // 需要角度, 所以要转化下角度
    // 由于竖直向上是 -90 度, 要从 0 度开始, 还要加上 90度
    theta = (Math.atan2(b, a) * 180) / Math.PI + 90
    // θ角范围 从 -90 ~ 270度,
    // 假设要求角度范围为 [-60, 60]
    console.log("sdjksdwjkhedwe", theta)
    endAngle.value = theta
    transform.value = makeArc(startAngle!, endAngle!.value, radius!, {
      xAxisRoatation: 0,
      largeArcFlag: 0,
      sweepFlag: 1,
    })

    options.onMove?.(e)
    handleEvent(e)
  }
  const end = (e: PointerEvent) => {
    if (!filterEvent(e)) return
    flag = false
    options.onEnd?.(e)
    handleEvent(e)
  }
  if (isClient) {
    useEventListener(draggingHandle, "pointerdown", start, true)
    useEventListener(movableElement, "pointermove", move, true)
    useEventListener(movableElement, "pointerup", end, true)
  }

  return transform
}

/**
 * 以 svg 的方式画圆弧, 0 度是从 x 轴正向开始的,
 * 当在 [0~90°]时, largeArcFlag: 0, sweepFlag: 1
 * 当在 大于 180度时,  largeArcFlag: 1, sweepFlag: 1
 *
 * @param startAngle
 * @param endAngle
 * @param r
 * @param options
 * @returns
 */
export function makeArc(startAngle: number, endAngle: number, r: number, options: OptionsArc) {
  // 根据上述数据计算出圆弧需要的坐标, 起始点, 半径, 结束点
  let startPoint = { x: r * Math.cos((startAngle * Math.PI) / 180), y: r * Math.sin((startAngle * Math.PI) / 180) } // 开始点
  let endPoint = { x: r * Math.cos((endAngle * Math.PI) / 180), y: r * Math.sin((endAngle * Math.PI) / 180) } // 结束点

  // 这是以指定中心后要画的圆的坐标
  startPoint = moveAndRotated(startPoint, { x: 200, y: 200 }, 200, 200, 0)
  endPoint = moveAndRotated(endPoint, { x: 200, y: 200 }, 200, 200, 0)
  // 有 4种组合情况, 分别是:
  // 1. 大弧, 正向
  // 2. 大弧, 负向
  // 3. 小狐, 正向
  // 4. 小弧, 负向
  const d = `M ${startPoint.x} ${startPoint.y} A ${r} ${r}  ${options.xAxisRoatation}, ${options.largeArcFlag}, ${options.sweepFlag}, ${endPoint.x} ${endPoint.y}`
  console.log(d)
  return d
}
