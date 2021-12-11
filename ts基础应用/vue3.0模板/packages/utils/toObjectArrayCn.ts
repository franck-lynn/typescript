/**
 * Created by franck.lynn on 2021-05-18.
 * lry_demry@163.com
 * filename:  toObjectArray
 * 这个文件的设计过程说明在 toObjectArray.ts 设计记录.md 这个文件中
 * 这个文件是将文件路径数组转成对象数组, 并进行归类, 将同一个文件夹的文件归为一类
 */
 import {compose, map, split, isEmpty, filter, not, zipWith, head, last, converge} from "ramda"
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
    // children = [], head= [ ['example-layout', 'example-layout' ],  [ 'c1-layout.vue',  'c1-layout.vue' ] ]
    let child = children.find((child) => child.title === head[1])

    if (!child) {
        if (tail.length > 0) {
            children.push((child = { title: head[1], children: [] }))
        } else {
            // /.+?\\(?=\w+)|\.\w+$|\\$/ 匹配文件名称的正则
            // 不知道怎么在 vite.config.ts 设置 polyfill
            // head = path.basename(head, path.extname(head)) 
            const head0= head[0].replace( /.+?\\(?=\w+)|\.\w+$|\\$/, '')
            children.push((child = { title: head[1], href: `/${head0}` }))
        }
    }

    if (tail.length > 0) insert(child.children, tail)

    return children
}

const arr2Object = compose(
    // 最底层对象形式, 不好取值, 
    // map(converge(zipWith((a: string, b) => ({[a]: b})), [head, last])),
    // 改为数组形式
    map(converge(zipWith((a, b) => [a, b]), [head, last])),
    map(map(filter(compose(not, isEmpty)))),
    map(map(split("/"))),
    map(split("|"))
)



// 使用上面的递归函数进行转化
const toObjectArrayCn = (paths: string[]): IChild[] =>
        arr2Object(paths)
        // 分割后为:[ [ 'AAA', 'aaa.vue' ], 
        //            [ 'AAA', 'bbb.vue' ], 
        //            [ 'BBB', 'ccc.vue' ] ]
        // 取消这种数据结构
        //         [  {'example-layout': 'example-layout','c1-layout.vue': 'c1-layout.vue'},
        //            {'example-layout': 'example-layout','r1-layout.vue': 'r1-layout.vue'},
        //            { 'flex-example': '弹性盒子实例', 'single-project.vue': '单个项目' } ]
        // 改为如下数据结构, 不好取值
        // [ [ { 'example-layout': 'example-layout' },  { 'c1-layout.vue': 'c1-layout.vue' } ],
        //     [ { 'example-layout': 'example-layout' }, { 'r1-layout.vue': 'r1-layout.vue' } ],
        //     [ { 'flex-example': '弹性盒子实例' }, { 'single-project.vue': '单个项目' } ] ]
        // 改为如下数组结构
        // [ [ ['example-layout', 'example-layout' ],  [ 'c1-layout.vue',  'c1-layout.vue' ] ],
        //     [ [ 'example-layout': 'example-layout' }, [ 'r1-layout.vue',  'r1-layout.vue' ] ],
        //     [ [ 'flex-example',  '弹性盒子实例' ], [ 'single-project.vue',  '单个项目' ] ] ]
        
        .reduce<IChild[]>((children: IChild[], path: string[]) => insert(children, path), [])

export { toObjectArrayCn }
