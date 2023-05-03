<script setup lang="ts">
import { ref, reactive } from "vue"
import { nanoid } from "nanoid"
import { IMenu } from "../helpers/side-types"

const props = withDefaults(
  defineProps<{
    items: IMenu[]
  }>(),
  {}
)

const preOrder = (root: IMenu[]) => {
  // 定义一个栈, 根节点入栈
  const stack: IMenu[] = [] // 空栈
  const result: IMenu[] = []

  const expanded = true
  const isActive = true

  for (let i = root.length - 1; i >= 0; i--) {
    const id = nanoid(4)
    const deep = 0
    const parentId = null
    // 将所有根节点入栈
    stack.push(reactive(Object.assign(root[i]!, { deep, id, parentId, expanded, isActive })))
  }
  while (stack.length > 0) {
    // 根节点出栈
    const node = stack.pop()!
    result.push(node)

    // !不需要保存结构并返回 rec.push(node)
    // 获取该节点的子节点
    if (node.children) {
      const child = node.children
      // 只遍历到第 1 层子菜单
      for (let i = child.length - 1; i >= 0; i--) {
        const childId = nanoid(4)
        // 子节点从右到左入栈
        stack.push(
          reactive(
            Object.assign(child[i]!, {
              id: childId,
              deep: node.deep! + 1,
              parentId: node.id,
              expanded,
              isActive,
              parentItem: node,
            })
          )
        )
      }
    }
  }
  return result
}

const treeData = preOrder(props.items)

const open = ref<boolean>(false)
const currentId = ref<string>()

const onToggleClick = (node: IMenu) => {
  currentId.value = node.id
  open.value = !open.value

  node.expanded = !node.expanded

  updateTree(node)
}
const updateTree = (node: IMenu) => {
  // 搜索当前节点, 如果当前
  // treeData.forEach((item: IMenu) => {
  //   if (item.parentId === node.id) {
  //     // :style="{ display: 'inline-block' }"
  //     if (item.id) {
  //       const el = document.getElementById(item.id)
  //       if (el) {
  //         console.log("当前点击的节点的下级节点---> ", item.title)
  //         el.className === "hidden" ? (el.className = "") : (el.className = "hidden")
  //       }
  //     }
  //   }
  // })
  const result: IMenu[] = []
  // 当前根节点入栈
  const stack = [node]
  while (stack.length > 0) {
    // 当前节点弹栈
    const currentNode = stack.pop()!
    result.push(currentNode)
    if (currentNode.children) {
      // 如果当前节点有子节点, 则子节点入栈
      const child = currentNode.children
      for (let i = child.length - 1; i >= 0; i--) {
        // 子节点入栈, 加入 rootId 属性, 表示当前点击的节点
        // 下面的所有节点的根就是当前节点
        stack.push(reactive(Object.assign(child[i]!, { rootId: node.expanded })))
      }
    }
  }
  console.log(result)
  return result
}

// console.log(treeData)
</script>
<template>
  <ul v-for="node in treeData" :key="node.id">
    <li v-if="node.header">{{ node.header }}</li>
    <!-- 0 级本身是链接 -->
    <li v-if="node.deep === 0 && node.href && !node.children">
      <router-link :to="node.href">
        <span> {{ node.title }} </span>
      </router-link>
    </li>
    <!-- 0 级本身是标题, 是有子菜单 -->
    <li v-if="node.children && node.deep === 0" @click="onToggleClick(node)">
      <span> {{ node.title }} -- {{ node.expanded }} --{{ node.id }} </span>
    </li>
    <!-- 下面是 1级及以下 -->
    <li
      v-if="node.parentItem?.expanded && node.rootId"
      :style="{ marginLeft: `${node.deep! * 20}px`}"
      @click="onToggleClick(node)"
    >
      <router-link v-if="node.href" :to="node.href!"> {{ node.title }} ---{{ node.rootId }}</router-link>
      <span v-if="!node.href"> {{ node.title }} ---{{ node.rootId }} </span>
    </li>
  </ul>
</template>

<style scoped>
/* @import url("scss/main.css"); */
.navigation-toggle {
  /* @mixin arrow; */

  position: relative;
  top: -3px;
  padding: 5px 5px 5px 3px;
  cursor: pointer;
  &__icon {
    display: inline-block;
    padding: 3px;
    border: solid #000000;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
  &__icon--closed {
    transform: rotate(-45deg);
  }
}
</style>
