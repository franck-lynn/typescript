/* eslint-disable @typescript-eslint/no-explicit-any */
const character = {
  name: { text: "姓名", type: "string" },
  phone: { text: "电话", type: "number" },
  email: { text: "邮件", type: "string" },
}
// const fn = {
//   string: (v: any) => String(v),
//   number: (v: any) => Number(v),
// }
const fn = {
  string: (v: any) => String(v),
  number: (v: any) => Number(v),
}

const xls = [
  { 姓名: "张无忌", 电话: 12345678901, 邮件: "zwj@163.com" },
  { 姓名: "赵敏", 电话: 12345678902, 邮件: "zm@163.com" },
  { 姓名: "周芷若", 电话: null, 邮件: "zzr@163.com" },
]
import { keys, props, map, pluck, zipObj } from "ramda"

const a = keys(character)
const b = props<any>(a)(character)
const c = pluck<any>("text")(<any>b)
const d = pluck<any>("type")(<any>b) // [ 'string', 'string' ]
console.log(c)

// 获取到的2个类型, 而对应的列有很多,要将对应类型的函数作用于值列表上,
// 需要一个函数, 这个函数需要根据类型调用不同的处理
const e = props<any>(d)(fn) //  [ [Function: string], [Function: number], [Function: string] ]
console.log(e)
const f = map(props<any>(c))(xls)
/* 
 [
  [ '张无忌', 12345678901, 'zwj@163.com' ],
  [ '赵敏', 12345678902, 'zm@163.com' ],
  [ '周芷若', null, 'zzr@163.com' ]
]
 */
// console.log(f)

/* const aaa = ([f1, f2], { v1, v2 }) => {
  return [f1(v1), f2(v2)]
}
const bbb = (fs: any, vs: any) => {
  const arr: any[] = []
  for (let i = 0; i < fs.length; i++) {
    arr.push(fs[i](vs[i]))
  }
  return arr
} */
// 需要设计一个函数, 将函数列表分别作用于值列表
const ccc = (fs: any) => {
  return (vs: any) => {
    const arr: any[] = []
    for (let i = 0; i < fs.length; i++) {
      arr.push(fs[i](vs[i]))
    }
    return arr
  }
}
console.log(ccc(e)(f[0]))

// 将函数列表作用于值列表
const g = map(ccc(<any>e))(f)
const h = map(zipObj<any>(a))(g)
console.log(h)
