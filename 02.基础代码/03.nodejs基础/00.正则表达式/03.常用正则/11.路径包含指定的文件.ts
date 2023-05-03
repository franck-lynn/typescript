const orStr = (a: string, b: string): string => a + "|" + b
const orStrs = (...strs: string[]): string => strs.reduce(orStr)
// ../components/about/index.vue
// const reg = /\b[index](?:\.[\w\d]+)?$/
// const reg = new RegExp("\\b" + orStrs(...['index']) + "(?:\\.[\\w\\d]+)?$")
// console.log(
//     '../components/about/index.vue'.match(reg)
// )

const regExp = new RegExp("\\b" + orStrs(...['index']) + "(?:\\.[\\w\\d]+)?$")

console.log(
    '../components/about/test-index.vue'.match(regExp)
)