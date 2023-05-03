import util from 'util'
import { toObjectArray } from '../utils'

export const paths1: [string, string, string?][] = [
    [  'components/units/consign/consign-index.vue', '快递/快递100/consign-index.vue' , 'icon-cogs'],
]
/*
打印出转化后的数据--->  [
  {
    id: '312755b7-242a-4703-bcf4-4303e3fa3e8d',
    icon: 'icon-cogs',
    title: '快递',
    children: [
      {
        id: '98790599-72d6-49a0-905c-be91c1f43d62',
        title: '快递100',
        children: [
          {
            id: 'fad5d69c-5782-4196-9977-fc02510848e0',
            title: 'consign-index',
            href: '/home/consign-index'
          }
        ]
      }
    ]
  }
]
*/
// 没有图标
export const paths2: [string, string?, string?][] = [
    [  'components/units/consign/consign-index.vue', '快递/快递100/consign-index.vue' ],
]

// 没有中文
export const paths3: [string, string?, string?][] = [
    [  'components/units/consign/consign-index.vue' ],
]
// 没有文件名
export const paths4: [string, string?, string?][] = [
    [   'components/units/consign/consign-index.vue', '快递/快递100'],
]
const aaa = toObjectArray(paths4, "home")
/*
打印出转化后的数据--->  [
  {
    id: '8d87ea84-274a-401f-bd43-2fa083ab475c',
    title: 'components',
    children: [
      {
        id: '13a28d8c-fe16-487d-9be0-ecda332081c8',
        title: 'units',
        children: [
          {
            id: 'a20f4a65-679b-432c-a2c7-5f3c15b38a84',
            title: 'consign',
            children: [
              {
                id: '2a7e7af0-d2cb-463a-8029-e1fd11bc21ac',
                title: 'consign-index',
                href: '/home/consign-index'
              }
            ]
          }
        ]
      }
    ]
  }
]

*/

console.log("打印出转化后的数据---> ",util.inspect(aaa, {showHidden: false, depth: null}))