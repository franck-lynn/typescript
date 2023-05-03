<script setup lang="ts">
import { ref } from "vue"
import { OnClickOutside } from "@vueuse/components"

import { isNarrow } from "../../commons"

import { IMenu } from "../types"

import { preOrder, updateTree, handleClickInNarrow } from "./sideup"

const props = withDefaults(
  defineProps<{
    items: IMenu[]
    hasScroll?: boolean
  }>(),
  { hasScroll: false }
)

const currentId = ref<string>("")
const treeData = preOrder(props.items)

const onToggleClick = (node: IMenu, isNarrow: boolean) => {
  if (isNarrow) {
    handleClickInNarrow(node, currentId, treeData)
  } else {
    node.expanded = !node.expanded
    updateTree(node)
  }
}

function close() {
  currentId.value = ""
}
/**
 * 1. 0 级菜单总是显示的, 在刚开始循环时就进入了
 * 2. 1 级菜单的宽度设置为 w-48, 所以 marginLeft 中, node.deep 是从 1开始,
 *    减去1表示 1级菜单紧靠 0级. 乘 12 表示 左移 12个rem 与 w-48 设置一致
 *    所以, 这2个量可以用一个常量来代替
 * 3. paddinfLeft node.deep * 0.5 表示在宽状态下, 每层级有一个 0.5 rem右
 *    偏移量
 * 4. 0 级菜单颜色在 这里设置
 *    v-if="node.children && node.deep === 0"
 *     class="flex w-full h-10 items-center cursor-default bg-purple-500"
 * 5. 所有菜单字体颜色在这里设置
 *   <ul v-for="node in treeData" :key="node.id" class="text-yellow-400 select-none" :class="[{ relative: isNarrow }]">
 * 5. 0 级菜单有子菜单的添加了一个类名 level_0_has_child
 * 6. 1 级和 1级以下子菜单窄状态添加了类名 is-narrow_level_1n, 宽状态类名 is_broad_level_1n,
 *    可以设置 背景色, 字体颜色等
 */
const _width = 12 // 单位 rem, 可以调整菜单的宽度
const _paddingLeft = 0.5 //  单位 rem
</script>
<template>
  <div :class="[{ 'overflow-y-auto scrollbar-w-2': hasScroll }, 'flex-1 flex flex-col relative ']">
    <OnClickOutside @trigger="close">
      <ul v-for="node in treeData" :key="node.id" class="text-yellow-400 select-none" :class="[{ relative: isNarrow }]">
        <li
          v-if="node.header"
          class="flex w-full px-2 h-8 items-center text-white font-bold cursor-default"
          :class="[{ hidden: isNarrow }]"
        >
          <span>{{ node.header }}</span>
        </li>

        <li
          v-if="node.deep === 0 && node.href && !node.children"
          class="flex w-full h-10 items-center cursor-pointer"
          :class="{ hidden: isNarrow && !node.icon }"
        >
          <router-link v-if="node.href" :to="node.href" class="cursor-pointerss">
            <span
              v-if="node.icon"
              :class="[`iconfont ${node.icon}`, { 'justify-center': isNarrow }]"
              class="inline-flex w-10 h-10 items-center pl-2"
            />
            <span v-if="node.title" :class="[{ 'px-2': !node.icon, hidden: isNarrow }]">
              {{ node.title }}
            </span>
          </router-link>
        </li>

        <li
          v-if="node.children && node.deep === 0"
          class="flex w-full h-10 items-center cursor-default level_0_has_child"
          @click="onToggleClick(node, isNarrow)"
        >
          <span
            v-if="node.icon"
            :class="[`iconfont ${node.icon}`, { 'justify-center': isNarrow }]"
            class="flex w-10 h-10 items-center pl-2"
          />
          <span v-if="node.title" :class="['truncate', { 'pl-2': !node.icon, hidden: isNarrow }]">
            {{ node.title }}
          </span>
          <span
            :class="['arrow', { 'arrow-after': node.children && node.deep === 0 && node.expanded, hidden: isNarrow }]"
          />
        </li>

        <li
          v-if="isNarrow && node.deep !== 0 ? currentId === node.rootId : node.rootExpanded"
          class="flex h-10 items-center"
          :class="[
            node.href ? 'cursor-pointer' : 'cursor-default',
            isNarrow ? 'absolute flex left-full px-4   is-narrow_level_1n' : 'is_broad_level_1n',
          ]"
          :style="[{width: `${_width}rem`},  isNarrow? 
          {marginLeft: `${(node.deep!-1) * _width}rem`, marginTop: `${node.marginTop}rem` } 
          :{ paddingLeft: `${node.deep! * _paddingLeft}rem`} ]"
          @click="onToggleClick(node, isNarrow)"
        >
          <router-link v-if="node.href" :to="node.href!" class="cursor-pointer">
            <span v-if="node.icon" :class="[`iconfont ${node.icon}`]" class="inline-flex w-6 h-10 items-center" />
            <span>{{ node.title }}</span>
          </router-link>
          <span v-if="!node.href" class="cursor-default"> {{ node.title }} </span>
          <span
            v-if="node.children"
            :class="['arrow', { 'arrow-after': !isNarrow && node.rootExpanded && node.expanded }]"
          />
        </li>
      </ul>
    </OnClickOutside>
  </div>
</template>

<style scoped>
.level_0_has_child {
  background-color: purple; /* 0 级菜单颜色 */
}
.is-narrow_level_1n {
  color: rgb(29 28 28); /* 1级及以下菜单窄状态下字体及背景色 */
  background-color: #eeeeee;
}
.is_broad_level_1n {
  /* 1级及以下菜单宽状态下字体颜色 */
  color: yellow;
}
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
.overflow-y-auto {
  /* 禁止水平方向滚动条 */
  overflow-x: hidden;

  /* 显示垂直方向滚动条 */
  overflow-y: auto;
}

/* 针对Chrome浏览器的滚动条样式 */
::-webkit-scrollbar {
  width: 4px;
}

/* 针对Chrome浏览器的滚动条轨道样式 */
::-webkit-scrollbar-track {
  border-radius: 2px; /* 圆形 */
  background-color: #353f4f;
}

/* 针对Chrome浏览器的滚动条滑块样式 */
::-webkit-scrollbar-thumb {
  border-radius: 2px; /* 圆形 */
  background-color: #718096;
}

/* 去掉上下箭头 */
::-webkit-scrollbar-button {
  display: none;
}
</style>
