import { data, IMenu } from "./data"

const preOrder = (root: IMenu[]) => {
  // 保存结果的数组
  const rec: IMenu[] = []
  // 定义一个栈, 根节点入栈
  // const stack: [IMenu, number][] = [[root[0], 0]] // 根节点入栈

  const stack: [IMenu, number][] = [] // 空栈
  for (let i = root.length - 1; i >= 0; i--) {
    // 将所有根节点入栈
    stack.push([root[i], 0])
  }

  while (stack.length > 0) {
    // 根节点出栈
    const [node, deep] = stack.pop()!
    console.log(`${" ".repeat(deep * 2)}${node.title}`) // 输出节点并加上层级
    // 把根节点加入到结果
    if (node) {
      rec.push(node)
      // 获取该节点的子节点
      if (node.children) {
        const child = node.children
        node.deep = deep + 1
        if (child) {
          for (let i = child.length - 1; i >= 0; i--) {
            // 子节点从右到左入栈
            stack.push([node.children[i], deep + 1])
          }
        }
        // console.log(node)
      }
    }
  }

  return rec
}

// preOrder(data)
console.log(preOrder(data))
