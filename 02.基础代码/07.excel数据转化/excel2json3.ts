/**
一般 读取excel 数据:
  姓名      电话
张无忌     12345678901
赵敏       12345678902
周芷若     12345678903
读取为 json 后
const xls = [
  {"姓名": "张无忌", "电话": 12345678901}, 
  {"姓名": "赵敏", "电话": 12345678902}, 
  {"姓名": "周芷若", "电话": 12345678903}, 
]

预先设置的格式
 const character = {
  name: { text: "姓名", type: "string" },
  phone: { text: "电话", type: "string" },
}
需要转成可以上传服务器的格式(根据预先设定的格式):
const arr = [
   {name: "张无忌" , phone: 12345678901 },
   {name: "赵敏" , phone: 12345678902 },
   {name: "周芷若" , phone: 12345678903 },
]
 */
const character = {
  name: { text: "姓名", type: "string" },
  phone: { text: "电话", type: "number" },
}
const fn = {
  string: (v: any) => String(v),
  number: (v: any) => Number(v),
}

const xls = [
  { 姓名: "张无忌", 电话: 12345678901 },
  { 姓名: "赵敏", 电话: 12345678902 },
  { 姓名: "周芷若", 电话: null },
]

import { ap, keys, props, compose, map, pluck,   zipObj } from "ramda"

const newF = (character: any, xls: any) => {
  const a = keys(character)
  const b = props<any>(a)(character)
  const c = pluck<any>("text")(<any>b)
  const d = pluck<any>("type")(<any>b) // [ 'string', 'string' ]
  const e = props<any>(d)(fn)
  console.log(e)
  // const s = (v: string | number) => String(v)
  return compose(
    map(zipObj<any>(a)), //
    map(ap(<any>e)),
    map(props<any>(c))
  )(xls)
}
console.log(newF(character, xls))
