

import { isExcludeFolders, parentPath, toObjectArray } from "../../utils"
import { IMenu, IRouterPaths } from "../"
/*
    ! 1. 对有分组的数据进行处理 IRouterPaths[]
    这种数据结构在数据库中构建也比较方便
    const fetchRouterPaths: IRouterPaths[] = [
        {
            group: "菜单A",
            paths: [
                ["../components/vuer-ui/avatar/vuer-avatar.vue", "一级菜单/连接A", "icon-cogs/icon-cogs"],
            ]
        },
    ]
    要把上面的数据转化为  Record<string, IMenu[] 的形式
    打印出转化后的数据--->  
    {
      '菜单A':
       [
            {
                id: '9888f47e-5fd3-41cc-a16b-4aafad38373d',
                icon: 'icon-cogs',
                title: '一级菜单',
                children: [
                  {
                    id: 'cddfbe0b-a511-44b6-bad6-a81253fae2ee',
                    title: '连接A',
                    icon: 'icon-cogs',
                    href: '/home/vuer-avatar'
                  }
                ]
            }
       ]
    }
*/
const EXCLUDE_FOLDERS = ["about", "footer", "home", "menu", "login", "register", "test"]
//! 1. 适用于侧边栏并分组的数据, 不同组直接菜单有一条分割线
export const pathsGroup2Sidebar = (paths: IRouterPaths[], whichRoute = "home"): Record<string, IMenu[]> => {
    return paths.reduce((accu: Record<string, IMenu[]>, curr: IRouterPaths) => {
        const group: string = curr.group // 得到分组
        const paths = curr.paths.filter((item: [string, string?, string?]) => {
            if (!isExcludeFolders(item[0], EXCLUDE_FOLDERS)) {
                // 过滤的同时, 顺便判断下 元组的第3项是否存在, 如果不存在, 就给一个默认值
                if(!item[2]){
                    item[2] = "icon-all-fill" // 仅针对第1级菜单添加默认图标
                }
                return item
            }
        })
        // 返回的数据是一个分组对象
        return Object.assign(accu, {
            [group]: toObjectArray(
                paths,
                whichRoute
            ),
        })
    }, {})
}
