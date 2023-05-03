// 正则获取父文件夹
// 一般读取的路径形式为:
// F:/working/study/typescript/typescript/ts基础应用/01.vue使用/02.vite使用/07.vite导航/01.导航基础/01.读取注册/src/components/about/about.vue
export const parentPath = (path: string) => {
    const result = path.match(/.*[\\\\\/](?<parent>\w+)(?=[\\\\\/]\w+\.\w+)/)
    return result?.groups?.parent
}
// 判断是不是父文件夹

// 正则获取根文件夹, 利用 import.meta.url
// "http://localhost:8080/src/components/index.ts?t=1642303636090"
// 因为 index.ts 是在根目录下, 以这个作为正则, 匹配 文件路径,
// 当匹配到"F:/working/src/components/about.vue", 就说明是根路径,
// 注册组件时就不要采用父文件名的形式
export const toRegRootpath = (url: string, filepath: string): boolean => {
    // 从url形如 http://localhost:8080/src/components/index.ts?t=1642303636090 中获取
    // /src/components 中间部分
    const reg = /(?<=^https?:\/\/(?:www.)?[\w\d]+(?:\.\w*)?(?::\d*)?)(?<folder>(?:\/[\w\d\.]+)+)(?=\/[\w\d]+\.[\w\d]+)/
    const regMatcher = url.match(reg)
    const folder = regMatcher?.groups?.folder
    if (folder) {
        // 匹配的字符串加上 文件名.扩展名
        const newReg = new RegExp(folder + "/[wd]+.[wd]+")
        return newReg.test(filepath)
    } else {
        return false
    }
}

// 判断是不是根文件夹
