import { isExclude } from '../src/isExclude'

console.log(
    isExclude("./profile/index.vue", "index")
)

// import.meta.globEager() 读取的文件路径:
// ./default-route/index.vue
// ./hello-route/hello-route.vue
// 需要判断是否不包含 index.vue


const str = "./profile/index.vue"
const reg = /\bindex|main(?:\.[\w\d]+)?$/
console.log(
    "可以匹配到指定的字符串, 也就是包含的意思",
    str.match(reg),
    reg.test(str)
)

