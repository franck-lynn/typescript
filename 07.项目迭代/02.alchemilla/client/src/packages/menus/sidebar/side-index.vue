<script setup lang="ts">
import { reactive } from "vue"
import { nanoid } from "nanoid"

import { IMenu } from "../helpers/side-types"
import { sideupData } from "../../../stores/data"

const state = reactive({
  menuList: [] as IMenu[],
})

const renderNode = (data: IMenu[]) => {
  // 建立一个空栈, 用于存放 IMenu 节点
  //                    id     deep   parentId expanded
  const stack: IMenu[] = [] // 空栈
  // 节点的层级
  const deep = 1
  // 父节点
  const parentId = null
  const expanded = true
  const isActive = true

  return data.reduce((acc: IMenu[], item: IMenu) => {
    const id = nanoid(4)
    // item 是节点里本来已有的属性, id, deep, parentId, expanded 是在这里加进去的属性
    // const node: IMenu =  [item, id, deep, parentId, expanded ]
    // 第1个根节点入栈
    // stack.push([item, id, deep, parentId, expanded])
    stack.push(reactive(Object.assign(item, { deep, id, parentId, expanded, isActive })))
    if (stack.length > 0) {
      // 根节点出栈
      const node = stack.pop()

      if (node) {
        // 保存到 acc
        acc.push(node)
        // 获取该节点的子节点
        if (node.children) {
          const child = node.children
          // node.deep = deep + 1
          if (child) {
            for (let i = child.length - 1; i >= 0; i--) {
              const childId = nanoid(4)
              // 子节点从右到左入栈
              stack.push(
                reactive(
                  Object.assign(child, { id: childId, deep: node.deep! + 1, parentId: node.id, expanded, isActive })
                )
              )
            }
          }
        }
      }
    }

    return acc
  }, <IMenu[]>[])
}

const toggle = (node: IMenu) => {
  console.log("点击----> ", node)
  node.expanded = !node.expanded
  node.expanded = true
  // updateTree(node)
}

const updateTree = (node: IMenu) => {
  state.menuList.forEach((item) => {
    console.log("父id与子id 是否相等?-----> ", item.parentId, node.id)

    if (item.parentId === node.id) {
      item.expanded = node.expanded && item.parentId === node.id
      updateTree(item)
    }
  })
}

// 初始化
state.menuList = renderNode(sideupData)

const menuList = state.menuList
// console.log(menuList)
</script>
<template>
  <div class="menu">
    <ul>
      <li
        v-for="item in menuList"
        :key="item.id"
        :class="{ 'has-children': item.children && item.children.length, active: item.isActive }"
        :style="{ paddingLeft: item.deep! * 16 + 'px', display: item.expanded ? 'block' : 'none' }"
      >
        <a href="#" @click.prevent="toggle(item)">{{ item.title }} </a>
        <ul>
          <li
            v-for="child in item.children"
            :key="child.id"
            :class="{ 'has-children': child.children && child.children.length, active: child.isActive }"
            :style="{ paddingLeft: child.deep! * 16 + 'px', display: child.expanded ? 'block' : 'block' }"
          >
            <a href="#" @click.prevent="toggle(child)">{{ child.title }} --- {{ child.expanded }}</a>
            <ul>
              <li
                v-for="grandchild in child.children"
                :key="grandchild.id"
                :class="{ active: grandchild.isActive }"
                :style="{ paddingLeft: grandchild.deep! * 16 + 'px', display: grandchild.expanded ? 'block' : 'block' }"
              >
                <a href="#" @click.prevent="grandchild.clickHandler">{{ grandchild.title }}</a>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<style scoped>
/* 根据需要设置样式 */
</style>
