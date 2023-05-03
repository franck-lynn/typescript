/**
 *  正则获取父文件夹
 * 一般读取的路径形式为: F:/src/components/xxx/yyy.vue
 * 获取的是 xxx
 * @param path: 输入的路径, 一般为 import.meta.globEager() 读取出来的文件绝对路径
 * @returns 绝对路径上的代表文件名的前面一级, 代表的是 父文件夹.
 */
export const parentFolder = (path: string) => {
    const result = path.match(/.*[\\\\\/](?<parent>[\.\w_-]+)(?=[\\\\\/]\w+\.\w+$)/)
    return result?.groups?.parent
}

/**
 * 获取 由 import.meta.globEager() 读取的文件的相对路径
 * 这里的相对路径是相对于 import.meta.url 所在服务器根路径而言的.
 * 例如: http://localhost:8080/src/components/index.ts?t=1642303636090
 * src 认为是路径的起始位置
 * @param url: 通过 import.meta.url 得到的, 与 import.meta.globEager()
 *            应当在 同一个文件中定义, 例如, 都在 index.ts 中定义
 *            形如:  http://localhost:8080/src/components/index.ts?t=1642303636090
 * @param filepath: import.meta.globEager() 读取到文件路径
 *                  形如: F:/导航基础/读取注册/src/components/about.vue
 * @returns  假设 filepath如上, 返回的就是 /src/components/about.vue
 */
export const relativePaths = (url: string, filepath: string): string | undefined=> {
    // 从url形如 http://localhost:8080/src/components/index.ts?t=1642303636090 中获取
    // /src/components 中间部分
    const reg = /(?<=^https?:\/\/(?:www.)?[\w\d]+(?:\.\w*)?(?::\d*)?)(?<folder>(?:\/[\w\d\.]+)+)(?=\/[\w\d]+\.[\w\d]+)/
    const regMatcher = url.match(reg)
    const folder = regMatcher?.groups?.folder
    if(folder){
        // 匹配的字符串加上 文件名.扩展名
        // 这里构造函数的形式, 字符串里要多加一次转义
        const newReg = new RegExp(folder + "/[\\w\\d]+.[\\w\\d]+$")
        return filepath.match(newReg)![0]
    }
}

/**
 * 判断 由 import.meta.globEager() 读取的文件是不是在根路径下的文件.
 * 这里的根路径是相对于 import.meta.globEager() 所在的文件下而言的.
 * 例如: import.meta.globEager() 在 index.ts 里定义了, 那么, 这个
 * index.ts 所在的目录就认为是根路径. 注意, 与平常所说的服务器根路径
 * 是不一样的概念.
 * @param url: 通过 import.meta.url 得到的, 与 import.meta.globEager()
 *            应当在 同一个文件中定义, 例如, 都在 index.ts 中定义
 *            形如:  http://localhost:8080/src/components/index.ts?t=1642303636090
 * @param filepath: import.meta.globEager() 读取到文件路径
 *                  形如: F:/导航基础/读取注册/src/components/about.vue
 * @returns 如果 import.meta.globEager() 匹配得到 /src/components,
 *          在用   /src/components 作为正则的一部分, 加上以 文件名.扩展名
 *          作为新的正则, 再匹配 filepath, 如果能匹配上, 就说明是根路径, 因为
 *          filepath 路径后面与 url 后面结构是一样的, 没有多或少文件夹字符串
 */
export const isRegRootFile = (url: string, filepath: string): boolean => {
    // 从url形如 http://localhost:8080/src/components/index.ts?t=1642303636090 中获取
    // /src/components 中间部分
    const reg = /(?<=^https?:\/\/(?:www.)?[\w\d]+(?:\.\w*)?(?::\d*)?)(?<folder>(?:\/[\w\d\.]+)+)(?=\/[\w\d]+\.[\w\d]+)/
    const regMatcher = url.match(reg)
    const folder = regMatcher?.groups?.folder
    if (folder) {
        // 匹配的字符串加上 文件名.扩展名
        // 这里构造函数的形式, 字符串里要多加一次转义
        const newReg = new RegExp(folder + "/[\\w\\d]+.[\\w\\d]+$")
        // console.log("正则---> ", newReg)
        return newReg.test(filepath)
    } else {
        return false
    }
}

// 判断是不是根文件夹
