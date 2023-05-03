import { orStrs } from "./common"

// 不包含某些字符串的函数
// 第1个参数是待检测的字符串, 后面的参数是不包含的字符串.
// 也可以是 正则的模式作为第2个参数, 这样, 例如 "a|b", 这样的参数形式
export const isExclude = (str: string, patterns: string[]): boolean => {
    // 正则: /^(?!.*abc|efg)/
    // 解读: 以空格开头, 并且后面不包含除换行符的任意字符[0, n) + 指定字符串
    // const regExp = new RegExp("^(?!.*" + orStrs(...patterns) + ")")
    const regExp = new RegExp("\\b" + orStrs(...patterns) + "(?:\\.[\\w\\d]+)?$")
    // 正则: /^.*(?!abc|efg)/, 这种正则并不能达到这种要求
    // console.log(regExp)
    // return regExp.test(str)
    return str.match(regExp) ? false : true
}

export const isExcludeFolders = (path: string, patterns: string[], prefix= "components", suffix="index.vue"): boolean => {
    //! 只处理英文, 判断是不是要排除(不包含的)指定文件夹, 如果是要排除的, 就返回真. 
    let f = ""
    // 是以 ./ ../ 这些开头的去掉
   
    let file = path.match(/(?=\b)(?<filepath>.*)/u)
    
    if (file?.groups?.filepath) {
        f = file?.groups?.filepath
    } else {
        f = path
    }
    
    if (f.startsWith(prefix)) {
        // 是以 component 开头的, 去掉 pattern/
        f = f.replace(new RegExp(prefix + "/"), "")
    }
    if (f.endsWith(suffix)) {
        f = f.replace(new RegExp("/" + suffix + "$"), "")
    }
    // console.log("过滤后的文件---> ", f)
    // 只能是中间包含某些字符的(代表文件夹)排除掉
    const regExp = new RegExp("^" +orStrs(...patterns) +"\/")
    // console.log("正则表达式---> ", regExp)
    // console.log("isExclude    isExcludeFolder 文件里的 ----> ", f)
    // console.log("正则表达式---> ",regExp, f, regExp.test(f))
    return regExp.test(f)
}

export const isExcludeFiles = (str: string, patterns: string[], ext?: string): boolean | undefined => {
    const suffix = ext ? ext : "" // 文件后缀名
    // 获取文件名
    const reg = new RegExp("(?<filename>[^\\\\/]+)" + suffix + "$", "i")
    const result = str.match(reg)
    const filename = result?.groups?.filename
    if (!filename) return // 如果文件名没有, 说明路径不对
    if (patterns.includes(filename)) {
        // 如果要排除的文件里面包含找到的文件, 就返回 true
        return true
    } else {
        return false
    }
}
