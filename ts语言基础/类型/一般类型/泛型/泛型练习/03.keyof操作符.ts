
// https://www.typescriptlang.org/docs/handbook/2/generics.html

type Point = {x: number, y: number}
type P = keyof Point  // keyof 是公共属性名的联合, 也就是说, P 有x , y 属性, 即 type P = x | y
const p: P = 'x' // 变量 p 是 P 类型, 只能是 x, y 属性名字符串中的一个
console.log(p)
// https://blog.csdn.net/semlinker/article/details/106882403

interface Person {
    name: string
    age: number
    location: string
}

const getProperty = <T, K extends keyof T>(obj: T, key: K): T[K] => {
    return obj[key]
}
const p1: Person = {
    name: "aaa",
    age: 18,
    location: "bbb"
}
console.log(
    getProperty(p1, 'age')
)

// 默认泛型类型
interface A<T = string>{
    name: T
}
// 使用默认的泛型类型
const a: A = {name: "Semlinker"}
// 没有使用默认的泛型类型
const b: A<number> = {name: 101}