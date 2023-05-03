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
  phone: { text: "电话", type: "string" },
}

const xls = [
  { 姓名: "张无忌", 电话: 12345678901 },
  { 姓名: "赵敏", 电话: 12345678902 },
  { 姓名: "周芷若", 电话: 12345678903 },
]

import R from "ramda"

// 获取xls 对应属性值
// const a = R.props(["姓名", "电话"], xls[0])
// console.log(a)

const b = R.map(
  R.props<any>(["姓名", "电话"]) //
)(xls)
console.log(b)

const c = R.map(
  R.zipObj(["name", "phone"]) //
)(b)
console.log(c)

const s = (v: string | number) => String(v)
// 组合上面2个函数
const aa = R.compose(
  R.map(R.zipObj(["name", "phone"])), //
  // 对列表中的每个元素使用不同的函数处理
  R.map(R.ap([s, s])),
  R.map(R.props<any>(["姓名", "电话"])) //
)(xls)

console.log(aa)
// 返回到指定路径上的 lens
// const xlens = R.lensPath<any>(["name", "text"])
// console.log(R.view(xlens)(character))

// 返回对象的属性值
const key1 = R.keys(character) // [ 'name', 'phone' ]
// 返回对象的各个属性的值
// [ { text: '姓名', type: 'string' }, { text: '电话', type: 'string' } ]
const key2 = R.props(key1)(character)
const view1 = R.view(R.lensProp<any>("text"), key2[0])
const v2 = R.map(R.view(R.lensProp<any>("text")))(key2)
console.log(v2)

// 组合上面的函数
const getText = R.pipe(
  // R.keys, // 获取 character 的键
  R.props(key1), // key2
  // R.props // 返回各各键的属性值, 是一个对象列表
  R.map(R.view(R.lensProp<any>("text")))
)
console.log(getText(character))

console.log(R.pluck("text")(key2))

// 整理上面的获取 text 属性的函数
const getKey1 = R.keys(character)
const getkey2 = R.props(getKey1)(character)
const getkey3 = R.pluck("text")(getkey2)

const getKey4 = R.map(R.props<any>(getkey3))(xls)
const getKey5 = R.map(R.ap([s, s]))(getKey4)
const getKey6 = R.map(R.zipObj(["name", "phone"]))(getKey5)
console.log(getKey6)
const newF = (character, xls) => {
  const a = R.keys(character)
  const b = R.props<any>(a)(character)
  const getkey3 = R.pluck<any>("text")(<any>b)
}
