import { IMenu, IRouterPaths } from "../"
import { isExcludeFolders, parentPath, toObjectArray } from "../../utils"
import { splitByNumber } from "./assistant"

const EXCLUDE_FOLDERS = ["about", "footer", "home", "menu", "login", "register", "test"]
//! 06. 不分组, 直接使用于顶部菜单
export const calcPaths2Dropdown = (
    paths: [string, string?, string?][],
    icon = "icon-all-fill",
    cName = "菜单",
    whichRoute = "home"
): any => {
    // 先过滤下不用的路径
    const p: [string, string?, string?][] = paths.filter((item: [string, string?, string?]) => {
        if (!isExcludeFolders(item[0], EXCLUDE_FOLDERS)) {
            return item
        }
    })

    const pp: [string, string?, string?][] = p.map((it: [string, string?, string?]) => {
        it[0] = parentPath(it[0])
        return it
    })

    // const N =  quitient(pp)// 数组的长度除以2, 得到分组的个数
    const splitLinks = splitByNumber(pp)
    /*
    分割后的数组--->  
    [
      [
        [ 'profile/avatar/tab-msg' ],
        [ 'vuer-ui/avatar/vuer-avatar.vue' ]
      ],
      [ [ 'vuer-ui/dialog/vuer-dialog.vue' ] ]
    ]
    */

    
    return splitLinks.reduce((accu:IMenu[], prev: [string, string?, string?][] , index: number) => {
        // 把数组转化一下中文
        const pv: [string, string?, string?][] = prev.map((item) => {
            // return `${cName}${index + 1}/${basename(item)}`
            //! 下拉的多级菜单, 改用下面的 parentPath 输出
            return [item[0], `${cName}${index + 1}/${parentPath(item[0])}`, icon]
        })
        return accu.concat(toObjectArray(pv, whichRoute))
    },  <IMenu[]>[])
}
