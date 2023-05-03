import { nanoid } from "nanoid"
import { IMenu, data } from "./data"
import util from "util"
const renderNode = (data: IMenu[]) => {
  // 建立一个空栈, 用于存放 IMenu 节点
  //                    id     level   parentId isVisible
  const stack: IMenu[] = [] // 空栈
  // 节点的层级
  const level = 1
  // 父节点
  const parentId = null
  const isVisible = true

  return data.reduce((acc: IMenu[], item: IMenu) => {
    const id = nanoid(4)
    // item 是节点里本来已有的属性, id, level, parentId, isVisible 是在这里加进去的属性
    // const node: IMenu =  [item, id, level, parentId, isVisible ]
    // 第1个根节点入栈
    // stack.push([item, id, level, parentId, isVisible])
    stack.push(Object.assign(item, { level, id, parentId, isVisible }))
    if (stack.length > 0) {
      // 根节点出栈
      const node = stack.pop()

      if (node) {
        // 保存到 acc
        acc.push(node)
        // 获取该节点的子节点
        if (node.children) {
          const child = node.children
          // node.level = level + 1
          if (child) {
            for (let i = child.length - 1; i >= 0; i--) {
              const childId = nanoid(4)
              // 子节点从右到左入栈
              stack.push(Object.assign(child, { id: childId, level: node.level! + 1, parentId: node.id, isVisible }))
            }
          }
        }
      }
    }
   
    return acc
  }, <IMenu[]>[])
}
// renderNode(data)
console.log(util.inspect(renderNode(data)))
// console.log(JSON.stringify(renderNode(data)))
