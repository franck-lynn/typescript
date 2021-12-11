import * as util from "util" // node 打印完整 object
import {compose,  map, split} from "ramda"

import {toObjectArray} from "../toObjectArray"
import {toObjectArrayCn} from "../toObjectArrayCn"

// 这个函数的特点是数据必须包含有文件名的路径
// const pathArray = ["/AAA/aaa.vue", "/AAA/bbb.vue", "/BBB/ccc.vue"]

// console.log(util.inspect(toObjectArray(pathArray), { showHidden: false, depth: null }))

const paths = [
    "/example-layout/c1-layout.vue",
    "/example-layout/r1-layout.vue",
    "/flex-example/single-project.vue|弹性盒子实例/单个项目"
]

// console.log(
//   toObjectArrayCn(paths)
// )
console.log(util.inspect(toObjectArrayCn(paths), { showHidden: false, depth: null }))
/* 
[
  [ '/example-layout/c1-layout.vue' ],
  [ '/example-layout/r1-layout.vue' ],
  [ '/flex-example/single-project.vue', '弹性盒子实例/单个项目' ]
]
*/
// const split2 = split1.map((sp) => {
//     console.log(sp.map((s) => s.split("/")))
// })
// paths.forEach(path => {
//   const arr = path.split('|')
//   arr.forEach(item => {
//     console.log(item.split('/'))
//   })
// })

/*
[
  {
    title: '一级A',
    children: [
      { title: '二级菜单', href: '/二级菜单A' },
      { title: '二级菜单', children: [
        {title: '3级', href: '/3级a'},
        {title: '3级', children: [
          {title: '4级', href: '/4级a'},
          {title: '4级', href: '/4级b'},
        ]}
      ]}
    ]
  },
  {
    title: '一级B',
    children: [
      { title: '二级菜单', href: '/二级菜单A' },
      { title: '二级菜单', href: '/二级菜单B' }
    ]
  },
  {
    title: '一级C',
    children: [
      { title: '二级菜单', href: '/二级菜单A' },
      { title: '二级菜单', href: '/二级菜单B' }
    ]
  },
]
*/
