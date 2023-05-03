import { has, reduce } from "ramda"
interface T {
  name: string
  colSpan?: number
}
const arr: T[] = [
  { name: "AAAA" }, //
  { name: "BBB" },
  { name: "CCC", colSpan: 3 },
  { name: "DDDD", colSpan: 3 },
  { name: "EEEE" },
]
// reduce(函数操作, 初始值, 数组)
// 求总长度的函数 totalLength
const getTotalLength = reduce((accu: number, prev: T) => {
  if (has("colSpan")(prev)) {
    return prev.colSpan + accu
  } else {
    return accu + 1
  }
}, 0)

console.log(getTotalLength(arr))
// 如果总长度 > 给定的长度, 说明数据设计的也有问题

const f = (a: T[], l: number) => {
  let s = 0 // j 指针记录开始列
  let e = 0 // j 指针记录结束列
  const len = a.length
  if (has("colSpan")(a[len - 1])) throw new Error("数据设计的有问题")
  if (getTotalLength(a) > l) throw new Error("给定长度比需要的长度短")
  for (let i = 0; i < arr.length; i++) {
    const row = arr[i]
    if (has("colSpan")(row)) {
      e = s + row.colSpan - 1
    } else {
      e = s
    }

    console.log(s, e)
    s = e + 1
  }
}

f(arr, 9)
