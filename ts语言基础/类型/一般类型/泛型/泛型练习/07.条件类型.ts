// https://www.typescriptlang.org/docs/handbook/2/generics.html
interface Animal {
    live(): void
}
interface Dog extends Animal {
    woof(): void
}
type Example1 = Dog extends Animal ? number : string
const e1: Example1 = 12
console.log(e1)

//! 条件类型

interface Dictionary<T> {
    [key: string]: T
}
type DictMember<T> = T extends Dictionary<infer V> ? V : never
// 这是一个 string 类型
const d1: Dictionary<string> = {
    key: "value",
}



interface Person {
    name: string
    age: number
}
// promise 响应类型
// 如果 T 继承自 Promise函数的返回值, 则
// R 就是这个Promise函数的返回值, 用 infer 推断出来,
// 否则, 就是 T 类型
type PromiseResType<T> = T extends Promise<infer R> ? R : T
// 现在, 就来定义一个类型
type PromiseType<T> = () => Promise<T>

// string 不继承 Promise, 所以是 string 类型
const a1: PromiseType<string> = async () => {
    return "aaa"
}
console.log(a1())
// number 不继承 Promise, 所以是 number 类型
const a2: PromiseType<number> = async () => {
    return 123
}
console.log(a2())

const a3: PromiseType<Person> = async () => {
    return {
        name: "aaa",
        age: 18,
        location: "aa"
    } as Person
}
console.log(a3())