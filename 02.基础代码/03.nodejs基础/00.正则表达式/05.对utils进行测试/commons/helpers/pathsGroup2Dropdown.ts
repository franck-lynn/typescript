import { isExcludeFolders, parentPath, toObjectArray } from "../../utils"
import { IMenu, IRouterPaths } from ".."

const EXCLUDE_FOLDERS = ["about", "footer", "home", "menu", "login", "register", "test"]

export const pathsGroup2Dropdown = (paths: IRouterPaths[], whichRoute = "home"): IMenu[] => {
    // 过滤一下 paths 路径, 这步只是过滤, 看看是不是有要排除掉的,
    const pp = paths.reduce((accu: IRouterPaths[], prev: IRouterPaths) => {
        return accu.concat({
            group: prev.group,
            // 如果这里的 paths 全部被过滤掉了, 就不会出现在菜单上
            paths: prev.paths.filter((it) => {
                if (!isExcludeFolders(it[0], EXCLUDE_FOLDERS)) {
                    return it
                }
            }),
        })
    }, [])
    // 把数组项归集到一起, 得到这样一个数组
    /*
    const groupPaths: IRouterPaths[] = [
        {
            group: "菜单A",
            paths: [
                ["../components/vuer-ui/avatar/vuer-avatar.vue", "一级菜单/连接A", "icon-cogs/icon-cogs"],
            ]
        },
    ]
    */
    return pp.reduce((accu: IMenu[], prev: IRouterPaths) => {
        // accu: 累积值, prev: 当前数组中的一项
        const p: [string, string?, string?][] = prev.paths.reduce(
            (a: [string, string?, string?][], c: [string, string?, string?]) => {
                // 对 group 里的 path 数组再进行 reduce 规约 a: 累计值, c: 当前数组中的一项
                // 这里使用 push 类型会报错. 由于 concat 连接的是数组元素, 但是不会递归扁平化
                // 数组, 所以这里利用这一特点, 在 数组 c 上再包裹一下 [c]
                return a.concat([c])
            },
            <[string, string?, string?][]>[]
        )
        // const p = prev.paths.reduce((a, c) => {
        //     return a.push(c)
        // }, [])
        
        
        return accu.concat(toObjectArray(p, whichRoute))
    }, <IMenu[]>[])
}
