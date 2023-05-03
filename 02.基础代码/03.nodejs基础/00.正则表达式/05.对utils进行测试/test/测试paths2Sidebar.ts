import util from 'util'
import { IRouterPaths } from '../commons';
import { paths2Sidebar } from '../commons/helpers/paths2Sidebar';
// const paths: [string , string?, string?][]  = [
//     ["../components/vuer-ui/avatar/vuer-avatar.vue", "一级菜单/连接A", "icon-cogs/icon-cogs"],
//     ['../components/vuer-ui/dialog/vuer-dialog.vue', "一级菜单/连接B", "icon-cog"],
// ]
// const paths: [string , string?, string?][]  = [
//     ["../components/vuer-ui/avatar/vuer-avatar.vue", "一级菜单/连接A"],
//     ['../components/vuer-ui/dialog/vuer-dialog.vue', "一级菜单/连接B"],
// ]
const paths: [string , string?, string?][]  = [
    ["../components/vuer-ui/avatar/vuer-avatar.vue",],
    ['../components/vuer-ui/dialog/vuer-dialog.vue'],
]

const aaa =  paths2Sidebar(paths)


console.log("打印出转化后的数据---> ",util.inspect(aaa, {showHidden: false, depth: null}))