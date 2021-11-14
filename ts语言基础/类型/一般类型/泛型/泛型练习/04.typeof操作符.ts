// https://www.typescriptlang.org/docs/handbook/2/generics.html
console.log(typeof "Hello world")

type Predicate = (x: unknown) => boolean
type K = ReturnType<Predicate> // 返回类型是一个 布尔型
const k: K = false
console.log(k)

function f(){
    return {x: 10, y: 3}
}
type PF = ReturnType<typeof f> // PF 是 {x: number, y: number} 类型
const pf: PF = {x: 10, y:3 }
console.log(pf)

export {}