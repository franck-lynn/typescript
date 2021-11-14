/// <reference path = "../typings/declare-types/declare-variable.d.ts" /> 
// import '../typings/declare-types/declare-variable'

// 由于在声明文件中定义了 变量 variableA 是一个函数,
// 既然是函数, 调用这个函数传入参数, 所以不会报错

// 下面函数的具体实现
variableA = (selector: string) => "返回任意的值"

console.log(
    variableA('#foo')
)


