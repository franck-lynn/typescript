// 据说有 encase.js 转化库
// 仅首字母大写
export const toTitleCase = (path: string) => {
    // return path[0].toLocaleUpperCase() + path.slice(1)
    return path.replace(/^\S/, s => s.toUpperCase())
}
// 把一个字符串转换成驼峰形式 aaaBbbCcc
// 可能的字符串 aaa-bbb-ccc, aAA_BBB-ccc.ddd.Eee.fFF
export const toCamelCase = (path: string) => {
    // 正则中的的-, _, . 都要去掉
    return path.toLowerCase().replace(/[-_.](\w)/g, (_, $1: string) => {
        return $1 ? $1.toUpperCase() : ""
    })
}

// 帕斯卡命名法 
export const toPascalCase = (path: string) => {
    return toTitleCase(toCamelCase(path))
}


// 转小写连字符, 遇到大写的字符就转成 -小写
// 驼峰和帕斯卡命名都可以转成连字符的形式
export const toKababCase = (path: string) => {
    // 以一个或者多个字符开头, 后面是大写字母的
    return path.replace(/\B([A-Z])/g, (_, $1: string) => {
        return $1? "-" + $1.toLowerCase(): ''
    }).toLowerCase()
}

// snakeCase 也是需要有 帕斯卡或者驼峰命名的形式转化
export const toSnakeCase = (path: string) => {
    // 以一个或者多个字符开头, 后面是大写字母的
    return path.replace(/\B([A-Z])/g, (_, $1: string) => {
        return $1? "_" + $1.toLowerCase(): ''
    }).toLowerCase()
}