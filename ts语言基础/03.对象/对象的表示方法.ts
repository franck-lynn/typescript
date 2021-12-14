// const foo = 'foo'
// const baz = {foo}
// console.log(baz.foo)

// const o = {
//     method: () => 'hello'
// }
// console.log(o.method)
// console.log("两个值严格相等: ", Object.is('foo', 'foo'))
// console.log('两个对象是否相等', Object.is({a:1}, {a:1}))
// object.assign
const target = {a: 1}
const source1 = {b: 2}
const source2 = {c: 3}
const desc = Object.assign(target, source1, source2)
console.log(desc)

console.log(
    // 非第1个参数除了字符串, 其他基本类型会被跳过, 只有字符串的包装对象会产生可枚举属性
    Object.assign({}, "abc", true, 10)
)
console.log(
    '定义一个对象', 
    Reflect.defineProperty({}, 'invisible', {
        enumerable: true,
        value: 'hello'
    })
)
// 不能复制继承属性和不可枚举属性
console.log(Object.assign(
        {a: 1},
        // 定义一个对象给复制, 不可复制
        Object.defineProperty({}, 'invisible', {
            enumerable: false,
            value: 'hello',
        })
    )
)
console.log("*****************1****************")
// assign() 是浅复制
const obj1 = {a: {b: 1}, c: {d: [2, 3, 4]}}
const obj2 = Object.assign({}, obj1)
obj2.a.b = 2
console.log(obj1)
console.log("******************2***************")
// Ramda 的 clone
import {clone} from 'ramda'
const obj3 = clone(obj1) //ramda.clone() 是深复制
obj3.a.b = 10  
console.log(obj1)
console.log(obj3)
console.log("******************3***************")
// object.create()
const a = {repo: 'apple'}
const b = Object.create(a)
console.log(
    b.__proto__, // 在原型上添加属性
    b.repo, 
    b
)
// 属性的可枚举
// TypeScript Course for Beginners 2021 - Learn TypeScript from Scratch!



