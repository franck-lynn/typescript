import { ref } from "vue"
import type { MaybeRef } from "@vueuse/shared"
import { isClient, toValue } from "@vueuse/shared"
import { useEventListener, defaultWindow, Position, PointerType } from "@vueuse/core"

import { position as pos } from "../../../commons"

type AllDirectionResizeableOption = {
  exact?: MaybeRef<boolean>
  preventDefault?: MaybeRef<boolean>

  draggingElement?: MaybeRef<HTMLElement | SVGElement | Window | Document | null | undefined>
  handle?: MaybeRef<HTMLElement | SVGElement | null | undefined>
  pointerTypes?: PointerType[]
  stopPropagation?: MaybeRef<boolean>
  initialValue?: MaybeRef<Position>

  onStart?: (position: Position, event: PointerEvent) => void | false
  onMove?: (position: Position, event: PointerEvent) => void
  onEnd?: (position: Position, event: PointerEvent) => void

  movable?: string

  right?: string
  left?: string
  bottom?: string
  top?: string
}

export const useAllDirectionResizeable = (
  target: MaybeRef<HTMLElement | SVGElement | null | undefined>,
  options: AllDirectionResizeableOption = {}
): void => {
  const win = options.draggingElement ?? defaultWindow // window 下调用监听
  // 直接在这个文件为元素设置 style 属性
  const el = ref<HTMLElement | null>()

  onMounted(() => {
    el.value = toValue(target) as HTMLElement
    if (!el.value) return
  })

  const movable = options.movable || "content-header"

  const right = options.right || "right" // 缩放的类
  const left = options.left || "left"
  const bottom = options.bottom || "bottom"
  const top = options.top || "top"

  const listener = options.draggingElement ?? defaultWindow // window 下调用监听

  const filterEvent = (e: PointerEvent) => {
    if (options.pointerTypes) return options.pointerTypes.includes(e.pointerType as PointerType)
    return true // 过滤鼠标事件
  }
  const handleEvent = (e: PointerEvent) => {
    if (toValue(options.preventDefault)) e.preventDefault() // 阻止鼠标的默认行为
    if (toValue(options.stopPropagation)) e.stopPropagation()
  }

  // 下面不用响应式变量的原因是对象数据引用的问题
  let a = 0
  let b = 0
  let p1: Position = { x: 45, y: 0 }
  let flag = false

  let h = 0
  let w = 0
  let l = 0
  let t = 0

  let clicked = ""
  let style: Partial<CSSStyleDeclaration>

  const start = (e: PointerEvent) => {
    if (!el.value) return
    style = el.value.style
    if (!style) return

    if (!filterEvent(e)) return // 如果不是这3个鼠标行为就返回
    if (toValue(options.exact) && e.target !== toValue(target)) return

    const { left, top, width, height } = toValue(target)!.getBoundingClientRect()

    clicked = (e.target as HTMLElement).className

    flag = true
    a = e.clientX
    b = e.clientY
    p1 = { x: left, y: top }
    w = width
    h = height
    l = left
    t = top

    handleEvent(e) // 阻止鼠标默认行为
  }

  const move = (e: PointerEvent) => {
    if (!filterEvent(e)) return
    if (!flag) return
    const dx = e.clientX - a
    const dy = e.clientY - b

    const _w = window.innerWidth - w - pos.value!
    const _h = window.innerHeight - h
    if (clicked.includes(movable)) {
      // 点击到可以移动的区域(标题栏)
      // style.left = p1.x + dx - 45 + "px"
      //  pos.value? Math.min(Math.max(0, p1.x + dx - pos.value), _w) :  Math.min(Math.max(0, p1.x + dx ), _w)
      style.left =
        (pos.value ? Math.min(Math.max(0, p1.x + dx - pos.value), _w) : Math.min(Math.max(0, p1.x + dx), _w)) + "px"
      // Math.min(Math.max(0, p1.y + dy ), _h)
      // style.top = p1.y + dy + "px"
      // style.top = Math.min(Math.max(45, p1.y + dy), _h) + "px"
      // ! 把 0 改为 45 可以限制向上移动时靠边
      style.top = Math.min(Math.max(0, p1.y + dy), _h) + "px"
      // 这里可以设置一下限位
    }
    if (clicked.includes(right)) {
      style.width = w + dx + "px"
    }
    if (clicked.includes(bottom)) {
      style.height = h + dy + "px"
    }
    if (clicked.includes(top)) {
      style.height = h - dy + "px"
      style.top = t + dy + "px"
    }
    if (clicked.includes(left)) {
      style.width = w - dx + "px"
      // style.left = l + dx - 45 + "px"
      style.left = pos.value ? l + dx - pos.value! + "px" : l + dx + "px"
    }
    options.onMove?.(p1, e)
    handleEvent(e)
  }
  const end = (e: PointerEvent) => {
    if (!filterEvent(e)) return
    flag = false

    options.onEnd?.(p1, e)
    handleEvent(e)
  }
  // 获取点击的元素
  if (isClient) {
    useEventListener(listener, "pointerdown", start, true)
    useEventListener(win, "pointermove", move, true)
    useEventListener(win, "pointerup", end, true)
  }
}
// export type UseDraggableReturn = ReturnType<typeof useAllDirectionResizeable>
