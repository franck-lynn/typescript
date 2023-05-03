import { data, IMenu } from "./data"
const bst = (root: IMenu[]) => {
  const quene: IMenu[] = [] // 一个队列, 用于遍历, 所有遍历的节点在这里排队
  // ! 保存遍历后的结果, 这个结果用于返回
  const result: IMenu[][] = []

  for (let k = 0; k < root.length; k++) {
    quene.push(root[k])
  }

  let deep = 0 // ! 记录层数

  while (quene.length > 0) {
    // 对当前队列内容进行遍历
    const size = quene.length

    const temp: IMenu[] = [] // ! 将每层出列的节点暂时放在这个数组

    for (let i = 0; i < size; i++) {
      // 当前节点出列
      const node = quene.shift()
      // 看看当前节点有没有孩子节点
      let child: IMenu[] = []
      if (node) {
        if (node.children) child = node.children
        // 把每层出列的节点装起来
        temp.push(node)
      }

      if (child) {
        for (let i = 0; i < child.length; i++) {
          quene.push(child[i])
        }
      }
      // 在每层开始时 加一层
      if (i === 0) deep = deep + 1
    }
    // for 外层循环结束, 可以打印下这个 temp
    console.log("第" + deep + "层 ---> ", temp)
    // ! 把每层的数据 temp 放进 result 数组里, 数组的序号就是层级
    result.push(temp)
  }
  // ! 返回 result
  return result
}
bst(data)
// console.log(bst(data))
