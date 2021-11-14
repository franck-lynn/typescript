// ulitity types 实用类型
// https://www.typescriptlang.org/docs/handbook/utility-types.html
// Required type
interface Props {
    a?: number
    b?: string
}
const obj1: Props  = {a: 5}
const obj2: Required<Props> = {a: 5, b: 'triangle'}

console.log(
    obj1, 
    obj2
)

export {}

