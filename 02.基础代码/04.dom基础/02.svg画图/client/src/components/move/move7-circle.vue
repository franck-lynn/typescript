<script setup lang="ts">
import { ref, onMounted } from "vue"
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
const useMovable = (
  target: MaybeComputedRef<HTMLElement | SVGElement | null | undefined>,
  options: UseMovableOptions
) => {
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
  onMounted(() => {
    const rect = resolveUnref(target)!.getBoundingClientRect()
    // 小圆左上角坐标是相对于父组件的
    console.log(rect)
    console.log("矩形左上角坐标---> ", rect.left, rect.top, rect.right, rect.bottom, rect.width, rect.height) // [110, 70]
    // x = 100, y = 60, margin = 40 r = 40
    const css = getComputedStyle(resolveUnref(target)!.parentElement!)
    console.log(css.marginTop)
  })
  const start = (e: PointerEvent) => {
    if (!filterEvent(e)) return // 如果不是这3个鼠标行为就返回
    if (resolveUnref(options.exact) && e.target !== resolveUnref(target)) return
    // 虽然是圆, 但是获取的是长方形左上角的坐标值
    const rect = resolveUnref(target)!.getBoundingClientRect()
    const css = getComputedStyle(resolveUnref(target)!.parentElement!)
    console.log(css.marginLeft)
    const borderW = parseInt(css.marginLeft) !== 0 ? parseInt(css.borderWidth) : -parseInt(css.borderWidth)
    console.log(borderW)
    const pos = {
      // x: e.clientX - rect.left + borderW,
      // y: e.clientY - rect.top + borderW,
      x: e.clientX - rect.left - rect.width / 2 + borderW + parseInt(css.marginLeft),
      y: e.clientY - rect.top - rect.height / 2 + borderW + parseInt(css.marginLeft),
    }
    // console.log("01. 开始点击时工件位置坐标----> ", pos)
    if (options.onStart?.(pos, e) === false) return
    pressedDelta.value = pos // 鼠标按下的初始位置保存起来
    handleEvent(e) // 阻止鼠标默认行为
  }
  const move = (e: PointerEvent) => {
    if (!filterEvent(e)) return
    if (!pressedDelta.value) return
    position.value = {
      x: e.clientX - pressedDelta.value.x, // ! 加上圆半径, 鼠标点相当于定位到了矩形左上角的点
      y: e.clientY - pressedDelta.value.y,
    }
    options.onMove?.(position.value, e)
    handleEvent(e)
  }
  const end = (e: PointerEvent) => {
    if (!filterEvent(e)) return
    if (!pressedDelta.value) return
    console.log("结束后的值--> ", position.value)
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

const { x, y } = useMovable(el, {
  initialValue: { x: 100, y: 60 },
})

defineProps<{
  size: number
}>()
const radius = ref(40)
const strokeWidth = ref(28)
</script>
<template>
  <svg :width="`${size}px`" :height="`${size}px`">
    <g id="center-circle" ref="el">
      <circle :cx="`${x}px`" :cy="`${y}px`" :r="`${radius}px`" :style="`stroke-width: ${strokeWidth}px`"></circle>
    </g>
  </svg>
</template>

<style scoped>
svg {
  position: absolute;
  margin: 40px;
  border: 30px solid red;
}
#center-circle {
  position: absolute;
  stroke: greenyellow;
  fill: white;
}
</style>
