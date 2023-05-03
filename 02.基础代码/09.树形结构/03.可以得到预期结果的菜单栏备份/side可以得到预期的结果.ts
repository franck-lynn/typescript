import { h } from "vue"

import { sideupData as root } from "../../../stores/data/sideup-data"
import { IMenu } from "../helpers/side-types"

/* 
const preOrder = (root: IMenu[]) => {
  // !  保存结果的数组, 不需要保存结构并返回 const rec: IMenu[] = []
  // 定义一个栈, 根节点入栈
  const stack: [IMenu, number][] = [] // 空栈
  for (let i = root.length - 1; i >= 0; i--) {
    // 将所有根节点入栈
    stack.push([root[i]!, 0])
  }
  while (stack.length > 0) {
    // 根节点出栈
    const [node, deep] = stack.pop()!
    // ! 在这个位置生成虚拟 DOM
    if (node.header) {
      console.log(`${" ".repeat(deep * 2)}${node.header}`) // 输出节点并加上层级
      vnode = h("h1", `${" ".repeat(deep * 2)}${node.header}`)
    } else {
      console.log(`${" ".repeat(deep * 2)}${node.title}`) // 输出节点并加上层级
      vnode = h("h1", `${" ".repeat(deep * 2)}${node.title}`)
    }

    // 把根节点加入到结果
    if (node) {
      // !不需要保存结构并返回 rec.push(node)
      // 获取该节点的子节点
      if (node.children) {
        const child = node.children
        node.deep = deep + 1
        if (child) {
          for (let i = child.length - 1; i >= 0; i--) {
            // 子节点从右到左入栈
            stack.push([node.children[i]!, deep + 1])
          }
        }
      }
    }
  }

  // !不需要保存结构并返回 return rec
}
*/
export default {
  render() {
    // 定义一个栈, 根节点入栈
    const stack: [IMenu, number][] = [] // 空栈
    const result: IMenu[] = []

    for (let i = root.length - 1; i >= 0; i--) {
      // 将所有根节点入栈
      stack.push([root[i]!, 0])
    }
    while (stack.length > 0) {
      // 根节点出栈
      const [node, deep] = stack.pop()!
      if (node.header) {
        // console.log(`${" ".repeat(deep * 2)}${node.header}`) // 输出节点并加上层级
        result.push({ ...node })
      } else {
        // console.log(`${" ".repeat(deep * 2)}${node.title}`) // 输出节点并加上层级
        result.push({ ...node, deep })
      }
      // result.push(node)

      // !不需要保存结构并返回 rec.push(node)
      // 获取该节点的子节点
      if (node.children) {
        const child = node.children
        node.deep = deep + 1
        // 只遍历到第 1 层子菜单
        for (let i = child.length - 1; i >= 0; i--) {
          // 子节点从右到左入栈
          stack.push([child[i]!, deep + 1])
          // result.push(child[i]!)
        }
      }
    }

    const children = result.map((node) => {
      if (node.header) {
        return h("h1", { class: "menu-header", style: { marginLeft: `${node.deep! * 2}em` } }, node.header)
      } else {
        return h("p", { class: "menu-item", style: { marginLeft: `${node.deep! * 2}em` } }, node.title)
      }
    })
    return h("div", { class: "menu-list" }, children)
  },
}
