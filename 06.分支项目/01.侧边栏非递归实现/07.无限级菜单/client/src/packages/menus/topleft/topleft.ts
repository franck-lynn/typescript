import { reactive } from "vue"
import { nanoid } from "nanoid"

import { IMenu } from "../types"

const ICON_WIDTH = 3 // 图标大小2.5 rem + 内边距 0.5rem

// 0 级菜单的宽度按照各自字符多少来决定

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

    // 计算 0 级菜单的宽度, 加 3rem 是图标的宽度
    const rootWidth = rootNode.icon ? getStrWidth(rootNode.title!, 16) + ICON_WIDTH : getStrWidth(rootNode.title!, 16)

    // 将所有根节点入栈
    stack.push(reactive(Object.assign(root[i]!, { deep, id, expanded, rootWidth })))
  }

  while (stack.length > 0) {
    const node = stack.pop()!
    result.push(node)
    // 获取该节点的子节点
    if (node.children) {
      const child = node.children

      for (let i = child.length - 1; i >= 0; i--) {
        const childId = nanoid(4)

        const _obj = { id: childId, deep: node.deep! + 1, expanded, rootWidth: node.rootWidth }

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

/**
 * 根据字符数计算字符串宽度，返回宽度（rem）
 * @param str 要计算的字符串
 * @param fontSize 页面根元素字号（px）
 * @returns 字符串宽度（rem）
 */
function getStrWidth(str: string, fontSize: number): number {
  // 创建临时 canvas 标签
  const canvas: HTMLCanvasElement = document.createElement("canvas")
  const ctx = canvas.getContext("2d")!
  ctx.font = `${fontSize}px sans-serif`
  const pixelWidth = ctx.measureText(str).width
  const fontSizePx = parseFloat(getComputedStyle(document.documentElement).fontSize)
  const widthMultiple = pixelWidth / fontSizePx // 计算实际宽度值相对于字号大小的倍数
  const remWidth = widthMultiple * 1.0 // 1rem 的像素大小为字号大小
  return remWidth
}
