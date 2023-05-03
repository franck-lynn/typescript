import { Decimal } from "decimal.js"
// const arr = new Array(7).fill("").map((_, index) => {
//   console.log(index)
//   return new Array(6).fill("0")
// })

type T1 = [string, string, string, string, string, string]
const arr1 = new Array<T1[]>(2).fill([]).map((_, i) => {
  return new Array<T1[keyof T1]>(6).fill("").map((_, j) => {
    return i === 0 && j === 1 ? "自定义" : ""
  })
}) as T1[]
console.log(arr1)

// 生成一个二维数组
type T2 = [string, string, string, string, Decimal, Decimal, string, string]

const arr2 = new Array<T2[]>(8 - 4).fill([]).map(() => {
  return new Array<T2[keyof T2]>(6).fill("").map((_, j) => {
    let el: string | Decimal = ""
    if (j === 4 || j === 5) {
      el = new Decimal("1")
    } else {
      el = ""
    }

    return el
  })
})
console.log(arr2)
