// https://www.typescriptlang.org/docs/handbook/2/generics.html
// type A = 'hi' | 123

// 类型也支持像函数一样的参数
type F<T> = T | T[]
// 这定义了一个 F 的泛型, 在使用时, F 的泛型要具体化.
// 例如:
const a: F<number> = [1, 2, 3]
// 如果不具体化, 就会报 泛型需要一个参数. 这相当于函数,
// 函数也需要一个参数, 不是吗?
const b: F<string> = "a"
// 如果定义一个新的类型, 像这样使用也是可以的
type FNumber = F<number>
// 相当于 定义了一个泛型 FNumber = number | number[]
// type FString = F<string>

// 定义泛型
interface Identities<V, M> {
    value: V
    message: M
}

const identity = <T, U>(value: T, message: U): Identities<T, U> => {
    let identities: Identities<T, U> = {
        value,
        message,
    }
    return identities
}
console.log(identity<number, string>(18, "semlinker"))

// 定义泛型接口
interface ITheGeneric<U> {
    value: U
    getIdentity: () => U
}
// 类实现泛型接口类
class IdentityClass<T> implements ITheGeneric<T> {
    value: T
    // 构造函数
    constructor(value: T) {
        this.value = value
    }
    getIdentity(): T {
        return this.value
    }
}
const myNumberclass = new IdentityClass<number>(18)
console.log(myNumberclass.getIdentity())
const myStringclass = new IdentityClass<string>('Semlinker')
console.log(myStringclass.getIdentity())


// 1. 定义一个泛型 T
interface Length{
    length: number
}
const identity01: <T extends Length>(arg: T) => T = (arg) => {
    console.log(arg.length) 
    return arg
} 
const identity02 = <T extends Length> (arg: T): T => {
    console.log(arg.length) 
    return arg
} 
const fn1 = <T>(x: T): T => x
const fn2: <T>(x: T) => T = x => x
const fn3 = <T>(x: T): T => x


// 泛型 = 广泛的类型
// const add = (a: number, b: number) => a + b
// const add = (a: string, b: string) => a + b
// type Add<T> = (a: T, b: T) => T
// const addN : Add<number> = (a, b) => a + b
// const addS: Add<string> = (a, b) => a + ' ' + b

// console.log(addN(1, 2))
// console.log(addS('a', 'b'))
export {}
