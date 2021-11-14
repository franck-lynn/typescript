// 函数修饰和函数类型


const add1 = function (x: number, y: number): number{
    return x + y
}
function add2(x: number, y: number): number{
    return x + y
}

const add3 = (x: number, y: number): number => {
    return x + y
}
//! 函数定义只要一个 =
const add4: (x: number, y: number) => number = (x: number, y: number) => x + y

interface Add{
    (x:number, y: number): number
}
const add5: Add = (x: number, y:number): number => x + y