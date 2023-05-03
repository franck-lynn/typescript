import { nanoid } from "nanoid"

import { IMenu } from "../../../packages/menus/helpers/side-types"

// 给数据加上一个 id 号
export function transformItem(items: IMenu[]): IMenu[] {
  return items.map((item) => {
    return <IMenu>{ id: nanoid(4), ...item, ...(item.children && { children: <IMenu>transformItem(item.children) }) }
  })
}
