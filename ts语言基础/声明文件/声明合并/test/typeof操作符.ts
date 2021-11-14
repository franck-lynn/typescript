class Person {
    name: string
    age: number
}

const p = new Person()

// typeof 是针对实例的
type T = typeof p

const lolo: T = {
    name: 'lolo',
    age: 24
}
