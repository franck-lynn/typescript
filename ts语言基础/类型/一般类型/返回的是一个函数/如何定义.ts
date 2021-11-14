// 如何定义一个返回值是函数的类型?

// 默认可以推导出来
const a: () => void = function () {}
// 声明变量是一个函数
const b: Function = () => {}

function c1(): Function {
    return () => {}
}
function c2(): () => void {
    return () => {}
}

// 类型别名
type E = (para: string) => string

const f = (a: E, b: string) => {
    return a(b)
}
console.log(
    f((x) => x, 'aaa')
)


const g: () => E = () => {
    const a: E = x => x
    return a
}