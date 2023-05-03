import { ref, onMounted } from "vue"
import type { MaybeComputedRef } from "@vueuse/shared"
import { isClient, resolveUnref } from "@vueuse/shared"
import { useEventListener, defaultWindow, PointerType, Position } from "@vueuse/core"
import { makeArc } from "./makePaths"

// 动态圆弧函数
type dynamicArcOptions = {
  exact?: MaybeComputedRef<boolean>
  preventDefault?: MaybeComputedRef<boolean>

  draggingElement?: MaybeComputedRef<HTMLElement | SVGElement | Window | Document | null | undefined>
  handle?: MaybeComputedRef<HTMLElement | SVGElement | null | undefined>
  pointerTypes?: PointerType[]
  stopPropagation?: MaybeComputedRef<boolean>

  // 必须传入旋转中心坐标, 如果旋转是 0 度, 传什么都可以,
  // 因为已经退化为平移了
  rotatingCenter?: MaybeComputedRef<Position>
  dx?: MaybeComputedRef<number>
  dy?: MaybeComputedRef<number>

  startAngle?: MaybeComputedRef<number>
  endAngle?: MaybeComputedRef<number>
  radius: MaybeComputedRef<number>

  // 开始移动要干的事情
  onStart?: (event: PointerEvent) => void | false
  onMove?: (event: PointerEvent) => void
  onEnd?: (event: PointerEvent) => void
}
export function useDynamicArc(
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

  const rotatingCenter = resolveUnref(options.rotatingCenter) ?? { x: 0, y: 0 }

  const dx = resolveUnref(options.dx) ?? 0
  const dy = resolveUnref(options.dy) ?? 0

  const startAngle = resolveUnref(options.startAngle) ?? 0
  // 加一点点度数, 表面是一段圆弧, 没有度差就无法显示出来
  let endAngle = resolveUnref(options.endAngle) ?? startAngle + 0.001
  const radius = resolveUnref(options.radius)

  let flag = false
  const theta = 0

  const d = ref<string>()
  const transform = ref<string>()

  onMounted(() => {
    // 加载时, 如果起始角, 结束角都有默认值
    d.value = makeArc(startAngle, endAngle, radius, {
      xAxisRoatation: 0,
      largeArcFlag: 0,
      sweepFlag: 1,
      rotatingCenter,
      dx,
      dy,
      theta: 0,
    })
    transform.value = `rotate(${startAngle} , ${rotatingCenter.x}, ${rotatingCenter.y})`
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
    const a = e.clientX - rotatingCenter.x
    const b = e.clientY - rotatingCenter.y
    // 根据2个向量计算出旋转的弧度
    // :transform="`rotate(${angle ? angle : 0} , 200, 200)`"s
    // 需要角度, 所以要转化下角度
    // 由于竖直向上是 -90 度, 要从 0 度开始, 还要加上 90度
    endAngle = (Math.atan2(b, a) * 180) / Math.PI
    // θ角范围 从 -90 ~ 270度,
    // 假设要求角度范围为 [-60, 60]
    d.value = makeArc(startAngle, endAngle, radius, {
      xAxisRoatation: 0,
      largeArcFlag: 1,
      sweepFlag: 1,
      rotatingCenter,
      dx,
      dy,
      theta,
    })
    transform.value = transform.value = `rotate(${endAngle ? endAngle : 0} , ${rotatingCenter.x}, ${rotatingCenter.y})`
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

  return { d, transform }
}
