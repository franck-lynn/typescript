/* 
例如: 把下面的路径变成
../books/test-avatar/test-avatar-cropper.vue
../books/test-avatar/test-single-img-upload.vue 
test-avatar
test-avatar
*/
const from = "../books/test-avatar/xxxx/test-avatar-cropper.vue"
// const reg = /(?<=^\.\.\/books\/)(?<folder>.+)(?=\/[\w\d-_]+\.\w+)/
const str = "../books/"
// const reg1 = new RegExp("(?<=^\\.\\./books/)" + "(?<folder>.+)" + "(?=/[\\w\\d-_]+\\.\\w+)")
const reg2 = new RegExp("(?<=^" + str + ")" + "(?<folder>.+)" + "(?=/[\\w\\d-_]+\\.[\\w\\d]+$)")
const result = from.match(reg2)
console.log(result?.groups?.["folder"])

// 获取父文件夹
// 只截取了前面一段, 匹配的是后面以文件名结尾的字符串
const parentPattern = new RegExp("(?<parent>\\w[.\\w_-]*)" + "(?=/[\\w\\d-_]+\\.[\\w\\d]+$)")
const parent1 = "F:/src/components/xxx/yyy.vue".match(parentPattern)
console.log(parent1?.groups?.["parent"])
const parent2 = "../components/xxx/yyy.vue".match(parentPattern)
console.log(parent2?.groups?.["parent"])
export {}
