function greeter(fn: (a: string) => void) {
    fn("hello world")
}
function printToConsole(s: string) {
    console.log(s)
}
greeter(printToConsole)
// 函数重载
function makeDate(timestamp: number): Date  // 重载签名, 并没有实现函数
function makeDate(m: number, d: number, y: number): Date ; // 重载签名, 并没有实现函数
// 实现了函数, 兼容签名的函数实现, 但是这个签名不能直接调用, 必须根据函数签名进行调用
// 实现签名必须与重载签名兼容
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
console.log(d1, d2)
// 调用签名
// this 在函数中的声明

// 其他需要了解的类型
// interface O {
//     a?: number
// }
const safeParse = (s: string): unknown => JSON.parse(s)
const obj = safeParse('{"a":1,"b":2,"c":3,"d":4,"e":5}')
console.log(obj)
