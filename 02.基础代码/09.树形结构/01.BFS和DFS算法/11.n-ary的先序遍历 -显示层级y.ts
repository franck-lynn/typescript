import { data, IMenu } from "./data"

const preOrder = (root: IMenu[]) => {
  // 保存结果的数组
  const rec: IMenu[] = []
  // 定义一个栈
  let stack: IMenu[] = []

  // 定义一个根节点
  stack.push({ children: root })
  // ! 记录层数
  let deep = 0
  const temp: string[] = [] // 保存每层的一个标题

  while (stack.length > 0) {
    // 根节点出栈
    const node = stack.pop()
    // 把根节点加入到结果
    if (node) {
      rec.push(node)
      // 获取该节点的子节点
      if (node.children) {
        const child = node.children
        if (child[0]) deep = deep + 1
        for (let i = 0; i < child.length; i++) {
          if (child[i] && child[i].title) temp.push(child[i]!.title!)
        }
        stack = stack.concat(child.reverse())
      }
    }
    console.log(`第 ${deep} 层---> `, temp)
  }

  return rec
}

preOrder(data)
