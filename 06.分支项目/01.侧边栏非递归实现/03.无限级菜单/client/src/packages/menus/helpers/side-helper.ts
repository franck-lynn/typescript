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
    // const parentId = null
    // 将所有根节点入栈
    stack.push(reactive(Object.assign(root[i]!, { deep, id, /* parentId, */ expanded })))
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
        const _obj = { id: childId, deep: node.deep! + 1, expanded }
        // 子节点从右到左入栈
        if (node.marginTop) {
          stack.push(reactive(Object.assign(child[i]!, _obj, { marginTop: node.marginTop + i * 2.5 })))
        } else {
          stack.push(reactive(Object.assign(child[i]!, _obj, { marginTop: (i - 1) * 2.5 })))
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
        if (node.expanded) {
          // true 时只切换下级
          if (node.deep! + 1 === child[i]!.deep)
            stack.push(reactive(Object.assign(child[i]!, { rootExpanded: node.expanded /* , parentId: node.id  */ })))
        } else {
          // false 时切换所有子级以及子级的子级
          stack.push(reactive(Object.assign(child[i]!, { rootExpanded: node.expanded /* , parentId: node.id  */ })))
        }
      }
    }
  }
  // 变量一下 treeData 下的所有节点, 这与 node 节点有所不同, 也包含了没有点击的节点
  // 没有点击的节点 expanded 要设置为 false, 使用 mouseLeave 设置也是可以的,
  // 可以使用一个 updateExpanded() 函数
}

export const updateRootIdToEmptyByTraversal = (node: IMenu) => {
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
    console.log(currentNode)
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

export const updateRootIdByTraversal = (child: IMenu[]) => {
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

export const handleClick = (node: IMenu, currentId: Ref<string>, treeData: IMenu[]) => {
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
        hasDisplay ? updateRootIdByTraversal(child) : child.forEach((item) => (item.rootId = node.rootId!))
      } else {
        node.children.forEach((item) => (item.rootId = node.rootId!))
      }
    } else {
      currentId.value = ""
      const rootNode = treeData.find((item) => item.id === node.rootId)
      rootNode && updateRootIdToEmptyByTraversal(rootNode)
    }
  }
}
