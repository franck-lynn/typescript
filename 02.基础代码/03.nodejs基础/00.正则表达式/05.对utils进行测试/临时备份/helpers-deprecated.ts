import { splitEvery } from "ramda"
// import util from "util"
import { basename, isExcludeFolders, parentPath, toObjectArray } from "@/utils"
// import { basename, isExcludeFolders, parentPath, toObjectArray } from "../../../utils"
import { IMenu, IRouterPaths } from "@/components/menu/commons"
// import { IMenu, IRouterPaths } from "./"
// 求商运算, 输入一个 数组
const quitient = <T>(arr: T[], n = 2) => {
    const N = Math.ceil(arr.length / n)
    return N < 2 ? 1 : N
}

// 对数据进行各种处理的函数
/*
    ! 1. 对有分组的数据进行处理 IRouterPaths[]
    这种数据结构在数据库中构建也比较方便
    const fetchRouterPaths: IRouterPaths[] = [
        {
            group: "菜单A",
            paths: [
                ["../components/vuer-ui/avatar/vuer-avatar.vue", "类别二/vuer-avatar.vue"],
            ],
            icons: ["icon-cogs/icon-cogs", "icon-cogs"],
        },
    ]
    要把上面的数据转化为  Record<string, IMenu[] 的形式
    {
        AAAA: [
            {
                id: "1",
                icon: "icon-profile-1",
                title: "登录注册",
                children: [
                    { id: "11", title: "注册一个用户", href: "/register" },
                    { id: "12", title: "用户登录", href: "/login" },
                    { id: "13", title: "home页", href: "/home" },
                ],
            },
        ],
        ......
    }
*/
//! 1. 从数据库中取出, 给侧边栏用的
//! 数据是侧边菜单样式, 侧边用, 直接调用, 生成需要的菜单数据
const EXCLUDE_FOLDERS = ["about", "footer", "home", "menu", "login", "register", "test"]

export const pathsGroup2ObjArray = (paths: IRouterPaths[], whichRoute = "home"): Record<string, IMenu[]> => {
    return paths.reduce((accu: Record<string, IMenu[]>, curr: IRouterPaths) => {
        const group: string = curr.group // 得到分组
        const icons: string[] = curr.icons || ["icon-all-fill"]
        // 对于数组中的每一项, 当运行到当前项时, 把 当前项的 group 作为键
        // 当前项的 双元素数组进行处理, 利用递归变成一个数组, 数组里面是个
        // 对象. 再加入到累积值.
        // 这里加一步判断, 排除掉一些不用写入菜单的当前值, 根据 paths 进行判断
        // 得到路径对象数组(包含中, 英文)
        const paths = curr.paths.filter((item: [string, string]) => {
            if (!isExcludeFolders(item[0], EXCLUDE_FOLDERS)) {
                return item
            }
        })
        // 返回的数据是一个分组对象
        return Object.assign(accu, {
            [group]: toObjectArray(
                paths.map((its) => {
                    // 每个paths 里的对象
                    //! 注意, 这里只是显示菜单用的.
                    //! 真正的链接是 href= home/文件名.vue 的形式
                    // 对于 its[1] 中文菜单, 需要加一步 去掉前面 ../ 等这些 开头的目录
                    // 对于 calc-data 也是如此, parentPath() 就是干这个工作的.
                    return parentPath(its[1])
                }),
                icons,
                whichRoute
            ),
        })
    }, {})
}

/*
    const fetchRouterPaths: IRouterPaths[] = [
        {
            group: "菜单A",
            paths: [
                ["../components/vuer-ui/avatar/vuer-avatar.vue", "类别二/vuer-avatar.vue"],
            ],
            icons: ["icon-cogs/icon-cogs", "icon-cogs"],
        },
    ]
    ! 上面的菜单转化为下面的形状
    [
        {
            id: "1",
            icon: "icon-profile-1",
            title: "登录注册",
            children: [
                { id: "11", title: "注册一个用户", href: "/register" },
                { id: "12", title: "用户登录", href: "/login" },
                { id: "13", title: "home页", href: "/home" },
            ],
        },
        ......
        
    ]
*/
//! 2. 从数据库中取出侧边栏分组的数据, 给顶部菜单用的,
//! 数据是侧边菜单样式, 顶部用, 直接调用, 生成需要的顶部菜单数据
export const pathsGroup2Obj = (paths: IRouterPaths[], whichRoute = "home"): IMenu[] => {
    // 过滤一下 paths 路径, 看看是不是有要排除掉的
    const pp = paths.reduce((accu: IRouterPaths[], prev: IRouterPaths) => {
        return accu.concat({
            group: prev.group,
            // 如果这里的 paths 全部被过滤掉了, 就不会出现在菜单上
            paths: prev.paths.filter((it) => {
                if (!isExcludeFolders(it[0], EXCLUDE_FOLDERS)) {
                    return it
                }
            }),
            icons: prev.icons,
        })
    }, [])
    // 把数组项归集到一起

    return pp.reduce((accu: IMenu[], prev: IRouterPaths) => {
        const p: string[] = prev.paths.reduce((a: string[], c: [string, string]) => {
            return a.concat(parentPath(c[1]))
        }, <string[]>[])

        const icons = prev.icons ? prev.icons : undefined
        return accu.concat(toObjectArray(p, icons, whichRoute))
    }, <IMenu[]>[])
}

/*
  数据格式如下:
  [
     ["../components/vuer-ui/avatar/vuer-avatar.vue", "icon-cogs/icon-cogs", "类别二/vuer-avatar.vue", ],
     ...
  ]
  转化格式为:
  [
    {
        id: "1",
        icon: "icon-profile-1",
        title: "登录注册",
        children: [
            { id: "11", title: "注册一个用户", href: "/register" },
            { id: "12", title: "用户登录", href: "/login" },
            { id: "13", title: "home页", href: "/home" },
        ],
    },
    ......
  ]
  这是一个二维三元数组, 就是一个数组里是一个元组类型
  
*/
//! 3. 路径数组直接转化成菜单对象. 从数据库中取出, 给顶部菜单用
//! 数据是顶部菜单的样式. 顶部用, 直接调用, 生成需要的菜单数据
export const paths2Obj = (paths: [string, string, string?][], whichRoute = "home"): IMenu[] => {
    // 先对数组进行下过滤, 去掉不准备加入菜单的内容
    const pp = paths.filter((item: [string, string, string?]) => {
        if (!isExcludeFolders(item[0], EXCLUDE_FOLDERS)) {
            return item
        }
    })
    // 英文的地址实际不需要
    // const p = pp.map((item) => item[0]) // 英文的文件地址
    const c = pp.map((item) => item[1]) // 中文的地址
    // 没有图标就为空, toObjectArray() 为去掉的
    const icons = pp.map((item) => (item[2] ? item[2] : "")) // 图标地址
    return toObjectArray(c, icons, whichRoute)
}

/*
  数据格式如下:
  [
     ["../components/vuer-ui/avatar/vuer-avatar.vue", "icon-cogs/icon-cogs", "类别二/vuer-avatar.vue", ],
     ...
  ]
  分割成如下的数组
  const fetchRouterPaths: IRouterPaths[] = [
    {
        group: "菜单A",
        paths: [
            ["../components/vuer-ui/avatar/vuer-avatar.vue", "类别二/vuer-avatar.vue"],
        ],
        icons: ["icon-cogs/icon-cogs", "icon-cogs"],
    },
  ]
  这需要增补一些信息, 相当于积分. 如需要把这个数组分成几份, 
  ! 4. 对一个三元数组进行分组.
*/
//! 4. 给侧边栏菜单用的, 这也需要从数据库中读取, 因为含有图标, 计算菜单数据是没有菜单项的
//! 数据是顶部菜单的样式. 但给侧边用
export const paths2ObjGroup = (paths: [string, string, string?][], whichRoute = "home"): Record<string, IMenu[]> => {
    // 先过滤下不用的路径, 无需过滤, 生成菜单数据时有过滤
    const pp: [string, string, string?][] = paths.filter((item: [string, string, string?]) => {
        if (!isExcludeFolders(item[0], EXCLUDE_FOLDERS)) {
            return item
        }
    })
    // console.log("pp===> ", pp)
    // 对links 进行分割
    // 把 links 安装指定长度进行分割
    const N = quitient(pp) // 数组的长度除以2, 得到分组的个数
    // 这部相当于已经把数组 [["en1", "cn1", "icon1"], ["en2", "cn2", "icon2"], ["en2", "cn2", "icon3"]] 分割成了
    //  [ [ ["en1", "cn1", "icon1"], ["en2", "cn2", "icon2"] ], [["en2", "cn2", "icon3"]]] 不同的分组
    const splitLinks = splitEvery(N, pp)
    // console.log("分割的数组个数", splitLinks.length)
    // 要返回的对象
    // let groupData: Record<string, IMenu[]> = {}
    let groupData: IRouterPaths[] = []

    for (let i = 0; i < splitLinks.length; i++) {
        const group: string = `AAAA${i + 1}`
        // 其中的一个分组(元素)形式是 [ ["en1", "cn1", "icon1"], ["en2", "cn2", "icon2"] ]
        // 取这个数组前2项组成一个新数组
        const paths: [string, string][] = splitLinks[i].map((item: [string, string, string?]): [string, string] => [
            item[0],
            item[1],
        ])
        const icons = splitLinks[i].map((item) => (item[2] ? item[2] : "")) // 只有一层
        // const objArr = toObjectArray(paths, icons, 'home')
        // Object.assign(groupData, { group, paths, icons })
        groupData.push({ group, paths, icons })
    }
    // console.log(groupData)
    return pathsGroup2ObjArray(groupData, whichRoute)
    // return groupData
}

// ***************************************************************************************************
// 以下是计算数据部分
//! 5. 直接读取的路径地址转化成对象, 用例: 测试用的 侧边栏用的数据
/*
需要增补更多的信息, 缺少图标
*/
// 计算数据给侧边栏用, 加上分组, 没有中文, 加上默认图标
// 自动添加中文菜单
export const calcPaths2ObjArray = (
    paths: string[],
    icon: string,
    cMenu = "菜单",
    whichRoute = "home"
): Record<string, IMenu[]> => {
    // 先过滤下不用的路径, 无需过滤, 生成菜单数据时有过滤
    const p: string[] = paths.filter((item: string) => {
        if (!isExcludeFolders(item, EXCLUDE_FOLDERS)) {
            return item
        }
    })
    //! 对数组进行去 ../ 和 componets, index.vue 这些操作
    const pp = p.map((item) => parentPath(item))
    
    // 对links 进行分割
    // 把 links 安装指定长度进行分割
    let N = quitient(pp) // 数组的长度除以2, 得到分组的个数

    // 这部相当于已经把数组 ["en1", "en2", "en3"] 分割成了
    //  [ [ "en1","en2"] ], ["en3"]] 不同的分组
    const splitLinks = splitEvery(N, pp)
    // 要返回的对象
    let groupData: IRouterPaths[] = []
    for (let i = 0; i < splitLinks.length; i++) {
        const group: string = `AAAA${i + 1}`
        // 其中的一个分组(元素)形式是  [ ["en1"], ["en2"] ],
        // splitLinks  分割的数组 只有一元. 所以, 构造出一个二元数组
        const paths: [string, string][] = splitLinks[i].map((item) => {
            // item 是原始的英文数组, 第1个采用, 第2个可以制作成中文
            // console.log("item====> ", [item, `${cMenu}/${basename(item)}`])
            // return [item, item]
            // console.log("得到的路径---------------> ", parentPath(item))
            // return [item, cMenu ? `${cMenu}${i + 1}/${basename(item)}` : item]
            //! 侧边栏的多级菜单, 改用下面的 parentPath 输出
            return [item, cMenu ? `${cMenu}${i + 1}/${parentPath(item)}` : item]
        })
        const icons = [icon] // 只有一层
        groupData.push({ group, paths, icons })
    }
    return pathsGroup2ObjArray(groupData, whichRoute)
}
//! 06. 不分组, 直接使用于顶部菜单
export const calcPaths2Obj = (
    paths: string[],
    icon = "icon-all-fill",
    cName = "菜单",
    whichRoute = "home"
): IMenu[] => {
    // 先过滤下不用的路径, 无需过滤, 生成菜单数据时有过滤
    const p: string[] = paths.filter((item: string) => {
        if (!isExcludeFolders(item, EXCLUDE_FOLDERS)) {
            return item
        }
    })
    const pp = p.map((it) => parentPath(it))
    const N =  quitient(pp)// 数组的长度除以2, 得到分组的个数
    const splitLinks = splitEvery(N, pp)
    // console.log("分割后的数组---> ", splitLinks)
    const icons = icon ? [icon] : [""]
    // let groupData: IMenu[] = []
    return splitLinks.reduce((accu: IMenu[], prev: string[], index: number) => {
        // 把数组转化一下中文
        const pv = prev.map((item) => {
            // return `${cName}${index + 1}/${basename(item)}`
            //! 下拉的多级菜单, 改用下面的 parentPath 输出
            return `${cName}${index + 1}/${parentPath(item)}`
        })
        // Object.assign(accu, toObjectArray(prev, undefined, "home"))
        return accu.concat(toObjectArray(pv, icons, whichRoute))
    }, <IMenu[]>[])
}
