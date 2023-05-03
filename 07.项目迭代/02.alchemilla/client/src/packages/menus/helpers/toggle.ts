import { ref } from "vue"
import { IMenu } from "./side-types"

export const isShow = ref<boolean>(true)
// https://github.com/ivanvermeyen/vue-collapse-transition
// https://codepen.io/ivanvermeyen/pen/LaXJKa
// https://juejin.cn/post/6844903986823200776
export const currentId = ref<string>()

export const toggle = (node: IMenu) => {
  currentId.value = node.id

  if (node.children && node.children.length > 0) {
    // 有下级菜单才加切换折叠与展开, 没有的话就不需要
    node.expanded = !node.expanded
    // isShow.value = !isShow.value

    const queue: IMenu[] = []
    node.children.forEach((item) => {
      queue.push(item)
    })
    console.log("点击了node = ", currentId.value)
    while (queue.length > 0) {
      const child = queue.shift()
      if (child) {
        child.expanded = false
        if (child.children && child.children.length > 0) {
          child.children.forEach((item) => {
            queue.push(item)
          })
        }
      }
    }
  }
}
// export const styleUI = (node: IMenu) => {
//   if (node.deep === 0) {
//     return { display: "block" }
//   } else {
//     if (node.expanded) {
//       return { display: "block" }
//     } else {
//       return { display: "none" }
//     }
//   }
// }
