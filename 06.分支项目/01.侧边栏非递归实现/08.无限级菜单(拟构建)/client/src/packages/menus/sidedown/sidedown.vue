<script setup lang="ts">
import { ref } from "vue"
import { OnClickOutside } from "@vueuse/components"

import { isNarrow } from "../../commons"

import { IMenu } from "../types"
import { preOrder, handleClickInNarrow } from "./sidedown"

const props = withDefaults(
  defineProps<{
    items: IMenu[]
  }>(),
  {}
)

const currentId = ref<string>("")
const treeData = preOrder(props.items)

const onToggleClick = (node: IMenu) => {
  handleClickInNarrow(node, currentId, treeData)
}

function close() {
  currentId.value = ""
}
/**
 * 1. 0 级菜单总是显示的, 在刚开始循环时就进入了
 * 2. 1 级菜单的宽度设置为 w-48, 所以 marginLeft 中, node.deep 是从 1开始,
 *    减去1表示 1级菜单紧靠 0级. 乘 12 表示 左移 12个rem 与 w-48 设置一致
 *    所以, 这2个量可以用一个常量来代替
 * 3. 0 级菜单颜色在 这里设置
 *    v-if="node.children && node.deep === 0"
 *     class="flex w-full h-10 items-center cursor-default bg-purple-500"
 * 4. 所有菜单字体颜色在这里设置
 *  <ul v-for="node in treeData" :key="node.id" class="relative text-yellow-400 select-none">
 * 5. 0 级菜单有子菜单的添加了一个类名 level_0_has_child
 * 6. 1 级和 1级以下子菜单 添加了类名 .level_1n
 *    可以设置 背景色, 字体颜色等
 */
const _width = 12 // 单位 rem, 可以调整菜单的宽度
</script>
<template>
  <OnClickOutside @trigger="close">
    <ul v-for="node in treeData" :key="node.id" class="relative text-yellow-400 select-none">
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
        @click="onToggleClick(node)"
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
        v-if="node.deep !== 0 && currentId === node.rootId"
        class="flex h-10 items-center absolute left-full bottom-full px-4 level_1n"
        :class="[node.href ? 'cursor-pointer' : 'cursor-default']"
        :style="[{width: `${_width}rem`}, {marginLeft: `${(node.deep!-1) * _width}rem`, marginBottom: `${node.marginTop}rem` }  ]"
        @click="onToggleClick(node)"
      >
        <router-link v-if="node.href" :to="node.href!" class="cursor-pointer">
          <span v-if="node.icon" :class="[`iconfont ${node.icon}`]" class="inline-flex w-6 h-10 items-center" />
          <span>{{ node.title }}</span>
        </router-link>
        <span v-if="!node.href" class="cursor-default"> {{ node.title }} </span>
        <span v-if="node.children" :class="['arrow']" />
      </li>
    </ul>
  </OnClickOutside>
</template>
<style scoped>
.level_0_has_child {
  background-color: purple; /* 0 级菜单颜色 */
}
.level_1n {
  color: rgb(29 28 28); /* 1级及以下菜单窄状态下字体及背景色 */
  background-color: #eeeeee;
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
</style>
