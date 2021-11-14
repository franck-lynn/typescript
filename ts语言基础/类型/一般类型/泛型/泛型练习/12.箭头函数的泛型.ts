
function one<T>(a: T): T{
    return a
}

const two = <T>(a: T): T => a

// const three: <T>(a: T) => T = <T>(a: T) => a
//! 这种写法更好
const three: <T>(a: T) => T = a => a

let a1 = one<520>(520)

// 泛型数组
const four = <T>(a: T[]): T => a[0]
const five = <T> (a: Array<T>): T => a[0]

// 接口描述泛型
interface Identity {
    <T>(a: T[]): T
}
const six: Identity = a => a[0]

interface ISome<T>{
    (a: T): T
}

// 接口继承
interface IHasLength {
    length: number
}
const hasLengthTest1: <T extends IHasLength> (args: T) => T = (args) => {
    console.log(args.length)
    return args
}
const hasLengthTest2 = <T extends IHasLength>(args: T): T  => {
    console.log(args.length)
    return args
}

// type add<T> = (a: T, b: T) => T
 
function add<T extends string | number>(a: T, b: T): T extends string? string: number{
    return <any>a + b
}

console.log(add<string>("1", "2"))

export {}

