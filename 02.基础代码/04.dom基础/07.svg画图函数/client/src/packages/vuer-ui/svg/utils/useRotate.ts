import { ref, onMounted } from "vue"
import type { MaybeComputedRef } from "@vueuse/shared"
import { isClient, resolveUnref } from "@vueuse/shared"
import { useEventListener, defaultWindow, PointerType, Position } from "@vueuse/core"

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
