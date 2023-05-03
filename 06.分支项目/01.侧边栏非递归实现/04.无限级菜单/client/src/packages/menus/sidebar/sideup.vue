<script setup lang="ts">
import { ref, reactive } from "vue"

// import { isNarrow } from "../../../stores/states"

import { IMenu } from "../helpers/side-types"
import {
  preOrder,
  // updateTree,
  // updateCurrentId,
  // updateExpanded,
  // setExpandedTrue,
  // setExpandedFalse,
  // setCurrentIdTrue,
  // setCurrentIdFalse,
  updateRootIdToEmpty,
} from "../helpers/side-helper"

const props = withDefaults(
  defineProps<{
    items: IMenu[]
  }>(),
  {}
)
const isNarrow = true
const currentId = ref<string>("")
const treeData = preOrder(props.items)

const isActive = ref<boolean>()
const onToggleClick = (node: IMenu, isNarrow: boolean) => {
  isNarrow
  if (node.deep === 0) {
    node.rootId = node.id
  }

  if (node.deep === 0) {
    if (currentId.value && currentId.value === node.rootId) {
      currentId.value = ""
    } else {
      currentId.value = node.rootId!
      if (node.children) {
        node.children.forEach((item) => {
          item.rootId = currentId.value
        })
      }
    }
  } else {
    if (node.children) {
      // 这里和 0 级一样, 也要进行切换
      if (currentId.value && currentId.value === node.rootId) {
        // 如果点击的是当前节点,
        // 当前节点  currentId.value === node.rootId  表示当前节点
        const child = node.children // 当前节点的孩子节点
        const hasDisplay = child.some((item) => item.rootId === currentId.value)
        isActive.value = !isActive.value
        if (hasDisplay) {
          // 当前节点的孩子节点是显示的, 就把当前节点入栈
          const stack: IMenu[] = [...child]
          // 当前节点入的栈, 所以要看孩子
          while (stack.length > 0) {
            const currentNode = stack.pop()!
            reactive(Object.assign(currentNode, { rootId: "xxx" }))
            const ch = currentNode.children
            if (ch) {
              // 这是有孩子节点的情况, 先把这个节点设置为 ''
              for (let i = ch.length - 1; i >= 0; i--) {
                stack.push(reactive(Object.assign(ch[i]!, { rootId: "xxx" })))
              }
            }
          }
        } else {
          child.forEach((item) => {
            item.rootId = node.rootId
          })
        }
      } else {
        // 要改 rootId
        node.children.forEach((item) => {
          item.rootId = node.rootId
        })
      }
    } else {
      currentId.value = ""

      // 根据rootId找到对应的根节点
      const rootNode = treeData.find((item) => item.id === node.rootId)
      if (rootNode) {
        updateRootIdToEmpty(rootNode)
      }
    }
  }
  // console.log(node)
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
      <router-link v-if="node.href" :to="node.href" class="cursor-pointerss">
        <span
          :class="[`iconfont ${node.icon}`, { 'justify-center': isNarrow }]"
          class="flex w-12 h-10 items-center p-2"
        />
        <span v-if="node.title" :class="[{ 'px-2': !node.icon, hidden: isNarrow }]"> {{ node.title }} </span>
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
      v-if="isNarrow && node.deep !== 0 ? currentId === node.rootId : node.rootExpanded"
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
