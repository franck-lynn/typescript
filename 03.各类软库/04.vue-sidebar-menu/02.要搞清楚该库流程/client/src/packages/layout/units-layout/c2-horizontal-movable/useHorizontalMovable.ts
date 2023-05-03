import { ref } from "vue"
import type { MaybeComputedRef } from "@vueuse/shared"
import { isClient, resolveUnref } from "@vueuse/shared"
import { useEventListener, defaultWindow, PointerType } from "@vueuse/core"
import { resizeFlag } from "./useWindowResizable"

// 保存在 localStorge 中的键值, 左侧边栏的宽度
export const LEFT_SIDE_WIDTH = "left-side-width"
export const IS_NARROW = "is-narrow"

export const MIN_WIDTH = 45
// export const BREAK_POINT = 114
export const BREAK_POINT = 314

type PositionX = number

type HorizontalMovableOptions = {
  exact?: MaybeComputedRef<boolean>
  preventDefault?: MaybeComputedRef<boolean>

  draggingElement?: MaybeComputedRef<HTMLElement | SVGElement | Window | Document | null | undefined>
  handle?: MaybeComputedRef<HTMLElement | SVGElement | null | undefined>
  pointerTypes?: PointerType[]
  stopPropagation?: MaybeComputedRef<boolean>
  initialValue?: MaybeComputedRef<PositionX>

  breakPoint?: MaybeComputedRef<number>

  onStart?: (position: PositionX, event: PointerEvent) => void | false
  onMove?: (position: PositionX, event: PointerEvent) => void
  onEnd?: (position: PositionX, event: PointerEvent) => void
}

export const useHorizontalMovable = (
  target: MaybeComputedRef<HTMLElement | SVGElement | null | undefined>,
  options: HorizontalMovableOptions = {}
) => {
  const movableElement = options.draggingElement ?? defaultWindow // window 下调用监听
  const draggingHandle = options.handle ?? target // 要移动的元素

  const breakPoint = options.breakPoint ?? BREAK_POINT
  const isNarrow = ref<boolean>(false)

  // 要返回的点的坐标, 用于保存移动的点 p1 的坐标的, 与下面 p1 不同的是,
  // p1 是开始移动前的位置, position 是移动后的位置
  const position = ref<PositionX>(resolveUnref(options.initialValue) ?? MIN_WIDTH)

  const filterEvent = (e: PointerEvent) => {
    if (options.pointerTypes) return options.pointerTypes.includes(e.pointerType as PointerType)
    return true // 过滤鼠标事件
  }
  const handleEvent = (e: PointerEvent) => {
    if (resolveUnref(options.preventDefault)) e.preventDefault() // 阻止鼠标的默认行为
    if (resolveUnref(options.stopPropagation)) e.stopPropagation()
  }

  // 下面不用响应式变量的原因是对象数据引用的问题
  let a = 0 // 记录鼠标的起始位置
  let p1: PositionX = 0 // 是开始移动前的位置
  let flag = false // 鼠标按下抬起开关
  let w = 0 // 取移动块的宽度, 由于是内部变量, 所以要提升到全局, 方便各函数共用

  const start = (e: PointerEvent) => {
    if (!filterEvent(e)) return // 如果不是这3个鼠标行为就返回
    if (resolveUnref(options.exact) && e.target !== resolveUnref(target)) return
    flag = true
    resizeFlag.value = false
    // 获取移动块的左边距和宽度
    const { left, width } = resolveUnref(target)!.getBoundingClientRect()

    a = e.clientX // 鼠标起始位置变成当前位置
    // 这里要是 svg 圆的话, p1 要移动的点的坐标根据圆的定位进行计算
    p1 = left
    w = width

    handleEvent(e) // 阻止鼠标默认行为
  }

  const move = (e: PointerEvent) => {
    if (!filterEvent(e)) return
    if (!flag) return
    const dx = e.clientX - a // 鼠标的相对位移
    // ! 设置限位
    const _w = window.innerWidth - w
    position.value = Math.min(Math.max(MIN_WIDTH, p1 + dx), _w)
    // ! 设置判断宽窄
    isNarrow.value = position.value < breakPoint ? true : false

    options.onMove?.(p1, e)
    handleEvent(e)
  }
  const end = (e: PointerEvent) => {
    if (!filterEvent(e)) return
    flag = false
    resizeFlag.value = false
    // ! 停止移动时将位置和宽窄信息保存到 localStroge
    localStorage.setItem(LEFT_SIDE_WIDTH, position.value + "")
    // ! 这个也要保存, 因为加载时这个值并没有
    localStorage.setItem(IS_NARROW, isNarrow.value + "")
    options.onEnd?.(p1, e)
    handleEvent(e)
  }

  if (isClient) {
    useEventListener(draggingHandle, "pointerdown", start, true)
    useEventListener(movableElement, "pointermove", move, true)
    useEventListener(movableElement, "pointerup", end, true)
  }

  return { position, isNarrow }
}
