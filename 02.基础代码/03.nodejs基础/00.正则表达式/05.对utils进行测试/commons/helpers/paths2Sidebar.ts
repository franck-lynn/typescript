import { isExcludeFolders, parentPath, toObjectArray } from "../../utils"
import { IMenu, IRouterPaths } from "../"
import { splitByNumber } from "./assistant"
import { pathsGroup2Sidebar } from "./pathsGroup2Sidebar"

/*
  数据格式如下:
  [
     ["../components/vuer-ui/avatar/vuer-avatar.vue", "类别二/vuer-avatar.vue", "icon-cogs/icon-cogs", ],
     ...
  ]
  分割成如下的数组
  const fetchRouterPaths: IRouterPaths[] = [
    {
        group: "菜单A",
        paths: [
            ["../components/vuer-ui/avatar/vuer-avatar.vue", "类别二/vuer-avatar.vue", ["icon-cogs/icon-cogs", "icon-cogs"],
        ],
    },
  ]
  这需要增补一些信息, 相当于积分. 如需要把这个数组分成几份, 
  ! 4. 对一个三元元组数组进行分组.
*/

//! 4. 给侧边栏菜单用的, 这也需要从数据库中读取, 因为含有图标, 计算菜单数据是没有菜单项的
//! 数据是顶部菜单的样式. 但给侧边用

const EXCLUDE_FOLDERS = ["about", "footer", "home", "menu", "login", "register", "test"]

export const paths2Sidebar = (paths: [string, string?, string?][], whichRoute = "home"): Record<string, IMenu[]> => {
    // 先过滤下不用的路径
    const pp: [string, string?, string?][] = paths.filter((item: [string, string?, string?]) => {
        if (!isExcludeFolders(item[0], EXCLUDE_FOLDERS)) {
            return item
        }
    })

    const splitLinks = splitByNumber(pp)
    // console.log("分割的数组个数", splitLinks.length)
    // 要返回的对象
    // let groupData: Record<string, IMenu[]> = {}
    let groupData: IRouterPaths[] = []

    for (let i = 0; i < splitLinks.length; i++) {
        const group: string = `AAAA${i + 1}`
        // 其中的一个分组(元素)形式是 [ ["en1", "cn1", "icon1"], ["en2", "cn2", "icon2"] ]
        // 取这个数组前2项组成一个新数组
        const pp: [string, string?, string?][] = splitLinks[i]
        // const icons = splitLinks[i].map((item) => (item[2] ? item[2] : "")) // 只有一层
        // const objArr = toObjectArray(paths, icons, 'home')
        // Object.assign(groupData, { group, paths, icons })
        groupData.push({ group, paths: pp })
    }
    // console.log(groupData)
    return pathsGroup2Sidebar(groupData, whichRoute)
    // return groupData
}
