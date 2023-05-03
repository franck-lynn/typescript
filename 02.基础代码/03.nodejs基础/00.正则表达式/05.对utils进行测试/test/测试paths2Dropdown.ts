
import util from 'util'
import { IRouterPaths } from '../commons';
// import { paths2Obj } from '../commons/helpers/paths2Obj';
import { paths2Dropdown } from '../commons/helpers/paths2Dropdown';


const paths: [string , string?, string?][]  = [
    ["../components/vuer-ui/avatar/vuer-avatar.vue", "一级菜单/连接A", "icon-cogs/icon-cogs"],
    ['../components/vuer-ui/dialog/vuer-dialog.vue', "一级菜单/连接B", "icon-cog"],
]
// const groupPaths: IRouterPaths[] = [
//     {
//         group: "菜单A",
//         paths: [
//             ["../components/vuer-ui/avatar/vuer-avatar.vue" ],
//         ]
//     },
// ]

const aaa =  paths2Dropdown(paths)


console.log("打印出转化后的数据---> ",util.inspect(aaa, {showHidden: false, depth: null}))