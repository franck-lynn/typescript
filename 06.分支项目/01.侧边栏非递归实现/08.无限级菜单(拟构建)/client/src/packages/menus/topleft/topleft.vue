<script setup lang="ts">
import { ref } from "vue"
import { OnClickOutside } from "@vueuse/components"

import { IMenu } from "../types"
import { preOrder, handleClickInNarrow } from "./topleft"

const props = defineProps<{ items: IMenu[] }>()

const currentId = ref<string>("")
const treeData = preOrder(props.items)

const onToggleClick = (node: IMenu) => {
  handleClickInNarrow(node, currentId, treeData)
}

function close() {
  currentId.value = ""
}
/**
 * 1. 设置 level_0_has_child 0级菜单的宽度为 12 rem(w-48), 那么,
 *    在 level_1n 中, {marginLeft: `${(node.deep! -1  ) * 12  -12}rem`
 *    这里 -12 就是 0级菜单的宽度, 实现 0级菜单与 1级菜单对齐
 *   {marginLeft: `${(node.deep! -1  ) * 12  这里的12 是1级及其子级的宽度,
 *    是为了实现 1级后面的子菜单向右展开是的 margunLeft,  可以设置为一个常量
 */

const _width_level_1n = 12
</script>
<template>
  <OnClickOutside class="flex" @trigger="close">
    <ul v-for="node in treeData" :key="node.id" class="relative flex text-yellow-400 select-none">
      <li v-if="node.deep === 0 && node.href && !node.children" class="flex w-full h-10 items-center cursor-pointer">
        <router-link v-if="node.href" :to="node.href" class="cursor-pointerss">
          <span v-if="node.icon" :class="[`iconfont ${node.icon}`]" class="inline-flex w-8 h-10 items-center pl-2" />
          <span v-if="node.title" class="px-2"> {{ node.title }} </span>
        </router-link>
      </li>

      <li
        v-if="node.children && node.deep === 0"
        class="flex h-10 items-center cursor-default w-auto mx-2 level_0_has_child"
        @click="onToggleClick(node)"
      >
        <span v-if="node.icon" :class="[`iconfont ${node.icon}`]" class="flex w-8 h-10 items-center pl-2" />
        <span v-if="node.title" class="truncate" :class="[{ 'pl-2': !node.icon }]"> {{ node.title }} </span>
      </li>

      <li
        v-if="node.deep !== 0 && currentId === node.rootId"
        class="flex h-10 items-center absolute top-full px-4 bg-purple-900 level_1n"
        :class="[node.href ? 'cursor-pointer' : 'cursor-default']"
        :style="[{width: `${_width_level_1n}rem`, 
           marginLeft: `${(node.deep! -1  ) * _width_level_1n  - node.rootWidth!}rem`, 
           marginTop: `${node.marginTop}rem` }  ]"
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
  color: black; /* 0 级菜单的字体颜色 */
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
</style>
