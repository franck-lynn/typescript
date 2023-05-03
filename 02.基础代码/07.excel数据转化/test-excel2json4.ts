/* eslint-disable @typescript-eslint/no-explicit-any */
import { excel2Json } from "./excel2json4"

const character = {
  name: { text: "姓名", type: "string" },
  phone: { text: "电话", type: "number" },
  email: { text: "邮件", type: "string" },
}

const fn = {
  string: (v: any) => String(v),
  number: (v: any) => Number(v),
}

const xls = [
  { 姓名: "张无忌", 电话: 12345678901, 邮件: "zwj@163.com" },
  { 姓名: "赵敏", 电话: 12345678902, 邮件: "zm@163.com" },
  { 姓名: "周芷若", 电话: null, 邮件: "zzr@163.com" },
]
/*
[
  { name: '张无忌', phone: 12345678901, email: 'zwj@163.com' },
  { name: '赵敏', phone: 12345678902, email: 'zm@163.com' },
  { name: '周芷若', phone: 0, email: 'zzr@163.com' }
]
*/
const result = excel2Json(xls, character, fn)
console.log(result)
