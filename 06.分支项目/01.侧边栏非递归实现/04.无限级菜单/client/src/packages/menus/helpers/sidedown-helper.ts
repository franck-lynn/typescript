import { nanoid } from "nanoid"
import { IMenu } from "./side-types"

export const traverseTree = (
  root: IMenu[],
  deep = 0,
  parent: IMenu | null = null,
  list: IMenu[] = []
): IMenu[] | null => {
  if (!root || !root.length) return null
  for (const node of root) {
    if (!node || typeof node !== "object") continue

    const id = nanoid(4)
    const newNode = Object.assign(node, { id, deep, rootId: deep === 0 ? id : parent!.rootId })

    parent = newNode
    list.push(newNode)

    if (newNode.children) {
      traverseTree(newNode.children, deep + 1, parent)
    }
  }
  return list
}
