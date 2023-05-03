import { reactive } from "vue"
import { nanoid } from "nanoid"

import { IMenu } from "../types"

// export type IMenuTop = { width?: number; parentWidth?: number } & IMenu

// 假设英文字符宽度为 1rem, 汉字为 2rem
const _fontwidth = 1 // 单位 rem
const lineHeight = 2.5 // 单位 rem, 菜单的行高, 所有菜单设置相同的行高, topleft.vue 也用到这个值
const iconWidth = 2 // 单位 rem
const padding = 0.5 // 单位  rem
// 0 级菜单的宽度按照各自字符多少来决定
// 1级及以下菜单按照同级字数最多的决定
// level_0_width = (字数 * _fontwidth) + iconWidth + 2 * padding

// 在对树状数组进行遍历时, 加上一些额外的信息, 以便加强控制
export const preOrder = (root: IMenu[]) => {
  // 定义一个栈, 根节点入栈
  const stack: IMenu[] = [] // 空栈
  const result: IMenu[] = []

  const expanded = false // 默认设置成 false, 不然, 初始时会有2次点击
  const { length } = root
  for (let i = length - 1; i >= 0; i--) {
    const rootNode = root[i]!
    const id = nanoid(4)
    const deep = 0

    // 计算 0 级菜单的宽度
    const parentWidth = rootNode.icon
      ? strLen(rootNode.title!) * _fontwidth + iconWidth + 2 * padding
      : strLen(rootNode.title!) * _fontwidth + 2 * padding

    // 将所有根节点入栈
    stack.push(reactive(Object.assign(root[i]!, { deep, id, expanded, parentWidth })))
  }

  while (stack.length > 0) {
    const node = stack.pop()!

    // ! 出栈的顺序是按照层级的, 根节点出栈后, 第1层入栈,所以在这个位置可以找到第几层的最大字符数,
    // ! 这里取到的是上层节点宽度, 本层节点宽度要在 for 循环里做
    // let maxNum = 0
    // let parentWidth = 0
    // if (node.deep === 1) {
    //   parentWidth = node.parentWidth!
    //   reactive(Object.assign(node, { parentWidth }))
    // } else {
    //   const titleNum = strLen(node.title!)
    //   if (titleNum > maxNum) {
    //     maxNum = titleNum
    //   }
    //   // ! 计算 parentWidth 值
    //   parentWidth = node.icon ? maxNum * _fontwidth + iconWidth + 2 * padding : maxNum * _fontwidth + 2 * padding
    // }
    // console.log(`第 ${node.deep} 节点的父节点宽度---> ${parentWidth}`)

    result.push(node)
    // 获取该节点的子节点
    if (node.children) {
      const child = node.children

      // let maxNum = 0
      // for (let i = child.length - 1; i >= 0; i--) {
      //   const _t = (child[i] && child[i]!.title) || ""
      //   const titleNum = strLen(_t)
      //   maxNum = titleNum > maxNum ? titleNum : maxNum
      // }
      // const width = node.icon ? maxNum * _fontwidth + iconWidth + 2 * padding : maxNum * _fontwidth + 2 * padding
      // console.log(`第 ${node.deep} 层最大宽度 ${node.title} --- ${width} --${width}`)

      for (let i = child.length - 1; i >= 0; i--) {
        const childId = nanoid(4)
        // 0 级节点出栈后把 这个 parentWidth 塞进 1级节点, 其他节点不用设置父节点宽度, 只有 1 级节点需要左移
        // const _obj = { id: childId, deep: node.deep! + 1, expanded, parentWidth: node.parentWidth, width }
        const _obj = { id: childId, deep: node.deep! + 1, expanded, parentWidth: node.parentWidth }

        if (node.marginTop) {
          stack.push(reactive(Object.assign(child[i]!, _obj, { marginTop: node.marginTop + i * 2.5 })))
        } else {
          stack.push(reactive(Object.assign(child[i]!, _obj, { marginTop: i * 2.5 })))
        }
      }
    }
  }

  return result
}

const _updateRootIdToEmptyByTraversal = (node: IMenu) => {
  const nodeChild = node.children
  const stack: IMenu[] = []
  if (nodeChild) {
    for (let i = nodeChild.length - 1; i >= 0; i--) {
      stack.push(nodeChild[i]!)
    }
  }
  while (stack.length > 0) {
    const currentNode = stack.pop()!
    // 把弹栈的数据的 rootId 都设置为 ''
    reactive(Object.assign(currentNode, { rootId: "xxxxx" }))
    // console.log(currentNode)
    if (currentNode.children) {
      const child = currentNode.children
      if (child) {
        for (let i = child.length - 1; i >= 0; i--) {
          stack.push(reactive(Object.assign(child[i]!, { rootId: "xxxxx" })))
        }
      }
    }
  }
}

const _updateRootIdByTraversal = (child: IMenu[]) => {
  const stack: IMenu[] = [...child]
  // 当前节点入的栈, 所以要看孩子
  while (stack.length > 0) {
    const currentNode = stack.pop()!
    reactive(Object.assign(currentNode, { rootId: "xxx" }))
    const ch = currentNode.children
    if (ch) {
      // 这是有孩子节点的情况, 先把这个节点设置为 ''
      for (let i = ch.length - 1; i >= 0; i--) {
        stack.push(reactive(Object.assign(ch[i]!, { rootId: "xxxx" })))
      }
    }
  }
}

export const handleClickInNarrow = (node: IMenu, currentId: Ref<string>, treeData: IMenu[]) => {
  if (node.deep === 0) {
    node.rootId = node.id
    if (currentId.value && currentId.value === node.rootId) {
      currentId.value = ""
    } else {
      currentId.value = node.rootId!
      if (node.children) {
        node.children.forEach((item) => {
          item.rootId = currentId.value!
        })
      }
    }
  } else {
    if (node.children) {
      if (currentId.value && currentId.value === node.rootId) {
        const child = node.children
        const hasDisplay = child.some((item) => item.rootId === currentId.value!)
        hasDisplay ? _updateRootIdByTraversal(child) : child.forEach((item) => (item.rootId = node.rootId!))
      } else {
        node.children.forEach((item) => (item.rootId = node.rootId!))
      }
    } else {
      currentId.value = ""
      const rootNode = treeData.find((item) => item.id === node.rootId)
      rootNode && _updateRootIdToEmptyByTraversal(rootNode)
    }
  }
}

// F:\working\study\typescript\typescript\02.基础代码\08.代码片段\06.printer打印\commons\strLen.ts
// 得到一个字符串码点的真实长度
export function strLen(s: string): number {
  let length = 0
  for (let i = 0; i < s.length; i++) {
    if (s.charCodeAt(i) > 127) {
      length += 2
    } else {
      length += 1
    }
  }
  return length
}
