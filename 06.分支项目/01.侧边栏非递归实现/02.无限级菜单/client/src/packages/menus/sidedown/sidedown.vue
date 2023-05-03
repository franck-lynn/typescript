<script setup lang="ts">
import { ref } from "vue"
import { OnClickOutside } from "@vueuse/components"

import { isNarrow } from "../../../stores/states"

import { IMenu } from "../helpers/side-types"
import { preOrder, handleClickInNarrow } from "./sidedown-helper"

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
  currentId.value = "x"
}
</script>
<template>
  <OnClickOutside @trigger="close">
    <ul v-for="node in treeData" :key="node.id" class="relative text-yellow-400 select-none">
      <!-- 0 级菜单无子菜单, 就是链接, 不用做任何处理 -->
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

      <!-- 0 级菜单有子菜单, 0 级菜单不管有没有点击, 总是显示出来, 主要是判断1级及以下菜单的显示情况 -->
      <li
        v-if="node.children && node.deep === 0"
        class="flex w-full h-10 items-center cursor-default bg-purple-500 level_0_has_children"
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
        class="flex w-48 h-10 items-center absolute left-full bottom-full px-4 bg-purple-900"
        :class="[node.href ? 'cursor-pointer' : 'cursor-default']"
        :style="[{marginLeft: `${(node.deep!-1) * 12}rem`, marginBottom: `${node.marginTop}rem` }  ]"
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
