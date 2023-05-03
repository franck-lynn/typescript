
import util from 'util'
import { IRouterPaths } from '../commons';
import { pathsGroup2Sidebar } from '../commons/helpers/pathsGroup2Sidebar';


// const groupPaths: IRouterPaths[] = [
//     {
//         group: "菜单A",
//         paths: [
//             ["../components/vuer-ui/avatar/vuer-avatar.vue", "一级菜单/连接A", "icon-cogs/icon-cogs"],
//         ]
//     },
// ]
const groupPaths: IRouterPaths[] = [
    {
        group: "菜单A",
        paths: [
            ["components/vuer-ui/avatar/vuer-avatar.vue" ],
        ]
    },
]

const aaa =  pathsGroup2Sidebar(groupPaths)


console.log("打印出转化后的数据---> ",util.inspect(aaa, {showHidden: false, depth: null}))