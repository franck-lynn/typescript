<script setup lang="ts">
import { ref /* ,onMounted  */ } from "vue"
import type { MaybeComputedRef } from "@vueuse/shared"
import { isClient, resolveUnref, toRefs } from "@vueuse/shared"
import { useEventListener } from "@vueuse/core"

const defaultWindow = /* #__PURE__ */ isClient ? window : undefined

const el = ref<HTMLElement | null>()

type Position = { x: number; y: number }
type PointerType = "mouse" | "touch" | "pen"

type UseMovableOptions = {
  exact?: MaybeComputedRef<boolean>
  preventDefault?: MaybeComputedRef<boolean>

  draggingElement?: MaybeComputedRef<HTMLElement | SVGElement | Window | Document | null | undefined>
  handle?: MaybeComputedRef<HTMLElement | SVGElement | null | undefined>
  pointerTypes?: PointerType[]
  stopPropagation?: MaybeComputedRef<boolean>
  initialValue?: MaybeComputedRef<Position>
  onStart?: (position: Position, event: PointerEvent) => void | false
  onMove?: (position: Position, event: PointerEvent) => void
  onEnd?: (position: Position, event: PointerEvent) => void
}
const useMove = (target: MaybeComputedRef<HTMLElement | SVGElement | null | undefined>, options: UseMovableOptions) => {
  const movableElement = options.draggingElement ?? defaultWindow // window 下调用监听
  const draggingHandle = options.handle ?? target // 要移动的元素
  const position = ref<Position>(resolveUnref(options.initialValue) ?? { x: 0, y: 0 }) // 初始位置
  const pressedDelta = ref<Position>() // 移动的偏移量

  const filterEvent = (e: PointerEvent) => {
    if (options.pointerTypes) return options.pointerTypes.includes(e.pointerType as PointerType)
    return true // 过滤鼠标事件
  }
  const handleEvent = (e: PointerEvent) => {
    if (resolveUnref(options.preventDefault)) e.preventDefault() // 阻止鼠标的默认行为
    if (resolveUnref(options.stopPropagation)) e.stopPropagation()
  }
  const start = (e: PointerEvent) => {
    if (!filterEvent(e)) return // 如果不是这3个鼠标行为就返回
    if (resolveUnref(options.exact) && e.target !== resolveUnref(target)) return
    // 虽然是圆, 但是获取的是长方形左上角的坐标值
    const rect = resolveUnref(target)!.getBoundingClientRect()
    const pos = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
    // console.log("01. 开始点击时工件位置坐标----> ", pos)
    if (options.onStart?.(pos, e) === false) return
    pressedDelta.value = pos // 鼠标按下的初始位置保存起来
    handleEvent(e) // 阻止鼠标默认行为
  }
  const move = (e: PointerEvent) => {
    if (!filterEvent(e)) return
    if (!pressedDelta.value) return
    // 窗口总高度 - 小方块高度 = 上方留白的总高度
    // const rect = resolveUnref(target)!.getBoundingClientRect()
    const _h = window.innerHeight - (resolveUnref(target)! as HTMLElement).offsetHeight
    const _w = window.innerWidth - (resolveUnref(target)! as HTMLElement).offsetWidth

    let div_left = e.clientX - pressedDelta.value.x
    let div_top = e.clientY - pressedDelta.value.y
    div_left = Math.min(Math.max(0, div_left), _w)
    div_top = Math.min(Math.max(0, div_top), _h)

    position.value = {
      // x: e.clientX - pressedDelta.value.x, // ! 加上圆半径, 鼠标点相当于定位到了矩形左上角的点
      // y: e.clientY - pressedDelta.value.y,
      // x: Math.min(Math.max(0, div_top), _h), // ! 加上圆半径, 鼠标点相当于定位到了矩形左上角的点
      // y: Math.min(Math.max(0, div_left), _w),
      x: div_left,
      y: div_top,
    }
    console.log("比较这2个值:", Math.min(Math.max(0, div_left), _w) === e.clientX - pressedDelta.value.x)
    options.onMove?.(position.value, e)
    handleEvent(e)
  }
  const end = (e: PointerEvent) => {
    if (!filterEvent(e)) return
    if (!pressedDelta.value) return
    pressedDelta.value = undefined
    options.onEnd?.(position.value, e)
    handleEvent(e)
  }
  if (isClient) {
    useEventListener(draggingHandle, "pointerdown", start, true)
    useEventListener(movableElement, "pointermove", move, true)
    useEventListener(movableElement, "pointerup", end, true)
  }

  return {
    ...toRefs(position),
  }
}
const { x, y } = useMove(el, {
  initialValue: { x: 500, y: 300 },
})
</script>
<template>
  <div ref="el" :style="`left: ${x}px; top: ${y}px`"></div>
</template>

<style scoped>
div {
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 15px;
  background-color: red;
  box-shadow: 10px 10px 15px rgb(0 0 0 / 70%);
}
</style>
