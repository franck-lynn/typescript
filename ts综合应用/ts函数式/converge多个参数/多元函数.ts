
// 要是函数需要多个参数怎么办?
// 汇集函数
import { converge, divide, length, sum } from 'ramda'

const data = [1, 2, 3, 4, 5, 6, 7]

// 求平均数
// divide需要2个参数, 那好, 就通过 [sum, length] 把这2个函数分发给 divide
const average = converge(divide, [sum, length])
console.log(average(data))
