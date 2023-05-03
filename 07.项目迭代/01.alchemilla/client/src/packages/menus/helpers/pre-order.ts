import { reactive } from "vue"
import { IMenu } from "./side-types"

export const preOrder = (root: IMenu[]) => {
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
      result.push(reactive({ ...node, deep }))
    } else {
      // ! 加入 折叠 展开的变量, 第1级默认就是 true 的, 就是展开的
      // ! 在 toggle 函数中, 也要加入是否第1级的判断, 如果是第1级, 也不要进行切换
      if (deep === 0) result.push(reactive({ ...node, deep, expanded: true }))
      else result.push(reactive({ ...node, deep, expanded: false }))
    }
    // 获取该节点的子节点
    if (node.children) {
      const child = node.children
      node.deep = deep + 1
      for (let i = child.length - 1; i >= 0; i--) {
        // 子节点从右到左入栈
        stack.push([child[i]!, deep + 1])
      }
    }
  }
  return result
}
