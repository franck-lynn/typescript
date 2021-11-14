// https://www.typescriptlang.org/docs/handbook/2/generics.html
type PartialPointX = {x: number}
type PartialPointY = {y: number}
// 联合类型, 这个 type 可以, interface 不支持
type ParitalPoint = PartialPointX | PartialPointY
const p1: ParitalPoint = {x: 1, y: 1}
console.log(p1)

// 元组
type Tuple = [PartialPointX, PartialPointY]
const p2: Tuple = [{x: 12}, {y: 2}]
console.log(p2)

//! typeof 的返回值
// const div = document.createElement('div')
// type B = typeof div //! 是这个标签的类型: HTMLDivElement 
export {}