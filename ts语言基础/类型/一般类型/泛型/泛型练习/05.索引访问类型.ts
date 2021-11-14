// https://www.typescriptlang.org/docs/handbook/2/generics.html
type Person =  {age: number, name: string}
type I1 = Person['age' | 'name']  // I1 是 number | string 类型
const i1: I1 = 12
console.log(i1)