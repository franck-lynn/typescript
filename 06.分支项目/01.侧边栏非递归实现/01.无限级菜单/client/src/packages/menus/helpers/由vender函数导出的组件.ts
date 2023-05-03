import { h, defineComponent } from "vue"
import "tailwindcss/tailwind.css"

import { sideupData as root } from "../../../stores/data/sideup-data/sideup-data"
import { isNarrow, position as x } from "../../../stores/states"

import { IMenu } from "../helpers/side-types"
import { toggle } from "../helpers/toggle"

import { vLi } from "../helpers/vnode"

export default defineComponent({
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
        result.push({ ...node })
      } else {
        // ! 加入 折叠 展开的变量, 第1级默认就是 true 的, 就是展开的
        // ! 在 toggle 函数中, 也要加入是否第1级的判断, 如果是第1级, 也不要进行切换
        if (deep === 0) result.push({ ...node, deep, expanded: true })
        else result.push({ ...node, deep, expanded: false })
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

    const children = result.map((node) => {
      console.log("node--->", node.deep, node.title, node.expanded)
      if (node.header) {
        // ! 这里有宽窄 2 种状态
        if (isNarrow.value)
          return h("h1", { class: "menu-header hidden", style: { marginLeft: `${node.deep! * 2}em` } }, node.header)
        else
          return h(
            "span",
            {
              class: "flex w-full h-14 items-center px-2 font-bold text-white overflow-clip cursor-default",
              style: { marginLeft: `${node.deep! * 2}em` },
            },
            node.header
          )
      } else {
        // ! 这里有宽窄 2 种状态, 折叠与展开 2 种状态
        if (isNarrow.value)
          return h(
            "p",
            {
              "v-if": node.expanded,
              class: "menu-item",
              style: { marginLeft: `${node.deep! * 2}em` }, //
              onClick: () => toggle(node),
            },
            node.title
          )
        if (node.expanded) {
          /*  */
        }

        return [
          vLi(node),
          // h(
          //   "p",
          //   {
          //     "v-if": node.expanded,
          //     class: "menu-item",
          //     style: { marginLeft: `${node.deep! * 2}em` }, //
          //     onClick: () => toggle(node),
          //   },
          //   node.title
          // ),
        ]
      }
    })
    // 将 children 渲染到一个总的根节点
    return h("div", { class: "text-white" }, children)
  },
})

/*
 const children = result.map((node) => {
      console.log("node--->", node.deep, node.title, node.expanded)
      if (node.header) {
        return h("h1", { class: "menu-header", style: { marginLeft: `${node.deep! * 2}em` } }, node.header)
      } else {
        if (node.deep! <= 1) {
          return h(
            "p",
            {
              class: "menu-item",
              style: { marginLeft: `${node.deep! * 2}em` }, //
              onClick: () => toggle(node),
            },
            node.title
          )
        } else {
          return h(
            "p",
            {
              class: "menu-item",
              style: { marginLeft: `${node.deep! * 2}em` },
            },
            [
              node.title,
              node.expanded &&
                node.children &&
                h(
                  "div",
                  { class: "submenu" },
                  node.children.map((subnode) => h("p", {}, subnode.title))
                ),
            ]
          )
        }
      }
    })
*/
