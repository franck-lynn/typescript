// 1. 先定义一个泛型类型, 用于反解函数返回值类型
// T 是否继承自 (...args: any[]) => infer R 这个函数的返回值类型?
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any

// 这个函数的返回值类型是 number
type fn = () => number
// 定义 fn 函数的返回值类型, 则 FnReturnType 的类型是 number, 因为 fn 的返回值类型是 number
type FnReturnType = ReturnType<fn>

// 具体函数
const fun = (): string => 'abc'
// 如果是具体函数, 就在前面假设 typeof
type FunReturnType = ReturnType<typeof fun>

export {}