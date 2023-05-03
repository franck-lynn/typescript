<script setup lang="ts">
import { computed } from "vue"

import { isNarrow, position as x } from "@/stores/states"
import { toggleNode } from "../helpers/toggleNode"
/* 菜单数据 */
import { sideupData } from "@/stores/data/sideup-data"

/* 处理菜单数据 */
import { transformItems, bst } from "../helpers/use-bst"

const treeData = computed(() => transformItems(sideupData))
const flattenedNodes = computed(() => bst(treeData.value))

/**
 * 使用了 Vue 的模板语法来渲染树形菜单
 * 在 v-for 中遍历 treeData 数组中的每个节点, 并将节点的 label 属性渲染到页面上
 * 当节点被点击时，调用 toggleNode 方法来展开或折叠节点,并通过 v-if 判断节点是否展开
 * 第1个 ul 是父节点 表示整个的菜单, 第2个ul, 在 li 下面 是子菜单,
 * 第1个 ul 下的 li 是菜单块 里的项目, 一条一条的. 同理, 第2个 ul 下的 li 也是菜单项
 * 目.
 */

/**
 * 使用了 Vue 的模板语法来渲染树形菜单
 * 在 v-for 中遍历 treeData 数组中的每个节点, 并将节点的 label 属性渲染到页面上
 * 当节点被点击时，调用 toggleNode 方法来展开或折叠节点,并通过 v-if 判断节点是否展开
 * 第1个 ul 是父节点 表示整个的菜单, 第2个ul, 在 li 下面 是子菜单,
 * 第1个 ul 下的 li 是菜单块 里的项目, 一条一条的. 同理, 第2个 ul 下的 li 也是菜单项
 * 目.
 */
</script>
<template>
  <div class="text-white">
    <ul v-for="(nodes, index) in flattenedNodes" :key="index">
      <div v-if="index === 0">
        <li v-for="(item, idx) in nodes" :key="idx">
          {{ item.title }}
        </li>
      </div>
      <!-- <div v-else>
        <li v-for="(item, idx) in nodes" :key="idx">
          {{ item.title }}
        </li>
      </div> -->
    </ul>
  </div>

  <div>
    <!-- <ul class="w-full" :class="[isNarrow ? '' : 'static flex flex-col']" :style="`width: ${x}px`">
      <li v-for="node in flattenedNodes" :key="node.id">
        <div class="flex items-center text-white">
          <span
            v-if="node.header && !isNarrow"
            class="flex w-full h-14 items-center px-2 font-bold overflow-clip cursor-default"
          >
            {{ node.header }}
          </span>
          <span
            v-if="node.icon"
            :class="['iconfont ', `${node.icon}`]"
            class="flex-none w-5 h-5 mx-2 flex justify-center text-2xl items-center"
          />
          <component
            :is="node.href ? 'router-link' : 'span'"
            v-if="!isNarrow"
            :to="node.href"
            class="flex flex-grow h-16 truncate overflow-hidden items-center text-1xl px-1 border-cyan-500 cursor-pointer"
          >
            {{ node.title }}
          </component>
          <span v-if="node.children && !isNarrow" />
        </div>

        <ul v-if="!node.expanded">
          <li v-for="child in node.children" :key="child.id">
            <div :class="[isNarrow ? 'absolute  left-full ' : 'static w-full']" class="flex items-center text-white">
              <span
                v-if="child.header"
                class="flex w-full h-14 items-center px-4 font-bold overflow-clip cursor-default"
              >
                {{ child.header }}
              </span>
              <span
                v-if="child.icon"
                :class="['iconfont ', `${child.icon}`]"
                class="flex-none w-5 h-5 mx-4 flex justify-center text-2xl items-center"
              >
              </span>
              <component
                :is="child.href ? 'router-link' : 'span'"
                :to="child.href"
                class="flex flex-grow h-16 truncate overflow-hidden items-center text-base px-1 border-cyan-500 cursor-pointer"
              >
                {{ child.title }}
              </component>
              <span v-if="child.children" />
            </div>
          </li>
        </ul>
      </li>
    </ul> -->
  </div>
</template>

<style scoped></style>
