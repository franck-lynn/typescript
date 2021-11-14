/**
 * Created by franck.lynn on 2021-05-18.
 * lry_demry@163.com
 * filename:  toObjectArray
 * 这个文件的设计过程说明在 toObjectArray.ts 设计记录.md 这个文件中
 * 这个文件是将文件路径数组转成对象数组, 并进行归类, 将同一个文件夹的文件归为一类
 */

import type {IChild} from '../../typings'
// import type {IChild} from 'typings'

// export interface IChild {
//     icon?: string
//     title: string
//     href?: string
//     children?: IChild[]
// }

// Insert path into directory tree structure:
const insert = (children: IChild[] = [], [head, ...tail]: string[]) => {
    let child = children.find((child) => child.title === head)

    if (!child) {
        if (tail.length > 0) {
            children.push((child = { title: head, children: [] }))
        } else {
            // /.+?\\(?=\w+)|\.\w+$|\\$/ 匹配文件名的正则
            // 不知道怎么在 vite.config.ts 设置 polyfill
            // head = path.basename(head, path.extname(head)) 
            head = head.replace( /.+?\\(?=\w+)|\.\w+$|\\$/, '')
            children.push((child = { title: head, href: `/${head}` }))
        }
    }

    if (tail.length > 0) insert(child.children, tail)

    return children
}

// 使用上面的递归函数进行转化
let toObjectArray = (paths: string[]) =>
    paths
        .map((path) => path.split("/").slice(1))
        // 分割后为:[ [ 'AAA', 'aaa.vue' ], [ 'AAA', 'bbb.vue' ], [ 'BBB', 'ccc.vue' ] ]
        .reduce<IChild[]>((children: IChild[], path: string[]) => insert(children, path), [])

export { toObjectArray }
