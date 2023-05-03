const obj = {
  a: "a",
  b: "2",
  c: 3,
}

// obj[Symbol.iterator] = function <T extends object>() {
//   const self = <T>this
//   const keys = Reflect.ownKeys(self)
//   let index = 0
//   return {
//     index: index++,
//     next: () => {
//       if (index > keys.length - 1) {
//         return { done: true, index, value: undefined }
//       }
//       return { done: false, index, value: self[keys[index++]] }
//     },
//   }
// }

// 查看String 是否有迭代函数
const str = "Hi"
console.log(typeof str[Symbol.iterator]) // function

// 数组
const arr = ["hello", "world", 30, false]

// 遍历数组
for (const entry of arr) {
  // entry类型: let entry: string | number | boolean
  console.log(entry)
}
