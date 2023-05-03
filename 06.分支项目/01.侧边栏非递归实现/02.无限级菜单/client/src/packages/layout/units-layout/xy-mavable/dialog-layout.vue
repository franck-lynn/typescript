<script setup lang="ts">
import { ref } from "vue"

import { useAllDirectionResizeable } from "./useAllDirectionResizeable"

const el = ref()

useAllDirectionResizeable(el)
</script>
<template>
  <div ref="el" class="dialog-container">
    <span class="edge edge-corner top-left"></span>
    <span class="edge horizontal top"></span>
    <span class="edge edge-corner top-right"></span>
    <span class="edge vertical left"></span>

    <div class="main-content">
      <div class="content-header">
        <slot name="content-header"> <span>标题栏</span> </slot>
      </div>
      <div class="content-body"><slot name="content-body"> </slot></div>
      <div class="content-footer"><slot name="content-footer"></slot></div>
    </div>

    <span class="edge vertical right"></span>
    <span class="edge edge-corner bottom-left"></span>
    <span class="edge horizontal bottom"></span>
    <span class="edge edge-corner bottom-right"></span>
  </div>
</template>

<style scoped>
/* 定义了变量 要引入 main.css, 因为这个变量引入了 variable.css */
@import url("scss/main.css");
.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: var(--width-padding-left);
  height: var(--height-content-header);
  background-color: #eeeeee;
}
.content-body {
  height: calc(100% - var(--height-content-header) - var(--height-content-footer));
}
.content-footer {
  display: flex;
  height: var(--height-content-header);
  background-color: #f3f3f3;
}
.dialog-container {
  position: absolute;
  display: flex; /* 最外层不设置边框, 在 内容区域的 div 设置边框即可 */
  width: 600px; /* 初始时设置的值 */
  min-width: 120px;
  height: 400px;
  min-height: 40px;
  border: 1px solid #eeeeee;
  border-radius: var(--border-raidus);
  background-color: #ffffff;
  box-shadow: 10px 10px 15px rgb(0 0 0 / 20%);
  & .main-content {
    display: flex; /* 内容区域设置边框, */
    user-select: none;
    width: 100%;
    flex-direction: column;
  }

  /*  ==================边缘布局开始=========================== */
  & .edge {
    position: absolute;
    background-color: transparent;
    cursor: row-resize;
    &.vertical {
      top: var(--width-corner);
      width: var(--edge);
      height: calc(100% - 2 * var(--width-corner));
      cursor: col-resize;
      &.right {
        right: 0;
      }
    }
    &.horizontal {
      left: var(--width-corner);
      width: calc(100% - 2 * var(--width-corner));
      height: var(--edge);
      &.bottom {
        bottom: 0;
      }
    }
    &.edge-corner {
      z-index: 201;
      width: var(--width-corner);
      height: var(--width-corner);

      /* 这个实际使用时采用与上层边缘一样的透明, 注释掉即可 */

      /* background-color: blue; */
      cursor: se-resize;

      /*  &.top-left 的定位方式和鼠标指针是默认即可 */
      &.top-right {
        cursor: sw-resize;
        top: 0;
        right: 0;
      }
      &.bottom-left {
        cursor: sw-resize;
        bottom: 0;
        left: 0;
      }
      &.bottom-right {
        right: 0;
        bottom: 0;
      }
    }
  }
}
</style>
