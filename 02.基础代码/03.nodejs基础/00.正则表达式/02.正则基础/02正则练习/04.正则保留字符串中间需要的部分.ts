// /(?=\/*\b[component]{0.1})(?<filepath>.*)(index.vue)$/

// "../components/about/index.vue" ../components 去掉, /index.vue 去掉, 保留 about
// "类别一/子类别一/index.vue"   /index.vue 去掉, 保留 类别一/子类别一
// /(?=\/\b)(\/components\/){0,1}(?<filepath>.*)\/(index.vue)$/)
// /(?=\b)(\/components\/){0,1}(?<filepath>.*)\/(index.vue)$/
// console.log("../components/about/index.vue".match(
//     /(?=\/\b)(\/components\/){0,1}(?<filepath>.*)\/(index.vue){0,1}$/)
// )
// /(?=\/\b)(\/components\/){0,1}(?<filepath>.*)\/(index.vue){0,1}$/

export const parentPath = (path: string, pattern = "components", suffix = "index.vue") => {
    let f: string = ""
    const isIncludeChinese = /.*?([\u4E00-\u9FA5])/u.test(path)
    
    if (isIncludeChinese) {
        // 包含汉字的时候, 也有可能是英文开头的
        // 是 ../ 或者 ../../ 或者 ./ 或者 / 这些开头的, 要去掉这些字符
        let file = path.match(/^\.{0,2}\/(?<filepath>.*)/)
        if(file?.groups?.filepath){
            f = file?.groups?.filepath
        }else{
            f = path
        }
        
    } else {
        // 不包含汉字的情况
        let file = path.match(/(?=\b)(?<filepath>.*)/u) // 是以 ./ ../ 这些开头的
        if (file?.groups?.filepath) {
            f = file?.groups?.filepath
        } else {
            f = path
        }
    }
    
    if (f.startsWith(pattern)) {
        // 是以 component 开头的, 去掉 pattern/
        f = f.replace(new RegExp(pattern + "/"), "")
    }
    if (f.endsWith(suffix)) {
        f = f.replace(new RegExp("/" + suffix + "$"), "")
    }

    return f
}
console.log(parentPath("../components/about/index.vue")) // about
console.log(parentPath("./components/about/index.vue")) // about
console.log(parentPath("components/about/index.vue")) // about
console.log(parentPath("components/about/aaa.vue")) // about/aaa.vue
console.log(parentPath("./components/about/aaa.vue")) // about/aaa.vue
console.log(parentPath("../类别一/子类别一/index.vue")) // 类别一/子类别一
console.log(parentPath("../类别一/子类别一/aaa.vue")) // 类别一/子类别一/aaa.vue
console.log(parentPath("类别一/子类别一/aaa.vue")) // 类别一/子类别一/aaa.vue
console.log(parentPath("./类别一/子类别一/aaa.vue")) // 类别一/子类别一/aaa.vue
