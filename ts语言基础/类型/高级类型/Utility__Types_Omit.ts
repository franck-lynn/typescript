// ulitity types 实用类型
// https://www.typescriptlang.org/docs/handbook/utility-types.html
// Omit<Type, Keys>

interface Todo {
    title: string
    description: string
    completed: boolean
    createdAt: number
}

type TodoPreview = Omit<Todo, 'description'>

// 省略了 description 属性
const todo: TodoPreview = {
    title: 'clean room',
    completed: false,
    createdAt: 1615544252770
}
console.log(todo)

export {}












