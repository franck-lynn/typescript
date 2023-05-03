<script setup lang="ts">
import { ref } from "vue"
import { onClickOutside } from "@vueuse/core"

import { IMenu } from "../helpers/side-types"

import {} from "../helpers/topleft-helper"

defineProps<{
  items: IMenu[]
}>()

const emits = defineEmits<{
  (e: "click", node: IMenu): void
}>()

const target = ref<HTMLElement | null>(null)

const currentId = ref<string>()
// 处理菜单项的点击事件
function handleClick(node: IMenu) {
  if (node.deep === 0) {
    currentId.value = currentId.value === node.rootId ? "" : node.rootId
    return
  }
  if (node.children) {
    console.log("currentId----> ", currentId.value)
    currentId.value = currentId.value === node.rootId ? "" : node.rootId
    return
  }
  // 点击链接时关闭整个菜单
  if (!node.children) {
    currentId.value = ""
  }
  emits("click", node)
}

onClickOutside(target, () => {
  currentId.value = ""
})
</script>

<template>
  <ul ref="target" class="text-yellow-400 select-none flex">
    <li v-for="node in items" :key="node.id" :class="[node.deep === 0 ? 'relative' : 'relative w-64']">
      <component
        :is="node.children || !node.href ? 'span' : 'router-link'"
        :to="node.href"
        class="h-10 bg-purple-500 flex items-center px-4"
        :class="[node.deep === 0 ? ' px-4' : 'w-full']"
        @click="handleClick(node)"
      >
        <span
          v-if="node.icon"
          :class="[`iconfont ${node.icon}`]"
          class="flex w-10 h-10 items-center pl-2 flex-grow-0"
        />
        <span v-if="node.title" :class="[{ 'px-2': !node.icon }]"> {{ node.title }} </span>
        <span v-if="node.children && node.deep !== 0" :class="['arrow']" />
      </component>
      <!-- <top-left-item
        v-if="node.children && node.rootId === currentId"
        :items="node.children"
        class="absolute flex flex-col"
        :class="[{ 'left-full top-0': node.deep !== 0 }]"
        @click="handleClick(node)"
      /> -->
    </li>
  </ul>
</template>

<style scoped>
.arrow {
  --height-sub-nav: 40px;
  --little-triangle-width: 6px;
  --color-tabs-btn: #ffffff; /* 图标悬停或者是当前状态时的字体颜色 */

  position: absolute;
  right: 0.4rem; /* 到右边的距离 */
  width: 0;
  height: 0;
  font-size: 0;
  border-style: dashed dashed solid;
  border-width: var(--little-triangle-width);
  border-color: transparent transparent transparent var(--color-tabs-btn);
  transform: translateX(1px);
  content: ""; /* 下拉菜单的向上小三角符号 */
  line-height: 0;
}
.arrow-after {
  transform: rotate(90deg) translateY(2px);
}
</style>
