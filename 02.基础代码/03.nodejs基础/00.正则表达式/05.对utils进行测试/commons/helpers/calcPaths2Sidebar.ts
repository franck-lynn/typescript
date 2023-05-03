import { IMenu, IRouterPaths } from "../"
import { isExcludeFolders, parentPath, toObjectArray } from "../../utils"
import { splitByNumber } from "./assistant"
import { pathsGroup2Sidebar } from "./pathsGroup2Sidebar"

const EXCLUDE_FOLDERS = ["about", "footer", "home", "menu", "login", "register", "test"]

// 以下是计算数据部分
//! 5. 直接读取的路径地址转化成对象, 用例: 测试用的 侧边栏用的数据
/*
需要增补更多的信息, 缺少图标
*/
// 计算数据给侧边栏用, 加上分组, 没有中文, 加上默认图标
// 自动添加中文菜单
export const calcPaths2Sidebar = (
    paths: [string, string?, string?][],
    icon = "icon-all-fill",
    cMenu = "菜单",
    whichRoute = "home"
): Record<string, IMenu[]> => {
    // 先过滤下不用的路径
    const p: [string, string?, string?][] = paths.filter((item: [string, string?, string?]) => {
        if (!isExcludeFolders(item[0], EXCLUDE_FOLDERS)) {
            return item
        }
    })
    //! 对数组进行去 ../ 和 componets, index.vue 这些操作
    // 如果文件是 index.vue 文件, 要做下处理
    const pp: [string, string?, string?][] = p.map((it: [string, string?, string?]) => {
        it[0] = parentPath(it[0])
        return it
    })

    // 对links 进行分割
    // 把 links 安装指定长度进行分割
    const splitLinks: [string, string?, string?][][] = splitByNumber(pp)
    /*
    分割的数组--->  
    [
      [
        [ 'profile/avatar/tab-msg' ],
        [ 'vuer-ui/avatar/vuer-avatar.vue' ]
      ],
      [ [ 'vuer-ui/dialog/vuer-dialog.vue' ] ]
    ]
    */
    // 要返回的对象
    let groupData: IRouterPaths[] = []

    for (let i = 0; i < splitLinks.length; i++) {
        const group: string = `AAAA${i + 1}`
        // 其中的一个分组(元素)形式是  [ ["en1"], ["en2"] ],
        // splitLinks  分割的数组 只有一元. 所以, 构造出一个三元数组
        const _paths: [string, string?, string?][] = splitLinks[i].map((item) => {
            // item 是原始的英文数组, 第1个采用, 第2个可以制作成中文
            //! 侧边栏的多级菜单, 改用下面的 parentPath 输出
            return [item[0], cMenu ? `${cMenu}${i + 1}/${parentPath(item[0])}` : item[0], icon]
        })
        groupData.push({ group, paths: _paths})
    }
    return pathsGroup2Sidebar(groupData, whichRoute)
}
