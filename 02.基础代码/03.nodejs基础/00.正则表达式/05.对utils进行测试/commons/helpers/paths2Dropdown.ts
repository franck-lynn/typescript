
import { isExcludeFolders, parentPath, toObjectArray } from "../../utils"
import { IMenu, IRouterPaths } from ".."


//! 3. 路径数组直接转化成菜单对象. 从数据库中取出, 给顶部菜单用
//! 数据是顶部菜单的样式. 顶部用, 直接调用, 生成需要的菜单数据
const EXCLUDE_FOLDERS = ["about", "footer", "home", "menu", "login", "register", "test"]

export const paths2Dropdown = (paths: [string, string?, string?][], whichRoute = "home"): IMenu[] => {
    // 先对数组进行下过滤, 去掉不准备加入菜单的内容
    const pp = paths.filter((item: [string, string?, string?]) => {
        if (!isExcludeFolders(item[0], EXCLUDE_FOLDERS)) {
            return item
        }
    })
    
    return toObjectArray(pp,  whichRoute)
}