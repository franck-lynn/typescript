const mySum1: (x: number, y: number) => number = (x: number, y: number): number => x + y
// (x: number, y: number) => number 这部分是函数的类型声明
// (x: number, y: number): number => x + y // 这部分是函数的声明
// 可以化简
const mySum2 = (x: number, y: number): number => x + y


const identity1 = <T> (arg: T): T => arg

export function identity2<T>(arg: T): T{
    return arg
}

export { mySum1, mySum2, identity1 }
