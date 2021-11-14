// 从函数参数中构造一个元组类型
declare function f1(args: {a: number, b: string}): void
// 这个函数参数类型为 空, 所以类型是 []
type T1 = Parameters<() => string>
const arr1: T1 = [] // 只能为 null
// arr1.push(1)
console.log(arr1)

type T2 = Parameters<(s: string) => void>
// 这个函数参数为 string, 所以类型是 [string]
const arr2: T2 = ['a' ] // 只能有1个参数
console.log(arr2)

type T3 = Parameters<typeof f1>
// 类型是 [{a: number; b: string}]
const arr3: T3 = [{a: 1, b: "a"}]
console.log(arr3)


