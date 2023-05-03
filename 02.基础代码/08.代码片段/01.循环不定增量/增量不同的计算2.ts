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
f(arr)
// console.log(getTotalLength(arr))
// 如果总长度 > 给定的长度, 说明数据设计的也有问题

function f(a: T[], l?: number) {
  let s = 0 // j 指针记录开始列
  let e = 0 // j 指针记录结束列
  l = l || getTotalLength(a)
  const len = a.length
  if (has("colSpan")(a[len - 1])) throw new Error("列表中最后一个不能合并")
  if (getTotalLength(a) > l) throw new Error("给定长度比需要的长度短")
  for (let i = 0; i < arr.length; i++) {
    const curr = arr[i]
    if (has("colSpan")(curr)) {
      e = s + curr.colSpan - 1
      // 合并单元格
      console.log(`合并位置---> ${numberToLetters(s)}1:${numberToLetters(e)}1`)
    } else {
      e = s
    }
    // 获取单元格填充数据并设定样式
    console.log(` 获取起始位置---> ${numberToLetters(s)}1`, s, e)
    s = e + 1
  }
}

// 数字转字母的函数
function numberToLetters(num: number) {
  let letters = ""
  while (num >= 0) {
    letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[num % 26] + letters
    num = Math.floor(num / 26) - 1
  }
  return letters
}
