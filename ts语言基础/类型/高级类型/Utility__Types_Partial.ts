// ulitity types 实用类型
// https://www.typescriptlang.org/docs/handbook/utility-types.html
// partial type
interface Todo {
    title: string
    description: string
}
const updateTodo = (todo: Todo, fieldsToUpdate: Partial<Todo>) => ({...todo, fieldsToUpdate})

const todo1: Todo = {
    title: 'organize desk',
    description: 'clear clutter'
}
const todo2 = updateTodo(todo1, {description: 'throw out trash'})

console.log(todo2)


export {}