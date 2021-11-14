// ulitity types 实用类型
// https://www.typescriptlang.org/docs/handbook/utility-types.html
// Readonly type
interface Todo {
    title: string
}
const todo: Readonly<Todo> = {title: "Delete inactive users"}
// todo.title = 'hello'
// 可以用在如下表达式
// let freeze1: <T>(obj: T) => Readonly<T>
// function freeze2<Type>(obj: Type): Readonly<Type>
console.log(todo)
export {}