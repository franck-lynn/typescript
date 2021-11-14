// ulitity types 实用类型
// https://www.typescriptlang.org/docs/handbook/utility-types.html
// Pick<Type, Keys>

interface Todo{
    title: string
    description: string
    completed: boolean
}

type TodoPreview = Pick<Todo, "title" | 'completed'>

const todo: TodoPreview = {
    title: "clean room",
    completed: false
}

console.log(todo)



export {}