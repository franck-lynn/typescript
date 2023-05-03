import { h } from "vue"
import { IMenu } from "./side-types"


export const vLi = (node: IMenu) => {
  //
  return h("li", [
    h("span", { class: `iconfont ${node.icon}` }),
    node.href
      ? h(
          "a",
          {
            href: node.href,
            class:
              "flex flex-grow h-16 truncate overflow-hidden items-center text-1xl px-1 border-cyan-500 cursor-pointer",
          },
          node.title
        )
      : h(
          "span",
          {
            class:
              "flex flex-grow h-16 truncate overflow-hidden items-center text-1xl px-1 border-cyan-500 cursor-pointer",
          },
          node.title
        ),
    h("span", {}),
  ])
}
