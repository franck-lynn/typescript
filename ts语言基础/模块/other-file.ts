// 不报错, 但是允许不了
// 如果在 global-module.ts 文件中使用 export {}
// 就变成了 本地作用域, 这里就会报错
const bar = foo  // allowed

console.log(bar)