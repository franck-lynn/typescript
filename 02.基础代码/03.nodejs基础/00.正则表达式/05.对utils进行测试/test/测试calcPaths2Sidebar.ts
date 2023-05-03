import util from 'util'
import { IRouterPaths } from '../commons'

import { calcPaths2Sidebar } from '../commons/helpers/calcPaths2Sidebar' 

// const paths: [string , string?, string?][]  = [
//     ['../../components/profile/avatar/tab-msg/index.vue'],
//     ["../../components/vuer-ui/avatar/vuer-avatar.vue",],
//     ['../../components/vuer-ui/dialog/vuer-dialog.vue'],
// ]
const paths: [string , string?, string?][]  = [
    ['../../components/profile/avatar/tab-msg/index.vue'],
    ["../../components/vuer-ui/avatar/vuer-avatar.vue",],
    ['../../components/vuer-ui/dialog/vuer-dialog.vue'],
]

const aaa =  calcPaths2Sidebar(paths)
console.log("打印出转化后的数据---> ",util.inspect(aaa, {showHidden: false, depth: null}))