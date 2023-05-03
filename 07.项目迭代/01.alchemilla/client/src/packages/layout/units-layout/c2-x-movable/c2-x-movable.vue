<script setup lang="ts">
import { ref, onMounted, watchEffect } from "vue"
import { IS_NARROW, LEFT_SIDE_WIDTH, MIN_WIDTH, useXMovable } from "./useXMovable"
import { resizableIsNarrow, resizableLeftSideWidth, useWindowResizable, resizeFlag } from "./useResizable"

const el = ref<HTMLElement | null>(null)
const { position: x, isNarrow } = useXMovable(el) // 函数内部有个最小宽度默认值, 也可以不用设置

onMounted(() => {
  const _leftSideWidth = localStorage.getItem(LEFT_SIDE_WIDTH)
  x.value = _leftSideWidth ? parseInt(_leftSideWidth) : MIN_WIDTH
  const _isNarrow = localStorage.getItem(IS_NARROW)
  isNarrow.value = _isNarrow ? JSON.parse(_isNarrow) : false
})

/* 监听 resize */
useWindowResizable()
watchEffect(() => {
  if (resizableLeftSideWidth.value) x.value = resizableLeftSideWidth.value
  if (resizableIsNarrow.value) isNarrow.value = resizableIsNarrow.value
})
// [resizeFlag ? `transition: width 0.6s ease-in-out` : ``]
</script>
<template>
  <div class="scalable">
    <div
      :style="[`width: ${x}px;`, resizeFlag ? `transition: width 0.6s ease-in-out; ` : '']"
      :class="['c2-resizeable-left', { 'is-narrow': isNarrow }]"
    >
      <div :class="['sidebar-left']">
        <slot name="c2-resizeable-left" :is-narrow="isNarrow"> </slot>
      </div>
      <div
        ref="el"
        class="separator"
        :style="[`left: ${x}px; width: 2px`, resizeFlag ? `transition: left 0.6s ease-in-out;` : '']"
      >
        <i></i>
      </div>
    </div>

    <div class="c2-resizeable-right" :style="`width:calc(100% - ${x}px);`">
      <slot name="c2-resizeable-right"> </slot>
    </div>
  </div>
</template>

<style scoped>
.scalable {
  --min-width-sidebar: 45px;
  --width-separator: 2px; /* 拖拉分割线的宽度 */
  --color-sidebar-background: #353f4f;
  --width-separator-when-zero: 18px;

  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden; /* 溢出的文字隐藏起来 */
  text-overflow: ellipsis; /* 溢出的文字使用圆点显示 */
  white-space: nowrap; /* 段落中的文本不换行, 强制性的在一行显示所有的文本，直到文本结束或者, 遭遇br标签对象才换行 */
}
.c2-resizeable-left {
  position: relative;
  z-index: 15;
  display: flex;
  justify-content: flex-start;
  height: 100%;
  background-color: var(--color-sidebar-background);

  /* transition: width 0.6s ease-in-out; */
}
.sidebar-left {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
}
.separator {
  position: absolute;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--width-separator);
  height: 100%;
  border: transparent;
  cursor: col-resize;
  background-color: transparent;

  /* transition: left 0.6s ease-in-out; */
}
i {
  z-index: -2;
  display: inline-block;
  margin: 0 0.4px;
  width: 1px;
  height: 14px;
  border-left: 0.5px solid #e9e9e9;
  background-color: #e9e9e9;
}
.c2-resizeable-right {
  position: relative;
  display: flex;
  height: 100%;
  flex-direction: column;
}
</style>
