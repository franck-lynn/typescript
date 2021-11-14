// https://blog.csdn.net/azl397985856/article/details/106913210/
// 简单的说, 泛型就是把类型看成值, 然后对类型进行编程, 这就是泛型的基本思想
// 例如: 
/*
type Partial<T> = {doSomething}
function Parital(T) = {doSomthing}
与函数的思想是一致的
*/
// 泛型 T 是一个对象, 
export type Partial<T> = {[p in keyof T]: T[p]}
export function ids1<T, U>(arg1: T, arg2: U): [T, U]{
    return [arg1, arg2]
}
