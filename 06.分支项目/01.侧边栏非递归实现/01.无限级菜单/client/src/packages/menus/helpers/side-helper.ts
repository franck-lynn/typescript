import { reactive } from "vue"
import { nanoid } from "nanoid"
import { IMenu } from "./side-types"

// 在对树状数组进行遍历时, 加上一些额外的信息, 以便加强控制
export const preOrder = (root: IMenu[]) => {
  // 定义一个栈, 根节点入栈
  const stack: IMenu[] = [] // 空栈
  const result: IMenu[] = []

  const expanded = false // 默认设置成 false, 不然, 初始时会有2次点击

  for (let i = root.length - 1; i >= 0; i--) {
    const id = nanoid(4)
    const deep = 0
    const parentId = null
    // 将所有根节点入栈
    stack.push(reactive(Object.assign(root[i]!, { deep, id, parentId, expanded })))
  }
  while (stack.length > 0) {
    // 根节点出栈
    const node = stack.pop()!
    result.push(node)

    // 获取该节点的子节点
    if (node.children) {
      const child = node.children
      // 只遍历到第 1 层子菜单
      for (let i = child.length - 1; i >= 0; i--) {
        const childId = nanoid(4)
        // 子节点从右到左入栈
        if (node.marginTop) {
          stack.push(
            reactive(
              Object.assign(child[i]!, {
                id: childId,
                deep: node.deep! + 1,
                expanded,
                marginTop: node.marginTop + i * 2.5,
              })
            )
          )
        } else {
          stack.push(
            reactive(
              Object.assign(child[i]!, {
                id: childId,
                deep: node.deep! + 1,
                expanded,
                marginTop: (i - 1) * 2.5,
              })
            )
          )
        }
      }
    }
  }
  return result
}

// 点击时触发, 对树状数组进行更新操作
export const updateTree = (node: IMenu) => {
  // const result: IMenu[] = []
  // 当前根节点入栈
  const stack = [node]
  while (stack.length > 0) {
    // 当前节点弹栈, 弹栈的过程中改变了响应式的数据
    const currentNode = stack.pop()!

    if (currentNode.children) {
      // 如果当前节点有子节点, 则子节点入栈
      const child = currentNode.children
      for (let i = child.length - 1; i >= 0; i--) {
        // 子节点入栈, 加入 rootExpanded 属性, 表示当前点击的节点
        // 下面的所有节点的根就是当前节点,
        // 当前点击节点下面所有节点的父节点
        // TODO: if 语句对宽状态较好, 但是窄状态有问题
        // TODO: node.expanded 要分 true 和 false 两种不同的情况进行处理
        if (node.deep! + 1 === child[i]!.deep)
          stack.push(reactive(Object.assign(child[i]!, { rootExpanded: node.expanded, parentId: node.id })))
      }
    }
  }
}

export const updateCurrentId = (node: IMenu, currentId: Ref<string | undefined>) => {
  const stack: IMenu[] = [reactive(Object.assign(node, { rootId: currentId.value }))]
  while (stack.length > 0) {
    const currentNode = stack.pop()!
    const child = currentNode.children
    if (child) {
      for (let i = child.length - 1; i >= 0; i--) {
        stack.push(reactive(Object.assign(child[i]!, { rootId: node.rootId })))
      }
    }
  }
}

// 点击时触发, 对树状数组进行更新操作
// export const calcMarginTop = (node: IMenu) => {
//   // 第1级的菜单不用处理, 由 css 接管
//   // 当前根节点入栈
//   const stack: IMenu[] = [node]
//   while (stack.length > 0) {
//     const currentNode = stack.pop()!
//     // 检查当前点击的节点的孩子节点, 为所有孩子节点设置 marginTop
//     if (currentNode.children) {
//       const child = currentNode.children
//       for (let i = child.length - 1; i >= 0; i--) {
//         // 父节点的 marginTop
//         if (node.marginTop) stack.push(reactive(Object.assign(child[i]!, { marginTop: node.marginTop + i * 2.5 })))
//         else stack.push(reactive(Object.assign(child[i]!, { marginTop: (i - 1) * 2.5 })))
//       }
//     }
//   }
// }
