import { reactive } from "vue"
import { nanoid } from "nanoid"
import { IMenu } from "./side-types"

export const traverseTree = (
  root: IMenu[],
  deep = 0,
  prev: IMenu | null = null,
  list: IMenu[] = []
): IMenu[] | null => {
  if (!root || !root.length) return null

  let value: IMenu | null = null

  for (const node of root) {
    if (!node || typeof node !== "object") continue

    const id = nanoid(4)

    const newNode = reactive(
      Object.assign(node, {
        id,
        deep,
        rootId: deep === 0 ? id : prev!.rootId,
        // parentId: deep === 0 ? null : prev ? prev.id : null,
        parentId: deep === 0 ? null : prev && prev.id,
      })
    )

    value = newNode // ! 这是父节点, 先用 value 保存起来, 然后传给下一级

    list.push(newNode)

    if (newNode.children) {
      prev = value
      traverseTree(newNode.children, deep + 1, prev)
    }
  }
  return list
}

