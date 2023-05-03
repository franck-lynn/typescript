// 正则获取父文件夹
// 一般读取的路径形式为:
// F:/working/study/typescript/typescript/ts基础应用/01.vue使用/02.vite使用/07.vite导航/01.导航基础/01.读取注册/src/components/about/about.vue
const path1 = "F:/src/components/default-route/about.vue"
// const path2 = "../components/default-route/index.vue"
// const path2 = "./menu/sidebar-menu/sidebar-index.vue"
// const path2 = "./sidebar-menu/sidebar-index.vue"
const path2 = "F:/src/components/default-route/about.vue"
const reg1 = /.*[\\\\\/](?<parent>[\.\w_-]+)(?=[\\\\\/]\w+\.\w+$)/

// 子表达式正向先行断言 (?=\/\w+\.\w+$) --> index.vue 结尾
// (?=\/[\.\w_-]+\.\w+$) 以这个作为结尾
// (?<parent>\w[\.\w_-]*) 前面满足这个条件, 解释如下:
// 以字母开头, 后面是字母, .号, _, - 这些都可以, 再接着必须要有 .号 字母结尾
// const reg2 = /^\.\/[\w_-]*\/(?<parent>\w[\.\w_-]*)(?=\/[\.\w_-]+\.\w+$)/
const reg2 = /(?<parent>\w[\.\w_-]*)(?=\/[\.\w_-]+\.\w+$)/
export const parentPath = (path: string) => {
    const result = path.match(reg2)
    // console.log(result)
    return result?.groups?.parent
}
console.log(
    parentPath(path2)
)
// console.log(
//     parentPath(path1)
// )