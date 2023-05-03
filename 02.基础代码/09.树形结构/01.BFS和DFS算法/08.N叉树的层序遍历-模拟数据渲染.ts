import { data, IMenu } from "./data"
const bst = (root: IMenu[]) => {
  const quene: IMenu[] = [] // 一个队列, 用于遍历, 所有遍历的节点在这里排队
  // ! 保存遍历后的结果, 这个结果用于返回
  const result: string[] = []

  // 只需要把根节点加入队列就可以, 根节点本身带有子节点
  for (let k = 0; k < root.length; k++) {
    quene.push(root[k])
  }

  while (quene.length > 0) {
    // 当前节点出列
    const node = quene.shift()

    let menuItemElement = ""
    // 看看当前节点有没有孩子节点
    let child: IMenu[] = []

    if (node) {
      // ! 这里可以对出列的数组进行模拟渲染
      menuItemElement = `${node.title}---> `
      console.log(menuItemElement)
      if (node.children) child = node.children
    }

    if (child) {
      for (let i = 0; i < child.length; i++) {
        quene.push(child[i])
        menuItemElement = `     ${child[i].title} >`
        console.log(menuItemElement)
      }
    }

    result.push(menuItemElement)
  }
  // ! 返回 result
  // return result
  // console.log(result)
}
bst(data)
