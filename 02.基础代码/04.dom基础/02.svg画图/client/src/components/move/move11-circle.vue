<script setup lang="ts">
import { ref } from "vue"
import type { MaybeComputedRef } from "@vueuse/shared"
import { isClient, resolveUnref, toRefs } from "@vueuse/shared"
import { useEventListener, defaultWindow, Position, PointerType } from "@vueuse/core"

// const moved = (p1: Position, dx: number, dy: number) => ({
//   x: p1.x + dx,
//   y: p1.y + dy,
// })

type UseMoveOptions = {
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
const useMove = (target: MaybeComputedRef<HTMLElement | SVGElement | null | undefined>, options: UseMoveOptions) => {
  const movableElement = options.draggingElement ?? defaultWindow // window 下调用监听
  const draggingHandle = options.handle ?? target // 要移动的元素

  // 要返回的点的坐标, 用于保存移动的点 p1 的坐标的, 与下面 p1 不同的是,
  // p1 是开始移动前的位置, position 是移动后的位置
  const position = ref<Position>(resolveUnref(options.initialValue) ?? { x: 0, y: 0 })

  const filterEvent = (e: PointerEvent) => {
    if (options.pointerTypes) return options.pointerTypes.includes(e.pointerType as PointerType)
    return true // 过滤鼠标事件
  }
  const handleEvent = (e: PointerEvent) => {
    if (resolveUnref(options.preventDefault)) e.preventDefault() // 阻止鼠标的默认行为
    if (resolveUnref(options.stopPropagation)) e.stopPropagation()
  }
  // 下面不用响应式变量的原因是对象数据引用的问题
  let a = 0
  let b = 0
  let p1: Position = { x: 0, y: 0 }
  let flag = false

  let h = 0
  let w = 0
  const start = (e: PointerEvent) => {
    if (!filterEvent(e)) return // 如果不是这3个鼠标行为就返回
    if (resolveUnref(options.exact) && e.target !== resolveUnref(target)) return
    flag = true
    // 这里 resolveUnref(target) 是存在的
    // 虽然是圆, 但是获取的是长方形左上角的坐标值
    const { left, top, width, height } = resolveUnref(target)!.getBoundingClientRect()
    // 设置要平移的点, 由于定位点是圆心, 所以要平移的点也是圆心, 这2个要一样的操作才方便
    a = e.clientX
    b = e.clientY
    // 这里要是 svg 圆的话, p1 要移动的点的坐标根据圆的定位进行计算
    p1 = { x: left, y: top }
    w = width
    h = height
    handleEvent(e) // 阻止鼠标默认行为
  }

  const move = (e: PointerEvent) => {
    if (!filterEvent(e)) return
    if (!flag) return
    const dx = e.clientX - a
    const dy = e.clientY - b
    // 窗口总高度 - 小方块高度 = 上方留白的总高度
    const _w = window.innerWidth - w
    const _h = window.innerHeight - h

    // x: p1.x + dx,
    // y: p1.y + dy,
    // position.value = moved(p1, dx, dy)
    position.value = {
      // x: p1.x + dx, // Math.min(Math.max(0, p1.x + dx), _w)
      // y: p1.y + dy, // Math.min(Math.max(0, p1.y + dy), _h)
      // 设置限位
      x: Math.min(Math.max(0, p1.x + dx), _w),
      y: Math.min(Math.max(0, p1.y + dy), _h),
    }

    // console.log("y的值---> ", position.value.y)
    options.onMove?.(p1, e)
    handleEvent(e)
  }

  const end = (e: PointerEvent) => {
    if (!filterEvent(e)) return
    flag = false
    options.onEnd?.(p1, e)
    handleEvent(e)
  }

  if (isClient) {
    useEventListener(draggingHandle, "pointerdown", start, true)
    useEventListener(movableElement, "pointermove", move, true)
    useEventListener(movableElement, "pointerup", end, true)
  }
  return { ...toRefs(position) }
}

const el = ref()
const { x, y } = useMove(el, { initialValue: { x: 100, y: 100 } })
</script>
<template>
  <div class="box1">
    <div ref="el" :style="`left: ${x}px; top: ${y}px`" class="move"></div>
  </div>
</template>

<style scoped>
.box1 {
  /* margin: 80px; */
  width: 600px;
  height: 600px;
  border: 5px solid greenyellow;
}
.move {
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 15px;
  background-color: red;
  box-shadow: 10px 10px 15px rgb(0 0 0 / 70%);
}
</style>
