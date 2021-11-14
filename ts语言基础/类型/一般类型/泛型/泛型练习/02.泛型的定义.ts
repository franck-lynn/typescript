// https://www.typescriptlang.org/docs/handbook/2/generics.html

// 1. 函数中定义泛型
function identity01<T>(arg: T): T {
    console.log(arg)
    return arg
}
identity01<string>("字符串参数")

// 2. 表达式函数中定义泛型
const identity02 = <T>(arg: T) => console.log(arg)
identity02<number>(123)

// 3. 接口中定义泛型
interface IIdentity<T> {
    (arg: T): T
}
// 3. 函数返回接口类型数据
const identity03: IIdentity<number> = (arg) => {
    return arg
}
console.log(identity03(456))

// 4. 在类中定义泛型
class GenericNumber<T> {
    zeroValue: T
    add: (x: T, y: T) => T
    constructor(zeroValue: T, add: (x: T, y: T) => T) {
        this.zeroValue = zeroValue
        this.add = add
    }
}

const myGenericNumber = new GenericNumber<number>(0, (x, y) => x + y)
const result = myGenericNumber.add(40, 2)
console.log(result)
