import { data, IMenu } from "./data"

const preOrder = (root: IMenu[]) => {
  // 保存结果的数组
  const rec: IMenu[] = []
  // 定义一个栈
  let stack: IMenu[] = []

  // 定义一个根节点
  stack.push({ children: root })

  while (stack.length > 0) {
    // 根节点出栈
    const node = stack.pop()
    // 把根节点加入到结果
    if (node) {
      rec.push(node)
      // 获取该节点的子节点
      if (node.children) {
        const child = node.children
        stack = stack.concat(child.reverse())
      }
    }
  }

  return rec
}
console.log(preOrder(data))
