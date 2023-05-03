<script setup lang="ts">
import { ref } from "vue"

import { isNarrow } from "../../../stores/states"

import { IMenu } from "../helpers/side-types"
import { /* calcMarginTop, */ preOrder, updateTree, updateCurrentId } from "../helpers/side-helper"

const props = withDefaults(
  defineProps<{
    items: IMenu[]
  }>(),
  {}
)

const currentId = ref<string>()

const treeData = preOrder(props.items)

const onToggleClick = (node: IMenu, isNarrow: boolean) => {
  node.expanded = !node.expanded
  updateTree(node) // 宽状态调用此函数

  if (isNarrow) {
    // calcMarginTop(node)
    if (node.deep === 0) {
      currentId.value = node.id // 点击时先把 id 赋值给当前 id,
      // 并把 后代有孩子的都赋值当前id, 用 updateCurrentId
      updateCurrentId(node, currentId)
    } else {
      // 不是 0 级菜单点击, 就要先判断, 有没有 孩子节点 属性,
      // 有孩子节点点击
      if (node.children) {
        currentId.value = node.rootId
      } else {
        // 链接点击
        currentId.value = node.id
      }
    }
  }
}
</script>
<template>
  <ul
    v-for="node in treeData"
    :key="node.id"
    class="text-yellow-400 select-none"
    :class="[isNarrow ? 'relative' : 'truncate']"
  >
    <li
      v-if="node.header"
      class="flex w-full px-2 h-8 items-center text-white font-bold cursor-default"
      :class="[{ hidden: isNarrow }]"
    >
      <span>{{ node.header }}</span>
    </li>
    <!-- 0 级菜单无子菜单 -->
    <li v-if="node.deep === 0 && node.href && !node.children" class="flex w-full h-10 items-center cursor-pointer">
      <span
        :class="[`iconfont ${node.icon}`, { 'justify-center': isNarrow }]"
        class="flex w-12 h-10 items-center p-2"
      />
      <router-link
        v-if="node.href"
        :to="node.href"
        class="cursor-pointerss"
        :class="[{ 'px-2': !node.icon, hidden: isNarrow }]"
      >
        <span v-if="node.title"> {{ node.title }} </span>
      </router-link>
    </li>
    <!-- 0 级菜单有子菜单, 0 级菜单不管有没有点击, 总是显示出来, 主要是判断1级及以下菜单的显示情况 -->
    <li
      v-if="node.children && node.deep === 0"
      class="flex w-full h-10 items-center cursor-default bg-purple-500 level_0_has_children"
      @click="onToggleClick(node, isNarrow)"
    >
      <span
        v-if="node.icon"
        :class="[`iconfont ${node.icon}`, { 'justify-center': isNarrow }]"
        class="flex w-12 h-10 items-center p-2"
      />
      <span v-if="node.title" :class="[{ 'px-2': !node.icon, hidden: isNarrow }]"> {{ node.title }} </span>
      <span
        :class="['arrow', { 'arrow-after': node.children && node.deep === 0 && node.expanded, hidden: isNarrow }]"
      />
    </li>

    <li
      v-if="isNarrow ? currentId === node.rootId && node.rootExpanded : node.rootExpanded"
      class="flex w-48 h-10 items-center is-narrow_level"
      :class="[
        node.href ? 'cursor-pointer' : 'cursor-default',
        isNarrow ? 'absolute flex left-full px-4  bg-purple-900 ' : '',
      ]"
      :style="[ isNarrow? 
          {marginLeft: `${(node.deep!-1) * 12}rem`, marginTop: `${node.marginTop}rem` } 
          :{ paddingLeft: `${node.deep! * 0.75}rem`} ]"
      @click="onToggleClick(node, isNarrow)"
    >
      <span v-if="node.icon" :class="[`iconfont ${node.icon}`]" class="flex w-6 h-10 items-center" />
      <router-link v-if="node.href" :to="node.href!" class="cursor-pointer"> {{ node.title }} </router-link>
      <span v-if="!node.href" class="cursor-default"> {{ node.title }} </span>
      <span
        v-if="node.children"
        :class="['arrow', { 'arrow-after': !isNarrow && node.rootExpanded && node.expanded }]"
      />
    </li>
  </ul>
</template>

<style scoped>
.arrow {
  --height-sub-nav: 40px;
  --little-triangle-width: 6px;
  --color-tabs-btn: #ffffff; /* 图标悬停或者是当前状态时的字体颜色 */

  position: absolute;
  right: 0.8rem;
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
