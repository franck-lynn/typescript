import * as util from "util" // node 打印完整 object
import {toObjectArray} from '../toObjectArray'

// 这个函数的特点是数据必须包含有文件名的路径
// const pathArray = ["/AAA/aaa.vue", "/AAA/bbb.vue", "/BBB/ccc.vue"]

// console.log(util.inspect(toObjectArray(pathArray), { showHidden: false, depth: null }))


const a = ["/example-layout/c1-layout.vue", "/example-layout/r1-layout.vue"]
console.log(util.inspect(toObjectArray(a), { showHidden: false, depth: null }))
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