import { sideupData } from "./sideup-data/sideup-data"
import { transformItem } from "./helpers/transformItem"

export { sideupData }
export const sideupMenuData = transformItem(sideupData)
