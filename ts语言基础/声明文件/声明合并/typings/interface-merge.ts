interface A {
    name: string
}
interface A{
    age: number
}

// 上面定义的2个接口会合并, 如果 没有 age 属性, 下面的定义会报错
let obj: A = {name: 'aaa', age: 23}